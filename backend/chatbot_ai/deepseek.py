import os
from dotenv import load_dotenv
import logging
from .agent import DiningAgent
from .tools import TOOLS
from langchain_openai import ChatOpenAI

# Set up logging
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get API key
api_key = os.getenv("DEEPSEEK_API_KEY") 
if not api_key:
    raise ValueError("DeepSeek API Key is missing. Check your .env file.")

def initialize_dining_agent():
    """
    Initialize and return a DiningAgent instance with configured LLM and tools.
    """
    try:
        logger.info("Initializing dining agent...")
        
        # Initialize the LLM
        llm = ChatOpenAI(
            model="deepseek-chat",  # or your preferred DeepSeek model
            temperature=0.3,
            api_key=api_key
        )
        logger.info("LLM initialized successfully")
        
        # Initialize the agent with all available tools
        agent = DiningAgent(llm=llm, tools=TOOLS)
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