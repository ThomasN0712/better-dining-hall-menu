from fastapi import FastAPI, Query, Depends, HTTPException
from typing import List, Optional
from sqlalchemy.orm import Session
from .db.database import SessionLocal
from .db import queries
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from dotenv import load_dotenv

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


# Load environment variables
load_dotenv()

# Initialize FastAPI application
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://better-dining-hall-menu.vercel.app/", 
        "https://better-dining-hall-menu.vercel.app", # Production
        "https://better-dining-hall-git-52e054-thomas-nguyens-projects-bf2800ef.vercel.app", # just putting it here because why not
        "https://better-dining-hall-menu-j3b159v6g.vercel.app",
        "https://www.longbeachmenu.com/",
        "https://www.longbeachmenu.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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


# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the backend!"}

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
            plain_text_content=f"""
            Problem: {data.errorType}
            Message: {data.message}
            Reported by: {data.email or 'Anonymous'}
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

if __name__ == "__main__":
    import uvicorn

    # Retrieve the port dynamically from the environment or default to 8000 for local testing
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
