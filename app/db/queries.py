# app/db/queries.py

from sqlalchemy.orm import Session
from app.db.models import (
    MenuItem,
    AlwaysAvailable,
    MenuAvailability,
    Location,
    MealType,
    Day,
    Allergen,
    MenuItemAllergen,
)
import datetime

def get_menu_items(db: Session, date_str: str, location_id: int, meal_type_id: int):
    # Convert date string to datetime object
    date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d")
    # Get day name (e.g., 'Monday')
    day_name = date_obj.strftime('%A')

    # Get the day_id corresponding to the day_name
    day = db.query(Day).filter(Day.day_name == day_name).first()
    if not day:
        return []

    # Fetch menu availability records matching the criteria
    menu_availability_list = (
        db.query(MenuAvailability)
        .join(MenuItem, MenuAvailability.item_id == MenuItem.item_id)
        .join(Location, MenuAvailability.location_id == Location.location_id)
        .join(MealType, MenuAvailability.meal_type_id == MealType.meal_type_id)
        .filter(
            MenuAvailability.day_id == day.day_id,
            MenuAvailability.location_id == location_id,
            MenuAvailability.meal_type_id == meal_type_id,
        )
        .all()
    )

    result = []
    for ma in menu_availability_list:
        # Fetch allergens for the menu item
        allergens = (
            db.query(Allergen.allergen_id)
            .join(MenuItemAllergen, Allergen.allergen_id == MenuItemAllergen.allergen_id)
            .filter(MenuItemAllergen.availability_id == ma.availability_id)
            .all()
        )
        allergen_ids = [a[0] for a in allergens]

        item = {
            "item_name": ma.menu_item.item_name,
            "location": ma.location.location_name,
            "meal_type": ma.meal_type.meal_type_name,
            "allergens": allergen_ids,
        }
        result.append(item)
    return result

def get_always_available_items(db: Session):
    items = db.query(AlwaysAvailable).all()
    return [
        {
            "item_name": item.menu_item.item_name,
            "meal_type": item.meal_type.meal_type_name,
        }
        for item in items
    ]

def get_locations(db: Session):
    locations = db.query(Location).all()
    return [
        {
            "location_id": loc.location_id,
            "location_name": loc.location_name,
        }
        for loc in locations
    ]

def get_meal_types(db: Session):
    meal_types = db.query(MealType).all()
    return [
        {
            "meal_type_id": mt.meal_type_id,
            "meal_type_name": mt.meal_type_name,
        }
        for mt in meal_types
    ]

def get_days(db: Session):
    days = db.query(Day).all()
    return [
        {
            "day_id": day.day_id,
            "day_name": day.day_name,
        }
        for day in days
    ]

def get_allergens(db: Session):
    allergens = db.query(Allergen).all()
    return [
        {
            "allergen_id": allergen.allergen_id,
            "description": allergen.description,
        }
        for allergen in allergens
    ]
