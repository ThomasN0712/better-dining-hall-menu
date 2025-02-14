import os
import re
import json
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_community.utilities import SQLDatabase
from langchain.chains import create_sql_query_chain
from sqlalchemy import create_engine, text
from langchain_core.messages import AIMessage  # Ensure proper type checking
#TODO: Give 20 pre made prompt, design word matching system to give certain example, reduce token context length.

# Load environment variables from .env
load_dotenv()

# Get API key and database URL
api_key = os.getenv("OPENAI_API_KEY")
db_uri = os.getenv("DATABASE_URL")

if not api_key:
    raise ValueError("OpenAI API Key is missing. Check your .env file.")
if not db_uri:
    raise ValueError("Database URL is missing. Check your .env file.")

# Initialize OpenAI models
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3 , openai_api_key=api_key)
refinement_llm = ChatOpenAI(model="gpt-4", temperature=0.7, openai_api_key=api_key)  # Stronger model for retries

# Connect to PostgreSQL database
engine = create_engine(db_uri)
database = SQLDatabase(engine)

# Create SQL generation chain
sql_chain = create_sql_query_chain(llm, database)


def clean_sql_query(generated_sql):
    """Extracts only the valid SQL query from the LLM-generated text."""
    if not isinstance(generated_sql, str):
        raise ValueError("Expected SQL query to be a string, but got non-string type.")

    # Find the start of the SQL query
    match = re.search(r"(SELECT|INSERT|UPDATE|DELETE)\s", generated_sql, re.IGNORECASE)

    if match:
        clean_sql = generated_sql[match.start():]  # Trim everything before the SQL statement
    else:
        raise ValueError("No valid SQL query found in the LLM response.")

    # Remove everything after the last semicolon (`;`) to discard extra comments
    clean_sql = re.split(r";\s*\n", clean_sql)[0] + ";"  # Keep only the first valid SQL statement

    # Remove unnecessary formatting (`SQLQuery:` and backticks)
    clean_sql = re.sub(r"SQLQuery:\s*", "", clean_sql)
    clean_sql = re.sub(r"```sql|```", "", clean_sql).strip()

    # Ensure date formatting is correct
    clean_sql = clean_sql.replace('TO_CHAR(CURRENT_DATE, \'Day\')', 'TRIM(TO_CHAR(CURRENT_DATE, \'Day\'))')
    clean_sql = clean_sql.replace('"day"."day_name"', 'TRIM("day"."day_name")')

    return clean_sql



def generate_and_execute_sql(user_query, retries=3):
    """
    Generates SQL from natural language, executes it, and retries if needed with error feedback.
    Ensures SQL queries are extracted properly and refined using context from previous attempts.
    """
    attempt = 1
    last_generated_sql = None
    last_error_message = None

    while attempt <= retries:
        print(f"\n🔄 **Attempt {attempt}/{retries}** Generating SQL for: {user_query}")

        # Step 1: Modify the query with error details if retrying
        refined_query = user_query
        if last_generated_sql or last_error_message:
            refined_query = (
                f"Previous SQL query:\n{last_generated_sql}\n\n"
                f"Execution error (if any): {last_error_message}\n\n"
                f"First, explain why the query failed. "
                f"Then, generate a corrected SQL query that avoids this issue. "
                f"Ensure the query follows PostgreSQL syntax and does not repeat the same mistake."
            )

        # Step 2: Generate SQL query
        generated_sql = (
            refinement_llm.invoke(refined_query) if attempt > 1 else
            sql_chain.invoke({"question": refined_query})
        )

        # Ensure correct type handling
        if isinstance(generated_sql, AIMessage):
            generated_sql = generated_sql.content  # Extract text from AIMessage

        clean_sql = clean_sql_query(generated_sql)  # Extract SQL statement
        last_generated_sql = clean_sql  # Store SQL for retry context

        print(f"\n🔍 Extracted SQL Query:\n{clean_sql}\n")

        # Step 3: Execute SQL and fetch results
        try:
            with engine.connect() as connection:
                result = connection.execute(text(clean_sql))
                rows = result.fetchall()
                column_names = result.keys()
        except Exception as e:
            last_error_message = str(e)
            print(f"\n❌ SQL Execution Error: {last_error_message}")
            attempt += 1
            continue  # Retry with refined query

        # Step 4: Handle empty results
        if not rows:
            print("\n⚠️ No results found, asking LLM to refine the query...")
            last_error_message = "Query returned no results."
            attempt += 1
            continue  # Retry with modified query

        # Convert results into JSON format
        formatted_results = [dict(zip(column_names, row)) for row in rows]
        return json.dumps(formatted_results, indent=2)

    return f"❌ No valid results after multiple attempts. Last error: {last_error_message}"  


# ** Test with Multiple Queries **
test_queries = [
    # "What meals are available at Parkside today?",
    # "Show me all gluten-free meals at Hillside.",
    "What are the dinner options for tomorrow?",
    "Which meals contain peanuts?",
    # "List all available meal locations.",
]

for query in test_queries:
    print(f"\n🟢 **Query:** {query}")
    response = generate_and_execute_sql(query)
    print(f"\n📌 **Response:**\n{response}")
