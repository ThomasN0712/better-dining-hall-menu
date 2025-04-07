import os
from dotenv import load_dotenv
import logging
from .agent import DiningAgent
from .tools import get_tools
from langchain_openai import ChatOpenAI

# Set up logging
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get API key
api_key = os.getenv("OPENAI_API_KEY") 
if not api_key:
    raise ValueError("OpenAI API Key is missing. Check your .env file.")

def initialize_dining_agent():
    """
    Initialize and return a DiningAgent instance with configured LLM and tools.
    """
    try:
        logger.info("Initializing dining agent...")
        
        # Initialize the LLM
        llm = ChatOpenAI(
            api_key=api_key,
            temperature=0.2,
            model="gpt-4o-mini"
        )
        logger.info("LLM initialized successfully")
        
        # Initialize the agent with all available tools
        agent = DiningAgent(llm=llm, tools=get_tools())
        logger.info("Agent initialized successfully with tools")
        
        return agent
    except Exception as e:
        logger.error(f"Error initializing dining agent: {str(e)}", exc_info=True)
        raise

# Initialize the agent when this module is imported
try:
    dining_agent = initialize_dining_agent()
    logger.info("Dining agent initialized and ready")
except Exception as e:
    logger.error(f"Failed to initialize dining agent: {str(e)}", exc_info=True)
    raise