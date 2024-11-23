from sqlalchemy.orm import Session
from app.db.models import MenuItem, AlwaysAvailable, MenuAvailability, Location, MealType, Day
import datetime

def get_menu_items(db: Session, date_str: str, location_id: int, meal_type_id: int):
    date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d")
    day_name = date_obj.strftime('%A')

    day = db.query(Day).filter(Day.day_name == day_name).first()
    if not day:
        return []

    menu_availability_list = (
        db.query(MenuAvailability)
        .join(MenuItem)
        .join(Location)
        .join(MealType)
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
        allergens = db.query(Allergen.allergen_code).join(MenuItemAllergen).filter(
            MenuItemAllergen.availability_id == ma.availability_id
        ).all()
        allergen_codes = [a[0] for a in allergens]

        item = {
            "item_name": ma.menu_item.item_name,
            "location": ma.location.location_name,
            "meal_type": ma.meal_type.meal_type_name,
            "allergens": allergen_codes,
        }
        result.append(item)
    return result

def get_always_available_items(db: Session):
    items = db.query(AlwaysAvailable).all()
    return [{"item_name": item.menu_item.item_name, "meal_type": item.meal_type.meal_type_name} for item in items]

def get_locations(db: Session):
    locations = db.query(Location).all()
    return [{"location_id": loc.location_id, "location_name": loc.location_name} for loc in locations]
