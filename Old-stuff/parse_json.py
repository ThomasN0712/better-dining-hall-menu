import json
import os
import psycopg2
import re
from datetime import datetime
from dotenv import load_dotenv

# Load JSON data
with open('dining_menu.json') as f:
    data = json.load(f)

# Connect to the database using environment variables
load_dotenv()
conn = psycopg2.connect(
    dbname=os.getenv("DATABASE_NAME"),
    user=os.getenv("DATABASE_USER"),
    password=os.getenv("DATABASE_PASSWORD"),
    host=os.getenv("DATABASE_HOST"),
    port=os.getenv("DATABASE_PORT")
)
cur = conn.cursor()

# Month abbreviation fix function
def fix_month_abbr(week_of):
    return week_of.replace("Sept", "Sep")  # Convert "Sept" to "Sep"

# Insert into Cycle and Day tables
for cycle_name, cycle_data in data["Cycle Dates"].items():
    # Extract the year from the cycle_name
    year_match = re.search(r"\b\d{4}\b", cycle_name)
    year = year_match.group() if year_match else "2024"  # Default to 2024 if not found
    
    for entry in cycle_data:
        week_of = fix_month_abbr(entry["week_of"]) 
        cycle_identifier = entry["menu_cycle"]
        
        # Construct the full date string with the year
        full_date_str = f"{week_of} {year}"
        start_date = datetime.strptime(full_date_str, "%b %d %Y")  # Includes the year now

        # Insert into Cycle table with the cycle identifier
        cur.execute(
            """
            INSERT INTO Cycle (cycle_name, cycle_identifier, start_date) 
            VALUES (%s, %s, %s) 
            ON CONFLICT DO NOTHING 
            RETURNING cycle_id
            """,
            (cycle_name, cycle_identifier, start_date)
        )
        result = cur.fetchone()
        
        # Ensure cycle_id exists if the cycle already existed
        if result:
            cycle_id = result[0]
        else:
            cur.execute(
                "SELECT cycle_id FROM Cycle WHERE cycle_name = %s AND cycle_identifier = %s",
                (cycle_name, cycle_identifier)
            )
            cycle_id = cur.fetchone()[0]

        # Insert related days for this cycle entry
        days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        for day in days_of_week:
            cur.execute(
                """
                INSERT INTO Day (day_name, cycle_id) 
                VALUES (%s, %s) 
                ON CONFLICT (day_name, cycle_id) DO NOTHING 
                RETURNING day_id
                """,
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

# Insert Menu Items and Allergens (to avoid duplicates)
for meal_type, items in data["Always Available"].items():
    cur.execute("SELECT meal_type_id FROM Meal_Type WHERE meal_type_name = %s", (meal_type,))
    meal_type_id = cur.fetchone()[0]

    for item_name in items:
        cur.execute(
            "INSERT INTO Menu_Item (item_name) VALUES (%s) ON CONFLICT DO NOTHING RETURNING item_id",
            (item_name,)
        )
        result = cur.fetchone()
        
        # Fetch the item_id if it already exists
        if result:
            item_id = result[0]
        else:
            cur.execute("SELECT item_id FROM Menu_Item WHERE item_name = %s", (item_name,))
            item_id = cur.fetchone()[0]
        
        # Insert into Always_Available
        cur.execute(
            "INSERT INTO Always_Available (meal_type_id, item_id) VALUES (%s, %s) ON CONFLICT DO NOTHING",
            (meal_type_id, item_id)
        )

# Insert Allergens into Allergen table
allergens = {
    "E": "Eggs", "M": "Milk", "W": "Wheat", "S": "Soy",
    "P": "Peanuts", "TN": "Tree Nuts", "F": "Fish", "SF": "Crustacean", "SS": "Sesame Seeds"
}
for code, description in allergens.items():
    cur.execute(
        "INSERT INTO Allergen (allergen_code, description) VALUES (%s, %s) ON CONFLICT DO NOTHING",
        (code, description)
    )

# Insert Daily Menus with support for multiple allergens
for cycle, days in data["Daily Menus"].items():
    cycle_identifier = cycle.split()[1]
    cur.execute("SELECT cycle_id FROM Cycle WHERE cycle_identifier = %s", (cycle_identifier,))
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
                    item_id_result = cur.fetchone()
                    if item_id_result:
                        item_id = item_id_result[0]
                    else:
                        # The item already exists, so fetch its ID
                        cur.execute("SELECT item_id FROM Menu_Item WHERE item_name = %s", (item_name,))
                        item_id = cur.fetchone()[0]

                    # Insert availability with unique day_id, meal_type_id, location_id, and item_id
                    cur.execute(
                        """
                        INSERT INTO Menu_Availability (day_id, meal_type_id, location_id, item_id) 
                        VALUES (%s, %s, %s, %s)
                        ON CONFLICT (day_id, meal_type_id, location_id, item_id) DO NOTHING 
                        RETURNING availability_id
                        """,
                        (day_id, meal_type_id, location_id, item_id)
                    )
                    availability_result = cur.fetchone()
                    
                    # If availability was inserted, insert allergens for that availability_id
                    if availability_result:
                        availability_id = availability_result[0]
                        # Insert each allergen for this availability
                        for allergen_code in allergen_codes:
                            cur.execute("SELECT allergen_id FROM Allergen WHERE allergen_code = %s", (allergen_code,))
                            allergen_result = cur.fetchone()
                            if allergen_result:
                                allergen_id = allergen_result[0]
                                cur.execute(
                                    """
                                    INSERT INTO Menu_Item_Allergen (availability_id, allergen_id) 
                                    VALUES (%s, %s) 
                                    ON CONFLICT DO NOTHING
                                    """,
                                    (availability_id, allergen_id)
                                )


# Commit all changes and close the connection
conn.commit()
cur.close()
conn.close()
