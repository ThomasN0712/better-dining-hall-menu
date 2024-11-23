from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.db import queries
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS (Adjust allow_origins in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific origins in production
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

# API endpoint to get menu items
@app.get("/menu_items")
def get_menu_items_api(date: str, location_id: int, meal_type_id: int, db: Session = Depends(get_db)):
    menu_items = queries.get_menu_items(db, date, location_id, meal_type_id)
    return menu_items

# API endpoint to get always available items
@app.get("/always_available_items")
def get_always_available_items_api(db: Session = Depends(get_db)):
    items = queries.get_always_available_items(db)
    return items

# API endpoint to get locations
@app.get("/locations")
def get_locations_api(db: Session = Depends(get_db)):
    locations = queries.get_locations(db)
    return locations

# API endpoint to get meal types
@app.get("/meal_types")
def get_meal_types_api(db: Session = Depends(get_db)):
    meal_types = queries.get_meal_types(db)
    return meal_types

# API endpoint to get days
@app.get("/days")
def get_days_api(db: Session = Depends(get_db)):
    days = queries.get_days(db)
    return days

# API endpoint to get allergens
@app.get("/allergens")
def get_allergens_api(db: Session = Depends(get_db)):
    allergens = queries.get_allergens(db)
    return allergens
