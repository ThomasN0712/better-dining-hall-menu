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
import logging
import time
from typing import List, Optional

# Configure logger for this module
logger = logging.getLogger(__name__)

def get_cycle_number(date_obj, reference_date, cycle_length_days=7):
    logger.info(f"Calculating cycle number for date: {date_obj}, reference: {reference_date}")
    delta_days = (date_obj - reference_date).days
    cycle_number = ((delta_days // cycle_length_days) % 5) # Cycles 1-5
    logger.info(f"Calculated cycle number: {cycle_number} (delta_days: {delta_days})")
    return cycle_number

def get_menu_items(
    db: Session,
    date_str: str,
    location_ids: Optional[List[int]],
    meal_type_ids: Optional[List[int]]
):
    start_time = time.time()
    logger.info(f"Starting get_menu_items query for date: {date_str}, locations: {location_ids}, meal_types: {meal_type_ids}")
    
    try:
        # Convert date string to datetime object
        date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
        logger.info(f"Parsed date object: {date_obj}")
    except ValueError as e:
        logger.error(f"Invalid date format '{date_str}': {e}")
        return []

    # Reference start date for Cycle 1 EDIT THIS
    reference_date = datetime.date(2026, 1, 20)
    logger.info(f"Using reference date: {reference_date}")

    # Calculate the cycle number
    cycle_number = str(get_cycle_number(date_obj, reference_date))
    logger.info(f"Determined cycle number: {cycle_number}")

    # Get the cycle_id based on the cycle_number
    logger.info(f"Querying for cycle with identifier: {cycle_number}")
    cycle = db.query(Cycle).filter(Cycle.cycle_identifier == cycle_number).first()
    if not cycle:
        logger.warning(f"No cycle found for cycle_number: {cycle_number}")
        return []
    logger.info(f"Found cycle: {cycle.cycle_id}")

    # Step 2: Get day name (e.g., 'Monday')
    day_name = date_obj.strftime('%A')
    logger.info(f"Day name for date {date_obj}: {day_name}")

    # Step 3: Get the day_id corresponding to the day_name and cycle_id
    logger.info(f"Querying for day: {day_name} in cycle: {cycle.cycle_id}")
    day = db.query(Day).filter(
        Day.day_name == day_name,
        Day.cycle_id == cycle.cycle_id
    ).first()

    if not day:
        logger.warning(f"No day found for day_name: {day_name} and cycle_id: {cycle.cycle_id}")
        return []
    logger.info(f"Found day: {day.day_id}")

    # Step 4: Build the query
    logger.info(f"Building query for day_id: {day.day_id}")
    query = db.query(MenuAvailability).join(MenuItem).join(Location).join(MealType).filter(
        MenuAvailability.day_id == day.day_id
    )

    if location_ids:
        logger.info(f"Filtering by location_ids: {location_ids}")
        query = query.filter(MenuAvailability.location_id.in_(location_ids))

    if meal_type_ids:
        logger.info(f"Filtering by meal_type_ids: {meal_type_ids}")
        query = query.filter(MenuAvailability.meal_type_id.in_(meal_type_ids))

    logger.info("Executing main menu availability query")
    menu_availability_list = query.all()
    logger.info(f"Found {len(menu_availability_list)} menu availability records")

    # Process the results
    result = []
    logger.info("Processing menu availability records and fetching allergens")
    
    for i, ma in enumerate(menu_availability_list):
        logger.info(f"Processing item {i+1}/{len(menu_availability_list)}: {ma.menu_item.item_name}")
        
        try:
            # Fetch allergens for the menu item
            allergens = (
                db.query(Allergen.allergen_id, Allergen.description)
                .join(MenuItemAllergen, Allergen.allergen_id == MenuItemAllergen.allergen_id)
                .filter(MenuItemAllergen.availability_id == ma.availability_id)
                .all()
            )
            allergens_list = [{"id": a[0], "name": a[1]} for a in allergens]
            logger.info(f"Found {len(allergens_list)} allergens for item: {ma.menu_item.item_name}")

            item = {
                "item_name": ma.menu_item.item_name,
                "location": ma.location.location_name,
                "location_id": ma.location.location_id,
                "meal_type": ma.meal_type.meal_type_name,
                "meal_type_id": ma.meal_type.meal_type_id, 
                "allergens": allergens_list,
                "ai_description": ma.menu_item.ai_description,
            }
            result.append(item)
        except Exception as e:
            logger.error(f"Error processing menu item {ma.menu_item.item_name}: {e}")
            continue
    
    elapsed_time = time.time() - start_time
    logger.info(f"get_menu_items completed in {elapsed_time:.3f}s, returning {len(result)} items")
    return result


def get_always_available_items(db: Session):
    logger.info("Fetching always available items")
    start_time = time.time()
    
    try:
        items = db.query(AlwaysAvailable).all()
        logger.info(f"Found {len(items)} always available items in database")
        
        result = [
            {
                "item_name": item.menu_item.item_name,
                "meal_type": item.meal_type.meal_type_name,
            }
            for item in items
        ]
        
        elapsed_time = time.time() - start_time
        logger.info(f"get_always_available_items completed in {elapsed_time:.3f}s, returning {len(result)} items")
        return result
    except Exception as e:
        logger.error(f"Error fetching always available items: {e}")
        return []

def get_locations(db: Session):
    logger.info("Fetching all locations")
    start_time = time.time()
    
    try:
        locations = db.query(Location).all()
        logger.info(f"Found {len(locations)} locations in database")
        
        result = [
            {
                "location_id": loc.location_id,
                "location_name": loc.location_name,
            }
            for loc in locations
        ]
        
        elapsed_time = time.time() - start_time
        logger.info(f"get_locations completed in {elapsed_time:.3f}s, returning {len(result)} locations")
        return result
    except Exception as e:
        logger.error(f"Error fetching locations: {e}")
        return []

def get_meal_types(db: Session):
    logger.info("Fetching all meal types")
    start_time = time.time()
    
    try:
        meal_types = db.query(MealType).all()
        logger.info(f"Found {len(meal_types)} meal types in database")
        
        result = [
            {
                "meal_type_id": mt.meal_type_id,
                "meal_type_name": mt.meal_type_name,
            }
            for mt in meal_types
        ]
        
        elapsed_time = time.time() - start_time
        logger.info(f"get_meal_types completed in {elapsed_time:.3f}s, returning {len(result)} meal types")
        return result
    except Exception as e:
        logger.error(f"Error fetching meal types: {e}")
        return []

def get_days(db: Session):
    logger.info("Fetching all days")
    start_time = time.time()
    
    try:
        days = db.query(Day).all()
        logger.info(f"Found {len(days)} days in database")
        
        result = [
            {
                "day_id": day.day_id,
                "day_name": day.day_name,
            }
            for day in days
        ]
        
        elapsed_time = time.time() - start_time
        logger.info(f"get_days completed in {elapsed_time:.3f}s, returning {len(result)} days")
        return result
    except Exception as e:
        logger.error(f"Error fetching days: {e}")
        return []

def get_allergens(db: Session):
    logger.info("Fetching all allergens")
    start_time = time.time()
    
    try:
        allergens = db.query(Allergen).all()
        logger.info(f"Found {len(allergens)} allergens in database")
        
        result = [
            {
                "allergen_id": allergen.allergen_id,
                "description": allergen.description,
            }
            for allergen in allergens
        ]
        
        elapsed_time = time.time() - start_time
        logger.info(f"get_allergens completed in {elapsed_time:.3f}s, returning {len(result)} allergens")
        return result
    except Exception as e:
        logger.error(f"Error fetching allergens: {e}")
        return []
