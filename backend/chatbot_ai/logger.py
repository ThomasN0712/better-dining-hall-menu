import json
import logging
import sys
from datetime import datetime
from typing import Any, Dict, Optional, Union

# ANSI color codes for terminal
class Colors:
    RESET = "\033[0m"
    BOLD = "\033[1m"
    RED = "\033[31m"
    GREEN = "\033[32m"
    YELLOW = "\033[33m"
    BLUE = "\033[34m"
    MAGENTA = "\033[35m"
    CYAN = "\033[36m"
    WHITE = "\033[37m"
    BRIGHT_BLACK = "\033[90m"  # Gray

class PrettyLogger:
    """Enhanced logger with pretty formatting for structured data."""
    
    def __init__(
        self, 
        name: str,
        level: int = logging.INFO,
        use_colors: bool = True
    ):
        self.name = name
        self.use_colors = use_colors
        
        # Create logger
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)
        
        # Clear any existing handlers
        if self.logger.handlers:
            self.logger.handlers.clear()
        
        # Console handler
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(level)
        
        # Don't add a formatter - we'll format messages ourselves
        self.logger.addHandler(console_handler)
        
        # Component colors for better visual organization
        self.component_colors = {
            "TaskAgent": Colors.CYAN,
            "WarehouseCoordinator": Colors.GREEN,
            "AuthService": Colors.YELLOW,
            "wms_toolkit": Colors.MAGENTA,
            "server": Colors.BLUE,
        }
        
        # Method colors - operations get their own colors
        self.method_colors = {
            "reason": Colors.BOLD + Colors.BLUE,
            "classify": Colors.BOLD + Colors.GREEN,
            "process_task": Colors.BOLD + Colors.MAGENTA,
            "run": Colors.BOLD + Colors.CYAN,
            "error": Colors.BOLD + Colors.RED,
        }
    
    def _format_json(self, data: Union[Dict, str], indent: int = 2) -> str:
        """Format JSON or dict data with indentation for better readability."""
        if isinstance(data, str):
            try:
                # Try to parse as JSON
                parsed_data = json.loads(data)
                return json.dumps(parsed_data, indent=indent)
            except json.JSONDecodeError:
                # If not valid JSON, return as is
                return data
        elif isinstance(data, dict):
            return json.dumps(data, indent=indent)
        else:
            return str(data)
    
    def _format_message(
        self, 
        msg: str, 
        component: Optional[str] = None, 
        method: Optional[str] = None,
        level: str = "INFO"
    ) -> str:
        """Format the log message with colors and component information."""
        timestamp = datetime.now().strftime("%H:%M:%S.%f")[:-3]
        
        # Default colors
        timestamp_color = Colors.BRIGHT_BLACK if self.use_colors else ""
        component_color = Colors.WHITE if self.use_colors else ""
        method_color = Colors.WHITE if self.use_colors else ""
        level_color = Colors.WHITE if self.use_colors else ""
        reset = Colors.RESET if self.use_colors else ""
        
        # Get level color
        if self.use_colors:
            level_color = {
                "DEBUG": Colors.BRIGHT_BLACK,
                "INFO": Colors.WHITE,
                "WARNING": Colors.YELLOW,
                "ERROR": Colors.RED,
                "CRITICAL": Colors.BOLD + Colors.RED
            }.get(level, Colors.WHITE)
        
        # Get component color
        if component and self.use_colors:
            component_color = self.component_colors.get(component, Colors.WHITE)
        
        # Get method color
        if method and self.use_colors:
            method_color = self.method_colors.get(method, Colors.WHITE)
        
        # Format component and method if provided
        component_str = ""
        if component:
            component_str = f"{component_color}{component}{reset}"
            if method:
                component_str += f":{method_color}{method}{reset}"
            component_str = f"[{component_str}] "
        
        # Format timestamp
        timestamp_str = f"{timestamp_color}{timestamp}{reset}"
        
        # Format level
        level_str = f"{level_color}{level.ljust(7)}{reset}"
        
        # Handle JSON-like data in the message
        if isinstance(msg, dict) or (isinstance(msg, str) and (msg.startswith('{') and msg.endswith('}'))):
            formatted_data = self._format_json(msg)
            # Add a newline before the JSON data for better readability
            return f"{timestamp_str} {level_str} {component_str}\n{formatted_data}"
        else:
            return f"{timestamp_str} {level_str} {component_str}{msg}"
    
    def debug(self, msg: Any, component: Optional[str] = None, method: Optional[str] = None):
        """Log a debug message."""
        formatted_msg = self._format_message(msg, component, method, "DEBUG")
        self.logger.debug(formatted_msg)
    
    def info(self, msg: Any, component: Optional[str] = None, method: Optional[str] = None):
        """Log an info message."""
        formatted_msg = self._format_message(msg, component, method, "INFO")
        self.logger.info(formatted_msg)
    
    def warning(self, msg: Any, component: Optional[str] = None, method: Optional[str] = None):
        """Log a warning message."""
        formatted_msg = self._format_message(msg, component, method, "WARNING")
        self.logger.warning(formatted_msg)
    
    def error(self, msg: Any, component: Optional[str] = None, method: Optional[str] = None):
        """Log an error message."""
        formatted_msg = self._format_message(msg, component, method, "ERROR")
        self.logger.error(formatted_msg)
    
    def critical(self, msg: Any, component: Optional[str] = None, method: Optional[str] = None):
        """Log a critical message."""
        formatted_msg = self._format_message(msg, component, method, "CRITICAL")
        self.logger.critical(formatted_msg)

# Create a global logger instance
logger = PrettyLogger("warehouse-ai")

def get_logger():
    """Get the global logger instance."""
    return logger 