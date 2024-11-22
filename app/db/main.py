from app.db.queries import get_menu_items, get_always_available_items

# Example usage
menu_items = get_menu_items(date_str="2024-11-22", location_id=1, meal_type_id=1)
print("Menu Items:", menu_items)

always_available_items = get_always_available_items()
print("Always Available Items:", always_available_items)
