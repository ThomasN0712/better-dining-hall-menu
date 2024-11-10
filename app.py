from datetime import datetime, time
from sqlalchemy.orm import Session
from models import Allergen, MenuAvailability, AlwaysAvailable, Cycle, Day, MenuItem, Location, MealType, MenuAvailability, MenuItem, MenuItemAllergen
from models import SessionLocal
# Utility function to create and close sessions
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

# 1. Query today's menu for all locations or a specific location
def get_today_menu(location_name=None):
    # Get today's date and time
    today = datetime.today()
    day_name = today.strftime("%A")
    current_time = today.time()

    # Define dining hours
    dining_hours = {
        "Parkside": {
            "Monday-Friday": {
                "Breakfast": (time(7, 0), time(10, 0)),
                "Lunch": (time(11, 0), time(14, 30)),
                "Dinner": (time(16, 0), time(20, 30)),
                # "210 Block Plan": (time(7, 0), time(20, 30)),
            },
            "Saturday": {
                "Brunch": (time(9, 30), time(13, 30)),
                "Dinner": (time(16, 0), time(19, 30)),
                "210 Block Plan": (time(9, 30), time(19, 30)),
            },
            "Sunday": {
                "Brunch": (time(9, 30), time(13, 30)),
                "Dinner": (time(16, 0), time(19, 30)),
                # "210 Block Plan": (time(9, 30), time(19, 30)),
            },
        },
        "Hillside": {
            "Monday-Friday": {
                "Breakfast": (time(7, 0), time(10, 0)),
                "Lunch": (time(11, 0), time(14, 30)),
                "Dinner": (time(16, 0), time(20, 30)),
                # "210 Block Plan": (time(7, 0), time(20, 30)),
            },
            "Saturday": {
                "Brunch": (time(9, 30), time(13, 30)),
                "Dinner": (time(16, 0), time(19, 30)),
                # "210 Block Plan": (time(9, 30), time(19, 30)),
            },
            "Sunday": {
                "Brunch": (time(9, 30), time(13, 30)),
                "Dinner": (time(16, 0), time(19, 30)),
                # "210 Block Plan": (time(9, 30), time(19, 30)),
            },
        },
        "Beachside": {
            "Monday-Friday": {
                "Breakfast": (time(6, 30), time(9, 0)),
                "Lunch": (time(11, 0), time(13, 30)),
                "Dinner": (time(17, 0), time(20, 30)),
                # "210 Block Plan": (time(6, 30), time(20, 30)),
            },
            "Saturday-Sunday": {
                "Brunch": (time(11, 0), time(13, 30)),
                "Dinner": (time(17, 0), time(19, 30)),
                # "210 Block Plan": (time(11, 0), time(19, 30)),
            },
        },
    }

    # Determine which meal type to query based on current time
    meal_type = None
    location_schedule = dining_hours.get(location_name, dining_hours["Parkside"])
    
    if day_name in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]:
        schedule = location_schedule["Monday-Friday"]
    elif day_name == "Saturday":
        schedule = location_schedule["Saturday"]
    else:  # Sunday
        schedule = location_schedule["Sunday"]

    # Check current time against dining hours to find the meal type
    for meal, hours in schedule.items():
        start, end = hours
        if start <= current_time <= end:
            meal_type = meal
            break

    if not meal_type:
        return 0

    # Query the menu for today, filtered by meal type and location
    with SessionLocal() as session:
        query = session.query(MenuAvailability).join(Day).join(MealType).filter(
            Day.day_name == day_name,
            MealType.meal_type_name == meal_type
        )

        if location_name:
            query = query.join(Location).filter(Location.location_name == location_name)

        menu = query.all()
        return menu

# 2. Query always available menu items
def get_always_available_menu():
    with SessionLocal() as session:
        items = session.query(AlwaysAvailable).join(MenuItem).all()
        return items

# 3. Query menu for a specific date
def get_menu_for_date(date):
    with SessionLocal() as session:
        day_name = date.strftime("%A")  # Convert the date to a weekday name

        # Query to get the active cycle for the given date
        cycle = (
            session.query(Cycle)
            .filter(Cycle.start_date <= date)
            .order_by(Cycle.start_date.desc())
            .first()
        )

        if not cycle:
            print("No active cycle found for the given date.")
            return {}

        # Print cycle information (for debugging)
        print(f"Found active cycle: {cycle.cycle_name} with identifier: {cycle.cycle_identifier}")

        # Query to get menu items for the specific cycle, day, and date, with related information
        menu = (
            session.query(
                MenuItem.item_name,
                Location.location_name,
                MealType.meal_type_name,
                Allergen.description.label("allergen_description")
            )
            .join(MenuAvailability, MenuItem.item_id == MenuAvailability.item_id)
            .join(Day, Day.day_id == MenuAvailability.day_id)
            .join(Cycle, Cycle.cycle_id == Day.cycle_id)
            .join(Location, Location.location_id == MenuAvailability.location_id)
            .join(MealType, MealType.meal_type_id == MenuAvailability.meal_type_id)
            .outerjoin(Allergen, Allergen.allergen_id == MenuAvailability.allergen_id)
            .filter(Day.day_name == day_name, Cycle.cycle_identifier == cycle.cycle_identifier)
            .all()
        )
        
        print(menu)

        # Organize the results by location and meal type for better readability
        menu_by_location_and_meal = {}
        for item_name, location_name, meal_type_name, allergen_description in menu:

            # Initialize dictionary structure if not already set up
            if location_name not in menu_by_location_and_meal:
                menu_by_location_and_meal[location_name] = {}

            if meal_type_name not in menu_by_location_and_meal[location_name]:
                menu_by_location_and_meal[location_name][meal_type_name] = []

            # Append item details to the appropriate location and meal type
            menu_by_location_and_meal[location_name][meal_type_name].append({
                "item_name": item_name,
                "allergen": allergen_description if allergen_description else "None"
            })

        return menu_by_location_and_meal


# 4. Query all allergens for a specific menu item
def get_allergens_for_item(item_name):
    with SessionLocal() as session:
        allergens = session.query(MenuItemAllergen).join(MenuItem).filter(MenuItem.item_name == item_name).all()
        return allergens

# 5. Query weekly menu
def get_weekly_menu():
    with SessionLocal() as session:
        menu_by_day = {}
        for day_name in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]:
            daily_menu = session.query(MenuAvailability).join(Day).filter(Day.day_name == day_name).all()
            menu_by_day[day_name] = daily_menu
        return menu_by_day

# 6. Query items available for a specific meal type (e.g., breakfast)
def get_menu_by_meal_type(meal_type_name):
    with SessionLocal() as session:
        menu_items = session.query(MenuAvailability).join(MealType).filter(MealType.meal_type_name == meal_type_name).all()
        return menu_items

# 7. Query allergen-free options for a specific allergen
def get_allergen_free_items(allergen_code):
    with SessionLocal() as session:
        allergen_free_items = session.query(MenuItem).outerjoin(MenuItemAllergen).outerjoin(Allergen).filter(
            (Allergen.allergen_code != allergen_code) | (Allergen.allergen_code == None)
        ).all()
        return allergen_free_items

# 8. Query all locations
def get_all_locations():
    with SessionLocal() as session:
        locations = session.query(Location).all()
        return locations

# Main function
if __name__ == "__main__":
    # Test with a specific date
    # November 15 2024 Friday
    test_date = datetime(2024, 11, 15)
    menu_for_date = get_menu_for_date(test_date)
    
    # Display the menu in a structured format
    for location, meal_types in menu_for_date.items():
        print(f"Location: {location}")
        for meal_type, items in meal_types.items():
            print(f"  Meal Type: {meal_type}")
            for item in items:
                print(f"    Item: {item['item_name']}, Allergen: {item['allergen']}")
        print("-" * 40)

