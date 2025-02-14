import os
import openai
import chromadb
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

# Load API keys and database URI
api_key = os.getenv("OPENAI_API_KEY")
db_uri = os.getenv("DATABASE_URL")

openai.api_key = api_key
engine = create_engine(db_uri)

# Initialize ChromaDB
chroma_client = chromadb.PersistentClient(path="./chroma_db")  # Persistent storage
collection = chroma_client.get_or_create_collection(name="menu_items")

def get_menu_items():
    """Fetch menu items from PostgreSQL."""
    with engine.connect() as connection:
        result = connection.execute(text("""
                                         SELECT DISTINCT ON (mi.item_name)
                                            mi.item_name,
                                            STRING_AGG(DISTINCT a.description, ', ') AS allergens,
                                            l.location_name
                                        FROM menu_availability AS mav
                                        JOIN menu_item AS mi ON mav.item_id = mi.item_id
                                        LEFT JOIN menu_item_allergen AS mia ON mia.availability_id = mav.availability_id
                                        LEFT JOIN allergen AS a ON mia.allergen_id = a.allergen_id
                                        LEFT JOIN location AS l ON mav.location_id = l.location_id
                                        GROUP BY mi.item_name, l.location_name
                                        ORDER BY mi.item_name, l.location_name;

                                         """))
        return [dict(row) for row in result.fetchall()]

def get_embedding(text):
    """Generate OpenAI embedding for a given text."""
    response = openai.Embedding.create(
        input=[text],
        model="text-embedding-ada-002"
    )
    return response['data'][0]['embedding']

def index_menu_items():
    """Extracts menu data, generates embeddings, and stores in ChromaDB."""
    menu_items = get_menu_items()
    for item in menu_items:
        text_repr = f"{item['item_name']}. {item['description']}. Allergens: {item['allergens']}. Location: {item['location']}."
        embedding = get_embedding(text_repr)

        collection.add(
            ids=[str(item['id'])],
            embeddings=[embedding],
            metadatas=[item]
        )

# Run indexing
index_menu_items()
print("✅ Menu items indexed in ChromaDB!")
