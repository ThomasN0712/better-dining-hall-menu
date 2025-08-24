import json
import os
import psycopg2
import re
import logging
from datetime import datetime
from dotenv import load_dotenv

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

logger.info("Starting parse_json.py script")

# Load JSON data
logger.info("Loading JSON data from dining_menu.json")
try:
    with open('dining_menu.json') as f:
        data = json.load(f)
    logger.info(f"JSON data loaded successfully. Found {len(data)} main sections")
    logger.info(f"Sections: {list(data.keys())}")
except Exception as e:
    logger.error(f"Failed to load JSON data: {e}")
    raise

# Connect to the database using environment variables
logger.info("Loading environment variables")
load_dotenv()

# Log connection parameters (without password)
logger.info(f"Database connection parameters:")
logger.info(f"  HOST: {os.getenv('DATABASE_HOST')}")
logger.info(f"  PORT: {os.getenv('DATABASE_PORT')}")
logger.info(f"  DATABASE: {os.getenv('DATABASE_NAME')}")
logger.info(f"  USER: {os.getenv('DATABASE_USER')}")
logger.info(f"  PASSWORD: {'*' * len(os.getenv('DATABASE_PASSWORD', '')) if os.getenv('DATABASE_PASSWORD') else 'NOT SET'}")

logger.info("Attempting database connection...")
try:
    conn = psycopg2.connect(
        dbname=os.getenv("DATABASE_NAME"),
        user=os.getenv("DATABASE_USER"),
        password=os.getenv("DATABASE_PASSWORD"),
        host=os.getenv("DATABASE_HOST"),
        port=os.getenv("DATABASE_PORT")
    )
    cur = conn.cursor()
    logger.info("Database connection successful!")
except Exception as e:
    logger.error(f"Database connection failed: {e}")
    raise

# Month abbreviation fix function
def fix_month_abbr(week_of):
    return week_of.replace("Sept", "Sep")  # Convert "Sept" to "Sep"

# Insert into Cycle and Day tables
logger.info("=== PROCESSING CYCLE DATES ===")
cycle_count = 0
total_cycles = len(data["Cycle Dates"].items())
logger.info(f"Found {total_cycles} cycles to process")

for cycle_name, cycle_data in data["Cycle Dates"].items():
    cycle_count += 1
    logger.info(f"Processing cycle {cycle_count}/{total_cycles}: {cycle_name}")
    
    # Extract the year from the cycle_name
    year_match = re.search(r"\b\d{4}\b", cycle_name)
    year = year_match.group() if year_match else "2025"  # Default to 2025 if not found
    
    entry_count = 0
    for entry in cycle_data:
        entry_count += 1
        week_of = fix_month_abbr(entry["week_of"]) 
        cycle_identifier = entry["menu_cycle"]
        
        logger.debug(f"  Processing entry {entry_count}: {week_of} - Cycle {cycle_identifier}")
        
        # Construct the full date string with the year
        full_date_str = f"{week_of} {year}"
        start_date = datetime.strptime(full_date_str, "%b %d %Y")  # Includes the year now

        # Insert into Cycle table with the cycle identifier
        try:
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
        except Exception as e:
            logger.error(f"Error processing cycle {cycle_name}, entry {entry_count}: {e}")
            raise

logger.info(f"Completed processing {cycle_count} cycles")

# Insert distinct Meal Types
logger.info("=== PROCESSING MEAL TYPES ===")
meal_types = ["Breakfast", "Brunch", "Lunch", "Dinner"]
for meal_type in meal_types:
    logger.info(f"Inserting meal type: {meal_type}")
    cur.execute(
        "INSERT INTO Meal_Type (meal_type_name) VALUES (%s) ON CONFLICT DO NOTHING RETURNING meal_type_id",
        (meal_type,)
    )

# Insert distinct Locations
logger.info("=== PROCESSING LOCATIONS ===")
locations = ["Beachside", "Hillside", "Parkside"]
for location in locations:
    logger.info(f"Inserting location: {location}")
    cur.execute(
        "INSERT INTO Location (location_name) VALUES (%s) ON CONFLICT DO NOTHING RETURNING location_id",
        (location,)
    )

# Insert Menu Items and Allergens (to avoid duplicates)
logger.info("=== PROCESSING ALWAYS AVAILABLE ITEMS ===")
always_available_count = 0
for meal_type, items in data["Always Available"].items():
    logger.info(f"Processing Always Available for meal type: {meal_type} ({len(items)} items)")
    cur.execute("SELECT meal_type_id FROM Meal_Type WHERE meal_type_name = %s", (meal_type,))
    meal_type_id = cur.fetchone()[0]

    for item_name in items:
        always_available_count += 1
        if always_available_count % 10 == 0:
            logger.info(f"  Processed {always_available_count} always available items")
            
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

logger.info(f"Completed processing {always_available_count} always available items")

# Insert Allergens into Allergen table
logger.info("=== PROCESSING ALLERGENS ===")
allergens = {
    "E": "Eggs", "M": "Milk", "W": "Wheat", "S": "Soy",
    "P": "Peanuts", "TN": "Tree Nuts", "F": "Fish", "SF": "Crustacean", "SS": "Sesame Seeds"
}
for code, description in allergens.items():
    logger.info(f"Inserting allergen: {code} - {description}")
    cur.execute(
        "INSERT INTO Allergen (allergen_code, description) VALUES (%s, %s) ON CONFLICT DO NOTHING",
        (code, description)
    )

# Insert Daily Menus with support for multiple allergens
logger.info("=== PROCESSING DAILY MENUS ===")
logger.info("This is the most complex section and may take some time...")

daily_menu_cycles = len(data["Daily Menus"])
logger.info(f"Found {daily_menu_cycles} cycles in Daily Menus")

cycle_counter = 0
total_items_processed = 0

for cycle, days in data["Daily Menus"].items():
    cycle_counter += 1
    logger.info(f"Processing Daily Menu cycle {cycle_counter}/{daily_menu_cycles}: {cycle}")
    
    cycle_identifier = cycle.split()[1]
    cur.execute("SELECT cycle_id FROM Cycle WHERE cycle_identifier = %s", (cycle_identifier,))
    cycle_result = cur.fetchone()
    if not cycle_result:
        logger.error(f"Could not find cycle_id for cycle_identifier: {cycle_identifier}")
        continue
    cycle_id = cycle_result[0]

    day_counter = 0
    for day, meals in days.items():
        day_counter += 1
        logger.info(f"  Processing day {day_counter}: {day}")
        
        cur.execute("SELECT day_id FROM Day WHERE day_name = %s AND cycle_id = %s", (day, cycle_id))
        day_result = cur.fetchone()
        if not day_result:
            logger.error(f"Could not find day_id for day: {day}, cycle_id: {cycle_id}")
            continue
        day_id = day_result[0]

        meal_counter = 0
        for meal_type, locations in meals.items():
            meal_counter += 1
            logger.info(f"    Processing meal {meal_counter}: {meal_type}")
            
            cur.execute("SELECT meal_type_id FROM Meal_Type WHERE meal_type_name = %s", (meal_type,))
            meal_type_result = cur.fetchone()
            if not meal_type_result:
                logger.error(f"Could not find meal_type_id for meal_type: {meal_type}")
                continue
            meal_type_id = meal_type_result[0]

            location_counter = 0
            for location, items in locations.items():
                location_counter += 1
                logger.info(f"      Processing location {location_counter}: {location} ({len(items)} items)")
                
                cur.execute("SELECT location_id FROM Location WHERE location_name = %s", (location,))
                location_result = cur.fetchone()
                if not location_result:
                    logger.error(f"Could not find location_id for location: {location}")
                    continue
                location_id = location_result[0]

                item_counter = 0
                for item_name, allergen_codes in items.items():
                    item_counter += 1
                    total_items_processed += 1
                    
                    if item_counter % 50 == 0:
                        logger.info(f"        Processed {item_counter}/{len(items)} items in {location}")
                    
                    if total_items_processed % 100 == 0:
                        logger.info(f"*** TOTAL PROGRESS: {total_items_processed} items processed ***")
                    
                    try:
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
                                    
                    except Exception as e:
                        logger.error(f"Error processing item '{item_name}' in {location}/{meal_type}/{day}: {e}")
                        continue

logger.info(f"Completed processing Daily Menus. Total items processed: {total_items_processed}")

# Commit all changes and close the connection
logger.info("=== FINALIZING ===")
logger.info("Committing changes to database...")
try:
    conn.commit()
    logger.info("Changes committed successfully!")
except Exception as e:
    logger.error(f"Error committing changes: {e}")
    raise

logger.info("Closing database connection...")
cur.close()
conn.close()
logger.info("Database connection closed")

logger.info("=== SCRIPT COMPLETED SUCCESSFULLY ===")
