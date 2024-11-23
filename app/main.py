from fastapi import FastAPI, Depends
from typing import List
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.db import queries
import datetime

app = FastAPI()

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

# # API endpoint to get locations
# @app.get("/locations")
# def get_locations_api(db: Session = Depends(get_db)):
#     locations = queries.get_locations(db)
#     return locations

