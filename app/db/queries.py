from .database import SessionLocal
from .models import MenuItem, AlwaysAvailable, MenuAvailability, Location, MealType

def get_menu_items(date: str, location_id: int, meal_type_id: int):
    session = SessionLocal()
    try:
        return (
            session.query(MenuAvailability)
            .join(MenuItem, MenuAvailability.item_id == MenuItem.item_id)
            .join(Location, MenuAvailability.location_id == Location.location_id)
            .join(MealType, MenuAvailability.meal_type_id == MealType.meal_type_id)
            .filter(
                MenuAvailability.day_id == date,
                MenuAvailability.location_id == location_id,
                MenuAvailability.meal_type_id == meal_type_id,
            )
            .all()
        )
    finally:
        session.close()

def get_always_available_items():
    session = SessionLocal()
    try:
        return session.query(AlwaysAvailable).all()
    finally:
        session.close()
