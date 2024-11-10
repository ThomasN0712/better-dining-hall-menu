import json
import psycopg2
from datetime import datetime

# Load JSON data
with open('dining_menu.json') as f:
    data = json.load(f)

# Connect to the database
conn = psycopg2.connect(
    dbname="dining_hall_menu", user="postgres", password="0712", host="localhost"
)
cur = conn.cursor()

# Insert into Cycle table
for cycle_name, cycle_data in data["Cycle Dates"].items():
    start_date = datetime.strptime(cycle_data[0]["week_of"], "%b %d")  # convert "Aug 26" to date
    cur.execute(
        "INSERT INTO Cycle (cycle_name, start_date) VALUES (%s, %s) RETURNING cycle_id",
        (cycle_name, start_date)
    )
    cycle_id = cur.fetchone()[0]  # Get the inserted cycle ID

    # Insert related days
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for day in days_of_week:
        cur.execute(
            "INSERT INTO Day (day_name, cycle_id) VALUES (%s, %s) RETURNING day_id",
            (day, cycle_id)
        )

# Insert distinct Meal Types
meal_types = ["Breakfast", "Brunch", "Lunch", "Dinner"]
for meal_type in meal_types:
    cur.execute(
        "INSERT INTO Meal_Type (meal_type_name) VALUES (%s) ON CONFLICT DO NOTHING RETURNING meal_type_id",
        (meal_type,)
    )

# Insert distinct Locations
locations = ["Beachside", "Hillside", "Parkside"]
for location in locations:
    cur.execute(
        "INSERT INTO Location (location_name) VALUES (%s) ON CONFLICT DO NOTHING RETURNING location_id",
        (location,)
    )

# Insert Menu Items and Allergens (with ON CONFLICT to avoid duplicates)
for meal_type, items in data["Always Available"].items():
    for item_name in items:
        cur.execute(
            "INSERT INTO Menu_Item (item_name) VALUES (%s) ON CONFLICT DO NOTHING RETURNING item_id",
            (item_name,)
        )

# Insert into Allergen table
allergens = {
    "E": "Eggs", "M": "Milk", "W": "Wheat", "S": "Soy",
    "P": "Peanuts", "TN": "Tree Nuts", "F": "Fish", "SF-C": "Shellfish/Crustacean", "SS": "Sesame Seeds"
}
for code, description in allergens.items():
    cur.execute(
        "INSERT INTO Allergen (allergen_code, description) VALUES (%s, %s) ON CONFLICT DO NOTHING",
        (code, description)
    )

conn.commit()


# Insert Always Available items with references to meal types and menu items
for meal_type, items in data["Always Available"].items():
    cur.execute("SELECT meal_type_id FROM Meal_Type WHERE meal_type_name = %s", (meal_type,))
    meal_type_id = cur.fetchone()[0]

    for item_name in items:
        cur.execute("SELECT item_id FROM Menu_Item WHERE item_name = %s", (item_name,))
        item_id = cur.fetchone()[0]
        
        cur.execute(
            "INSERT INTO Always_Available (meal_type_id, item_id) VALUES (%s, %s) ON CONFLICT DO NOTHING",
            (meal_type_id, item_id)
        )

conn.commit()

for cycle, days in data["Daily Menus"].items():
    
    cur.execute("SELECT cycle_id FROM Cycle WHERE cycle_name = %s", (cycle,))
    cycle_id = cur.fetchone()[0]

    for day, meals in days.items():
        cur.execute("SELECT day_id FROM Day WHERE day_name = %s AND cycle_id = %s", (day, cycle_id))
        day_id = cur.fetchone()[0]

        for meal_type, locations in meals.items():
            cur.execute("SELECT meal_type_id FROM Meal_Type WHERE meal_type_name = %s", (meal_type,))
            meal_type_id = cur.fetchone()[0]

            for location, items in locations.items():
                cur.execute("SELECT location_id FROM Location WHERE location_name = %s", (location,))
                location_id = cur.fetchone()[0]

                for item_name, allergen_codes in items.items():
                    # Insert menu item if not already present
                    cur.execute(
                        "INSERT INTO Menu_Item (item_name) VALUES (%s) ON CONFLICT (item_name) DO NOTHING RETURNING item_id",
                        (item_name,)
                    )
                    item_id = cur.fetchone()[0] if cur.fetchone() else None

                    # Insert availability with item_id, day_id, meal_type_id, and location_id
                    cur.execute(
                        "INSERT INTO Menu_Availability (day_id, meal_type_id, location_id, item_id) VALUES (%s, %s, %s, %s) RETURNING availability_id",
                        (day_id, meal_type_id, location_id, item_id)
                    )
                    availability_id = cur.fetchone()[0]

                    # Add allergen information for the item
                    for allergen_code in allergen_codes:
                        cur.execute("SELECT allergen_id FROM Allergen WHERE allergen_code = %s", (allergen_code,))
                        allergen_id = cur.fetchone()[0]
                        cur.execute(
                            "UPDATE Menu_Availability SET allergen_id = %s WHERE availability_id = %s",
                            (allergen_id, availability_id)
                        )

conn.commit()
cur.close()
conn.close()

