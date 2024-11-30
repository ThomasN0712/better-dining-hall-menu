from sqlalchemy.orm import Session
from .models import (
    MenuItem,
    AlwaysAvailable,
    MenuAvailability,
    Location,
    MealType,
    Cycle,
    Day,
    Allergen,
    MenuItemAllergen,
)
import datetime
from typing import List, Optional

def get_cycle_number(date_obj, reference_date, cycle_length_days=7):
    delta_days = (date_obj - reference_date).days
    cycle_number = ((delta_days // cycle_length_days) % 5) + 1  # Cycles 1-5
    return cycle_number

def get_menu_items(
    db: Session,
    date_str: str,
    location_ids: Optional[List[int]],
    meal_type_ids: Optional[List[int]]
):
    # Convert date string to datetime object
    date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()

    # Reference start date for Cycle 1
    reference_date = datetime.date(2024, 8, 26)

    # Calculate the cycle number
    cycle_number = str(get_cycle_number(date_obj, reference_date))

    # Get the cycle_id based on the cycle_number
    cycle = db.query(Cycle).filter(Cycle.cycle_identifier == cycle_number).first()
    if not cycle:
        print(f"No cycle found for cycle_number: {cycle_number}")
        return []

    # Step 2: Get day name (e.g., 'Monday')
    day_name = date_obj.strftime('%A')

    # Step 3: Get the day_id corresponding to the day_name and cycle_id
    day = db.query(Day).filter(
        Day.day_name == day_name,
        Day.cycle_id == cycle.cycle_id
    ).first()

    if not day:
        print(f"No day found for day_name: {day_name} and cycle_id: {cycle.cycle_id}")
        return []

    # Step 4: Build the query
    query = db.query(MenuAvailability).join(MenuItem).join(Location).join(MealType).filter(
        MenuAvailability.day_id == day.day_id
    )

    if location_ids:
        query = query.filter(MenuAvailability.location_id.in_(location_ids))

    if meal_type_ids:
        query = query.filter(MenuAvailability.meal_type_id.in_(meal_type_ids))

    menu_availability_list = query.all()

    # Process the results
    result = []
    for ma in menu_availability_list:
        # Fetch allergens for the menu item
        allergens = (
            db.query(Allergen.allergen_id, Allergen.description)
            .join(MenuItemAllergen, Allergen.allergen_id == MenuItemAllergen.allergen_id)
            .filter(MenuItemAllergen.availability_id == ma.availability_id)
            .all()
        )
        allergens_list = [{"id": a[0], "name": a[1]} for a in allergens]

        item = {
            "item_name": ma.menu_item.item_name,
            "location": ma.location.location_name,
            "location_id": ma.location.location_id,
            "meal_type": ma.meal_type.meal_type_name,
            "meal_type_id": ma.meal_type.meal_type_id, 
            "allergens": allergens_list,
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
