from abc import ABC, abstractmethod
from typing import Any, Dict, List

from langchain_core.language_models import BaseLLM
from langchain_core.tools import BaseTool
from backend.chatbot_ai.logger import get_logger


class BaseAgent(ABC):
    """Base agent class that all specific agents should inherit from."""
    
    def __init__(
        self,
        name: str,
        llm: BaseLLM,
        tools: List[BaseTool] = None,
        verbose: bool = False
    ):
        """
        Initialize a base agent.
        
        Args:
            name: Unique identifier for the agent
            llm: Language model used by the agent
            tools: List of tools available to the agent
            verbose: Whether to output detailed logs
        """
        self.name = name
        self.llm = llm
        self.tools = tools or []
        self.verbose = verbose
        self.memory = []  # Simple memory to store agent's conversation history
        self.logger = get_logger()
    
    def add_tool(self, tool: BaseTool) -> None:
        """Add a tool to the agent's toolkit."""
        self.tools.append(tool)
    
    def log(self, message, method=None):
        """Log a message with component and method information."""
        if self.verbose:
            self.logger.info(message, component=self.name, method=method)
    
    def log_debug(self, message, method=None):
        """Log a debug message with component and method information."""
        if self.verbose:
            self.logger.debug(message, component=self.name, method=method)
        
    def log_warning(self, message, method=None):
        """Log a warning message with component and method information."""
        if self.verbose:
            self.logger.warning(message, component=self.name, method=method)
    
    def log_error(self, message, method=None):
        """Log an error message with component and method information."""
        # Always log errors regardless of verbose setting
        self.logger.error(message, component=self.name, method=method)
        
    def log_critical(self, message, method=None):
        """Log a critical message with component and method information."""
        # Always log critical messages regardless of verbose setting
        self.logger.critical(message, component=self.name, method=method)