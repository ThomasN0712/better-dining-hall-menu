import os
import logging
from openai import OpenAI
from dotenv import load_dotenv
import psycopg2

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize OpenAI client
KEYYYYYY = os.getenv("KEYYYYYY")
if KEYYYYYY:
    client = OpenAI(api_key=KEYYYYYY)
    logger.info("OpenAI client initialized successfully")
else:
    logger.error("KEYYYYYY not found in environment variables")
    raise ValueError("KEYYYYYY must be set in environment variables")

# Database connection parameters (same as parse_json.py)
logger.info("Database connection parameters:")
logger.info(f"  HOST: {os.getenv('DATABASE_HOST')}")
logger.info(f"  PORT: {os.getenv('DATABASE_PORT')}")
logger.info(f"  DATABASE: {os.getenv('DATABASE_NAME')}")
logger.info(f"  USER: {os.getenv('DATABASE_USER')}")
logger.info(f"  PASSWORD: {'*' * len(os.getenv('DATABASE_PASSWORD', '')) if os.getenv('DATABASE_PASSWORD') else 'NOT SET'}")

def get_db_connection():
    """Create and return a database connection using the same method as parse_json.py"""
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("DATABASE_NAME"),
            user=os.getenv("DATABASE_USER"),
            password=os.getenv("DATABASE_PASSWORD"),
            host=os.getenv("DATABASE_HOST"),
            port=os.getenv("DATABASE_PORT")
        )
        logger.info("Database connection successful!")
        return conn
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        raise

def generate_ai_description(item_name, allergens):
    """
    Generate an AI-powered description for a menu item.
    Will only select item without description
    """
    prompt = (
        f"Write a short (under 25 words), appetizing description of {item_name} mentioning only its main components without assuming specific side dishes. Contains allergens: {allergens if allergens else 'None'}."
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"Error generating description for {item_name}: {e}")
        raise

def update_menu_descriptions():
    """Fetch items without descriptions, generate AI descriptions, and update the database."""
    logger.info("Starting menu description update process")
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Fetch menu items without descriptions
        logger.info("Fetching menu items without descriptions...")
        cur.execute("""
            SELECT DISTINCT ON (mi.item_name)
                mi.item_id,
                mi.item_name,
                STRING_AGG(a.description, ', ') AS allergens
            FROM menu_availability AS mav
            JOIN menu_item AS mi ON mav.item_id = mi.item_id
            LEFT JOIN menu_item_allergen AS mia ON mia.availability_id = mav.availability_id
            LEFT JOIN allergen AS a ON mia.allergen_id = a.allergen_id
            WHERE mi.ai_description IS NULL OR mi.ai_description = ''
            GROUP BY mi.item_id, mi.item_name
            ORDER BY mi.item_name
        """)
        
        items = cur.fetchall()
        total_items = len(items)
        logger.info(f"Found {total_items} items without descriptions")
        
        if total_items == 0:
            logger.info("No items need description updates")
            return

        processed_count = 0
        for item in items:
            item_id, item_name, allergens = item
            processed_count += 1
            
            logger.info(f"Processing item {processed_count}/{total_items}: {item_name}")
            logger.debug(f"  Allergens: {allergens if allergens else 'None'}")
            
            try:
                description = generate_ai_description(item_name, allergens)
                logger.debug(f"  Generated description: {description}")

                # Update database with AI-generated description
                cur.execute(
                    "UPDATE menu_item SET ai_description = %s WHERE item_id = %s",
                    (description, item_id)
                )
                
                if processed_count % 10 == 0:
                    logger.info(f"Progress: {processed_count}/{total_items} items processed")
                    
            except Exception as e:
                logger.error(f"Error processing item {item_name}: {e}")
                continue

        # Commit all changes
        logger.info("Committing changes to database...")
        conn.commit()
        logger.info(f"Successfully updated {processed_count} menu item descriptions!")

    except Exception as e:
        logger.error(f"Error during description update process: {e}")
        conn.rollback()
        raise
    finally:
        cur.close()
        conn.close()
        logger.info("Database connection closed")

if __name__ == "__main__":
    update_menu_descriptions()




