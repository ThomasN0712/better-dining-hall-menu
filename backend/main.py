from fastapi import FastAPI, Query, Depends, HTTPException
from typing import List, Optional
from sqlalchemy.orm import Session
from .db.database import SessionLocal
from .db import queries
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, AIMessage
import logging
import uvicorn
import threading

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Sendgrid for email notifications
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Chatbot AI
# from .chatbot_ai.deepseek import dining_agent
from .chatbot_ai.openai import dining_agent

# Load environment variables
load_dotenv()

# Initialize FastAPI application
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# SendGrid API Key from environment
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL") 

# Chatbot request model
class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []

# Chatbot response model
class ChatResponse(BaseModel):
    response: str

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the backend!"}

# Chatbot endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Endpoint for the dining hall chatbot.
    """
    try:
        # logger.info(f"Received chat request: {request.message}")
        # logger.info(f"Chat history: {request.history}")

        # Convert history to LangChain messages if provided
        messages = []
        if request.history:
            for msg in request.history:
                if msg["role"] == "user":
                    messages.append(HumanMessage(content=msg["content"]))
                elif msg["role"] == "assistant":
                    messages.append(AIMessage(content=msg["content"]))
        
        # Add the current message
        messages.append(HumanMessage(content=request.message))
        
        # logger.info(f"Converted messages: {messages}")
        
        # Get response from agent using run method
        result = dining_agent.run(request.message)
        # logger.info(f"Agent result: {result}")
        
        # Extract the response from the result
        response = result.get("final_answer", "I'm sorry, I couldn't process your request.")
        # logger.info(f"Final response: {response}")
        
        return ChatResponse(response=response)
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat request: {str(e)}"
        )

# Menu endpoints
@app.get("/menu_items")
def get_menu_items_api(
    date: str,
    location_id: Optional[List[int]] = Query(None),
    meal_type_id: Optional[List[int]] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Fetch menu items based on date, and optional multiple location_ids and meal_type_ids.
    """
    return queries.get_menu_items(db, date, location_id, meal_type_id)

@app.get("/menu_items_range")
def get_menu_items_range_api(
    start_date: str,
    end_date: str,
    location_id: Optional[List[int]] = Query(None),
    meal_type_id: Optional[List[int]] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Fetch menu items for a date range.
    """
    return queries.get_menu_items_range(db, start_date, end_date, location_id, meal_type_id)

@app.get("/always_available_items")
def get_always_available_items_api(db: Session = Depends(get_db)):
    """
    Fetch items that are always available.
    """
    return queries.get_always_available_items(db)

@app.get("/locations")
def get_locations_api(db: Session = Depends(get_db)):
    """
    Fetch all available locations.
    """
    return queries.get_locations(db)

@app.get("/meal_types")
def get_meal_types_api(db: Session = Depends(get_db)):
    """
    Fetch all available meal types.
    """
    return queries.get_meal_types(db)

@app.get("/days")
def get_days_api(db: Session = Depends(get_db)):
    """
    Fetch all available days.
    """
    return queries.get_days(db)

@app.get("/allergens")
def get_allergens_api(db: Session = Depends(get_db)):
    """
    Fetch all available allergens.
    """
    return queries.get_allergens(db)

class EmailRequest(BaseModel):
    errorType: str
    message: str
    email: Optional[str] = None  
    
@app.post("/report-issue")
async def report_issue(data: EmailRequest):
    """
    Sends an email containing the issue reported by the user.
    """
    try:
        message = Mail(
            from_email="noreply@longbeachmenu.com", 
            to_emails=RECIPIENT_EMAIL,
            subject=f"Issue Reported: {data.errorType}",
             html_content=f"""
        <html>
            <body>
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2 style="color: #4CAF50;">New Issue Reported</h2>
                    <p><strong>Problem:</strong> {data.errorType}</p>
                    <p><strong>Message:</strong> {data.message}</p>
                    <p><strong>Reported by:</strong> {data.email or 'Anonymous'}</p>
                    <hr>
                    <p style="font-size: 0.9em; color: #555;">This email was sent from the Better Dining Hall Menu system.</p>
                </div>
            </body>
        </html>
        """
        )

        # Send the email
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)

        if response.status_code == 202:
            return {"success": True, "message": "Email sent successfully!"}
        else:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to send email. Status code: {response.status_code}",
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")


# Root HEAD endpoint for health checks
@app.head("/")
def head_root():
    return None

def run_api_server(port: int):
    """Run the API server on the specified port."""
    uvicorn.run(app, host="0.0.0.0", port=port)

if __name__ == "__main__":
    # Start the main API server on port 8000
    main_server = threading.Thread(target=run_api_server, args=(8000,))
    main_server.start()
    
    # Start the tool API server on port 8001
    tool_server = threading.Thread(target=run_api_server, args=(8001,))
    tool_server.start()
    
    # Wait for both servers to complete
    main_server.join()
    tool_server.join()
