from dotenv import load_dotenv
import os
import psycopg2

# Load environment variables
load_dotenv()

# Fetch database configurations
DATABASE_NAME = os.getenv("DATABASE_NAME")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_PORT = os.getenv("DATABASE_PORT")

# Function to connect to the database
def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname=DATABASE_NAME,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            host=DATABASE_HOST,
            port=DATABASE_PORT
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

# Example function to query data
def fetch_cycles():
    conn = get_db_connection()
    if conn is None:
        return []
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM Cycle;")
        cycles = cur.fetchall()
        return cycles
    except Exception as e:
        print(f"Error querying cycles: {e}")
        return []
    finally:
        cur.close()
        conn.close()
