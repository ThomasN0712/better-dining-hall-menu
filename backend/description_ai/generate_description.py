from openai import OpenAI

client = OpenAI()
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SUPABASE_DB_URI = os.getenv("DATABASE_URL")  

# Create DB connection using SQLAlchemy
engine = create_engine(SUPABASE_DB_URI)

def generate_ai_description(item_name, allergens):
    """
    Generate an AI-powered description for a menu item.
    Will only select item without description
    """
    prompt = (
        f"Write a short (under 25 words), appetizing description of {item_name} mentioning only its main components without assuming specific side dishes. Contains allergens: {allergens if allergens else 'None'}."
    )

    response = client.chat.completions.create(model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}])
    return response.choices[0].message.content.strip()

def update_menu_descriptions():
    """Fetch items without descriptions, generate AI descriptions, and update the database."""
    with engine.connect() as conn:
        # Fetch menu items without descriptions
        result = conn.execute(text(
            """SELECT DISTINCT ON (mi.item_name)
                mi.item_id,
                mi.item_name,
                STRING_AGG(a.description, ', ') AS allergens
            FROM menu_availability AS mav
            JOIN menu_item AS mi ON mav.item_id = mi.item_id
            LEFT JOIN menu_item_allergen AS mia ON mia.availability_id = mav.availability_id
            LEFT JOIN allergen AS a ON mia.allergen_id = a.allergen_id
            GROUP BY mi.item_id, mi.item_name
            ORDER BY mi.item_name"""
        ))
        items = result.fetchall()

        for item in items:
            item_id, item_name, allergens = item
            description = generate_ai_description(item_name, allergens)

            # Update database with AI-generated description
            conn.execute(
                text("UPDATE menu_item SET ai_description = :desc WHERE item_id = :id"),
                {"desc": description, "id": item_id}
            )
            conn.commit()

    print("Descriptions updated successfully!")

if __name__ == "__main__":
    update_menu_descriptions()




