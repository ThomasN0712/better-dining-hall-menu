1. Run scrapper.py and clean up data
   python3 scrapper.py
2. Open 'dining_menu.json' and delete the last accordian (allergen table)
3. Ensure pgAdmin is set up and login, truncate old data if wanted.
4. Run parse_json.py to insert new data into the table
5. Export the data only and use INSERT method
6. Login to Supabase and add the new data

For supabase:
TRUNCATE TABLE allergen, always_available, cycle, day, location, meal_type, menu_availability, menu_item, menu_item_allergen
