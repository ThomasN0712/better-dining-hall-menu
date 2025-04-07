from langchain_core.tools import tool, ToolException
import requests
from typing import List, Optional, Any
from datetime import datetime, timedelta
from pydantic import BaseModel, Field
import os

# Use a different port for tool API calls to avoid deadlock
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8001")  # Changed port to 8001

# Input Schemas for documentation and validation

class MenuItemsInput(BaseModel):
    date: str = Field(..., description="The date to query in YYYY-MM-DD format")
    location_id: Optional[List[int]] = Field(None, description="Optional list of location IDs")
    meal_type_id: Optional[List[int]] = Field(None, description="Optional list of meal type IDs")

class MenuItemsRangeInput(BaseModel):
    start_date: str = Field(..., description="Start date in YYYY-MM-DD format")
    end_date: str = Field(..., description="End date in YYYY-MM-DD format")
    location_id: Optional[List[int]] = Field(None, description="Optional list of location IDs")
    meal_type_id: Optional[List[int]] = Field(None, description="Optional list of meal type IDs")

class SearchItemsInput(BaseModel):
    query: str = Field(..., description="Search term to look for in menu items")
    date: Optional[str] = Field(None, description="Optional date in YYYY-MM-DD format")
    location_id: Optional[List[int]] = Field(None, description="Optional list of location IDs")


@tool
def menu_items(date: str, location_id: Optional[List[int]] = None, meal_type_id: Optional[List[int]] = None) -> Any:
    """
    Get menu items for a specific date.

    Args:
        date (str): The date to query in YYYY-MM-DD format.
        location_id (List[int], optional): Optional list of location IDs.
        meal_type_id (List[int], optional): Optional list of meal type IDs.

    Returns:
        The JSON response from the API containing menu items for the specified date.

    Raises:
        ToolException: If the API request fails.
    """
    try:
        response = requests.get(
            f"{API_BASE_URL}/menu_items",
            params={"date": date, "location_id": location_id, "meal_type_id": meal_type_id}
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise ToolException(f"Error fetching menu items: {str(e)}")


@tool
def menu_items_range(start_date: str, end_date: str, location_id: Optional[List[int]] = None, meal_type_id: Optional[List[int]] = None) -> Any:
    """
    Get menu items for a range of dates.

    Args:
        start_date (str): Start date in YYYY-MM-DD format.
        end_date (str): End date in YYYY-MM-DD format.
        location_id (List[int], optional): Optional list of location IDs.
        meal_type_id (List[int], optional): Optional list of meal type IDs.

    Returns:
        The JSON response from the API containing menu items for the specified date range.

    Raises:
        ToolException: If the API request fails.
    """
    try:
        response = requests.get(
            f"{API_BASE_URL}/menu_items_range",
            params={"start_date": start_date, "end_date": end_date, "location_id": location_id, "meal_type_id": meal_type_id}
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise ToolException(f"Error fetching menu items range: {str(e)}")


@tool
def always_available_items() -> Any:
    """
    Get items that are always available.

    Returns:
        The JSON response from the API containing items that are always available.

    Raises:
        ToolException: If the API request fails.
    """
    try:
        response = requests.get(f"{API_BASE_URL}/always_available_items")
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise ToolException(f"Error fetching always available items: {str(e)}")


@tool
def locations() -> Any:
    """
    Get all available dining locations.

    Returns:
        The JSON response from the API containing available dining locations.

    Raises:
        ToolException: If the API request fails.
    """
    try:
        response = requests.get(f"{API_BASE_URL}/locations")
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise ToolException(f"Error fetching locations: {str(e)}")


@tool
def meal_types() -> Any:
    """
    Get all available meal types.

    Returns:
        The JSON response from the API containing meal types (e.g., breakfast, lunch, dinner).

    Raises:
        ToolException: If the API request fails.
    """
    try:
        response = requests.get(f"{API_BASE_URL}/meal_types")
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise ToolException(f"Error fetching meal types: {str(e)}")


@tool
def allergens() -> Any:
    """
    Get all allergens tracked in the menu system.

    Returns:
        The JSON response from the API containing allergens.

    Raises:
        ToolException: If the API request fails.
    """
    try:
        response = requests.get(f"{API_BASE_URL}/allergens")
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise ToolException(f"Error fetching allergens: {str(e)}")


@tool
def search_items(query: str, date: Optional[str] = None, location_id: Optional[List[int]] = None) -> Any:
    """
    Search for specific items in the menu using a query.

    Args:
        query (str): Search term to look for in menu items.
        date (str, optional): Optional date in YYYY-MM-DD format. If not provided, search within the next 7 days.
        location_id (List[int], optional): Optional list of location IDs.

    Returns:
        A list of menu items that match the query.

    Raises:
        ToolException: If the API request fails.
    """
    try:
        if date:
            response = requests.get(
                f"{API_BASE_URL}/menu_items",
                params={"date": date, "location_id": location_id}
            )
            items = response.json()
        else:
            today = datetime.now().strftime("%Y-%m-%d")
            next_week = (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d")
            response = requests.get(
                f"{API_BASE_URL}/menu_items_range",
                params={"start_date": today, "end_date": next_week, "location_id": location_id}
            )
            items = response.json()

        query_lower = query.lower()
        results = [item for item in items if query_lower in item.get("item_name", "").lower()]
        return results
    except requests.exceptions.RequestException as e:
        raise ToolException(f"Error searching menu items: {str(e)}")


@tool
def menu_today() -> Any:
    """
    Get menu items for today.

    This tool automatically uses today's date in YYYY-MM-DD format to retrieve today's menu items.

    Returns:
        The JSON response from the API containing today's menu items.

    Raises:
        ToolException: If the API request fails.
    """
    try:
        today = datetime.now().strftime("%Y-%m-%d")
        response = requests.get(f"{API_BASE_URL}/menu_items", params={"date": today})
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise ToolException(f"Error fetching today's menu: {str(e)}")


def get_tools() -> List[Any]:
    """
    Return all dining tools for agent use.

    Returns:
        A list of tool functions.
    """
    return [
        menu_items,
        menu_items_range,
        always_available_items,
        locations,
        meal_types,
        allergens,
        search_items,
        menu_today,
    ]
