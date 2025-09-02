from fastapi import FastAPI, Query, Depends, HTTPException
from typing import List, Optional
from sqlalchemy.orm import Session
from .db.database import SessionLocal
from .db import queries
from fastapi.middleware.cors import CORSMiddleware
import os
import logging
from pydantic import BaseModel
from dotenv import load_dotenv

import requests


# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('app.log') if os.environ.get('LOG_TO_FILE') else logging.NullHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize FastAPI application
app = FastAPI()
logger.info("FastAPI application initialized")

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
logger.info("CORS middleware configured")

# Dependency to get DB session
def get_db():
    logger.debug("Creating database session")
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.error(f"Database session error: {str(e)}")
        raise
    finally:
        logger.debug("Closing database session")
        db.close()

# Mailgun API configuration from environment
MAILGUN_API_KEY = os.getenv("MAILGUN_API_KEY")
MAILGUN_DOMAIN = os.getenv("MAILGUN_DOMAIN")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL")

if not MAILGUN_API_KEY:
    logger.warning("MAILGUN_API_KEY not found in environment variables")
if not MAILGUN_DOMAIN:
    logger.warning("MAILGUN_DOMAIN not found in environment variables")
if not RECIPIENT_EMAIL:
    logger.warning("RECIPIENT_EMAIL not found in environment variables")
else:
    logger.info(f"Email notifications will be sent to: {RECIPIENT_EMAIL}") 


# Root endpoint
@app.get("/")
def root():
    logger.info("Root endpoint accessed")
    return {"message": "Welcome to the backend!"}

# Health check endpoint with environment info
@app.get("/health")
def health_check():
    logger.info("Health check endpoint accessed")
    return {
        "status": "healthy",
        "environment": {
            "mailgun_api_key_set": bool(MAILGUN_API_KEY),
            "mailgun_domain_set": bool(MAILGUN_DOMAIN),
            "recipient_email_set": bool(RECIPIENT_EMAIL),
            "log_level": logging.getLogger().level
        }
    }

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
    logger.info(f"Fetching menu items for date: {date}, location_id: {location_id}, meal_type_id: {meal_type_id}")
    try:
        result = queries.get_menu_items(db, date, location_id, meal_type_id)
        logger.info(f"Successfully retrieved {len(result) if result else 0} menu items")
        return result
    except Exception as e:
        logger.error(f"Error fetching menu items: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch menu items")

@app.get("/always_available_items")
def get_always_available_items_api(db: Session = Depends(get_db)):
    """
    Fetch items that are always available.
    """
    logger.info("Fetching always available items")
    try:
        result = queries.get_always_available_items(db)
        logger.info(f"Successfully retrieved {len(result) if result else 0} always available items")
        return result
    except Exception as e:
        logger.error(f"Error fetching always available items: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch always available items")

@app.get("/locations")
def get_locations_api(db: Session = Depends(get_db)):
    """
    Fetch all available locations.
    """
    logger.info("Fetching all locations")
    try:
        result = queries.get_locations(db)
        logger.info(f"Successfully retrieved {len(result) if result else 0} locations")
        return result
    except Exception as e:
        logger.error(f"Error fetching locations: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch locations")

@app.get("/meal_types")
def get_meal_types_api(db: Session = Depends(get_db)):
    """
    Fetch all available meal types.
    """
    logger.info("Fetching all meal types")
    try:
        result = queries.get_meal_types(db)
        logger.info(f"Successfully retrieved {len(result) if result else 0} meal types")
        return result
    except Exception as e:
        logger.error(f"Error fetching meal types: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch meal types")

@app.get("/days")
def get_days_api(db: Session = Depends(get_db)):
    """
    Fetch all available days.
    """
    logger.info("Fetching all days")
    try:
        result = queries.get_days(db)
        logger.info(f"Successfully retrieved {len(result) if result else 0} days")
        return result
    except Exception as e:
        logger.error(f"Error fetching days: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch days")

@app.get("/allergens")
def get_allergens_api(db: Session = Depends(get_db)):
    """
    Fetch all available allergens.
    """
    logger.info("Fetching all allergens")
    try:
        result = queries.get_allergens(db)
        logger.info(f"Successfully retrieved {len(result) if result else 0} allergens")
        return result
    except Exception as e:
        logger.error(f"Error fetching allergens: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch allergens")

class EmailRequest(BaseModel):
    errorType: str
    message: str
    email: Optional[str] = None  
    
@app.get("/test-email-config")
def test_email_config():
    """
    Test endpoint to check email configuration without sending an email.
    """
    logger.info("Testing email configuration")
    return {
        "mailgun_api_key_set": bool(MAILGUN_API_KEY),
        "mailgun_api_key_length": len(MAILGUN_API_KEY) if MAILGUN_API_KEY else 0,
        "mailgun_domain": MAILGUN_DOMAIN if MAILGUN_DOMAIN else None,
        "recipient_email": RECIPIENT_EMAIL if RECIPIENT_EMAIL else None,
        "all_configured": bool(MAILGUN_API_KEY and MAILGUN_DOMAIN and RECIPIENT_EMAIL)
    }

@app.post("/report-issue")
async def report_issue(data: EmailRequest):
    """
    Sends an email containing the issue reported by the user.
    """
    logger.info(f"Received issue report: {data.errorType} from {data.email or 'Anonymous'}")
    
    # Debug: Check environment variables
    logger.info(f"Environment check:")
    logger.info(f"  MAILGUN_API_KEY: {'SET' if MAILGUN_API_KEY else 'NOT SET'} (length: {len(MAILGUN_API_KEY) if MAILGUN_API_KEY else 0})")
    logger.info(f"  MAILGUN_DOMAIN: {MAILGUN_DOMAIN if MAILGUN_DOMAIN else 'NOT SET'}")
    logger.info(f"  RECIPIENT_EMAIL: {RECIPIENT_EMAIL if RECIPIENT_EMAIL else 'NOT SET'}")
    
    # Check for missing required variables
    if not MAILGUN_API_KEY:
        logger.error("MAILGUN_API_KEY is not set")
        raise HTTPException(status_code=500, detail="Email service not configured: Missing API key")
    
    if not MAILGUN_DOMAIN:
        logger.error("MAILGUN_DOMAIN is not set")
        raise HTTPException(status_code=500, detail="Email service not configured: Missing domain")
        
    if not RECIPIENT_EMAIL:
        logger.error("RECIPIENT_EMAIL is not set")
        raise HTTPException(status_code=500, detail="Email service not configured: Missing recipient email")
    
    try:
        # Prepare API URL
        api_url = f"https://api.mailgun.net/v3/{MAILGUN_DOMAIN}/messages"
        logger.info(f"Mailgun API URL: {api_url}")
        
        # Prepare email data
        email_files = {
            "from": (None, "Better Dining Hall Menu <noreply@longbeachmenu.com>"),
            "to": (None, RECIPIENT_EMAIL),
            "subject": (None, f"Issue Reported: {data.errorType}"),
            "html": (None, f"""
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
            """)
        }
        
        logger.info(f"Email data prepared - From: {email_files['from'][1]}, To: {email_files['to'][1]}, Subject: {email_files['subject'][1]}")

        # Send the email via Mailgun
        logger.info("Attempting to send email via Mailgun...")
        response = requests.post(
            api_url,
            auth=("api", MAILGUN_API_KEY),
            files=email_files
        )
        
        logger.info(f"Mailgun response status: {response.status_code}")
        logger.info(f"Mailgun response headers: {dict(response.headers)}")
        logger.info(f"Mailgun response body: {response.text}")

        if response.status_code == 200:
            logger.info("Email sent successfully!")
            return {"success": True, "message": "Email sent successfully!"}
        else:
            logger.error(f"Failed to send email. Status code: {response.status_code}")
            logger.error(f"Response text: {response.text}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to send email. Status code: {response.status_code}, Response: {response.text}",
            )
    except requests.exceptions.RequestException as e:
        logger.error(f"Network error when sending email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Network error: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error in report_issue endpoint: {str(e)}")
        logger.error(f"Error type: {type(e).__name__}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")


# Root HEAD endpoint for health checks
@app.head("/")
def head_root():
    logger.debug("HEAD request to root endpoint")
    return None

if __name__ == "__main__":
    import uvicorn

    # Retrieve the port dynamically from the environment or default to 8000 for local testing
    port = int(os.environ.get("PORT", 8000))
    logger.info(f"Starting server on host 0.0.0.0 and port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
