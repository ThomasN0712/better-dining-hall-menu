from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .db.database import SessionLocal
from .db import queries
from fastapi.middleware.cors import CORSMiddleware
import os

# Initialize FastAPI application
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "http://localhost:3001",  # Local development
        "https://better-dining-hall-menu.onrender.com", # Production
        "https://better-dining-hall-menu.vercel.app/" # Production
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

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the backend!"}

# Menu endpoints
@app.get("/menu_items")
def get_menu_items_api(date: str, location_id: int, meal_type_id: int, db: Session = Depends(get_db)):
    """
    Fetch menu items based on date, location, and meal type.
    """
    return queries.get_menu_items(db, date, location_id, meal_type_id)

@app.get("/always_available_items")
def get_always_available_items_api(db: Session = Depends(get_db)):
    """
    Fetch items that are always available.
    """
    return queries.get_always_available_items(db)

# Metadata endpoints
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

if __name__ == "__main__":
    import uvicorn

    # Retrieve the port dynamically from the environment or default to 8000 for local testing
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
