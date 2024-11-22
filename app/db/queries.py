from .database import SessionLocal
from .models import MenuItem, AlwaysAvailable, MenuAvailability, Location, MealType, Day
import datetime


def get_menu_items(date_str: str, location_id: int, meal_type_id: int):
    session = SessionLocal()
    try:
        # Convert date string to datetime object
        date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d")
        # Get day name (e.g., 'Monday')
        day_name = date_obj.strftime('%A')  # '%A' gives the full weekday name

        # Get the day_id corresponding to the day_name
        day = session.query(Day).filter(Day.day_name == day_name).first()
        if not day:
            print(f"No day found for day_name: {day_name}")
            return []

        # Fetch the menu items
        menu_availability_list = (
            session.query(MenuAvailability)
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

        # Process the results to include menu item names, etc.
        result = []
        for ma in menu_availability_list:
            item = {
                "item_name": ma.menu_item.item_name,
                "location": ma.location.location_name,
                "meal_type": ma.meal_type.meal_type_name,
            }
            result.append(item)

        return result

    finally:
        session.close()


def get_always_available_items():
    session = SessionLocal()
    try:
        return session.query(AlwaysAvailable).all()
    finally:
        session.close()
