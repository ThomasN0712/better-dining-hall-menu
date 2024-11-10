from sqlalchemy.orm import Session
from models import Base, engine, SessionLocal  # Import Base, engine, and SessionLocal from models
from models import Allergen, AlwaysAvailable, Cycle, Day, Location, MealType, MenuAvailability, MenuItem, MenuItemAllergen

# Initialize the database (this will create the tables if they don’t already exist)
Base.metadata.create_all(bind=engine)

# Function to get a new session
def get_session():
    # This function provides a new session and ensures it's closed after usage
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

# Example function to query data
def query_data():
    with SessionLocal() as session:
        # Query all allergens
        allergens = session.query(Allergen).all()
        print("Allergens:")
        for allergen in allergens:
            print(allergen)
        
        # Query all cycles
        cycles = session.query(Cycle).all()
        print("\nCycles:")
        for cycle in cycles:
            print(cycle)

# Main function
if __name__ == "__main__":
    # Query data from the database
    query_data()
