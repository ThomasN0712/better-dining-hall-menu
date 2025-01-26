import json
from bs4 import BeautifulSoup
import requests
import re

url = "https://www.csulb.edu/beach-shops/residential-dining-menus"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def fetch_page(url):
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.text

def parse_sections(soup):
    dining_data = {
        "Cycle Dates": {},
        "Always Available": {},
        "Daily Menus": {},
        "Allergens": {}
    }

    # Loop through all relevant card-wrap sections
    for card_wrap in soup.find_all("div", class_="card-wrap"):
        header = card_wrap.find("h2", class_="accordion-heading")
        if not header:
            continue

        title = header.get_text(strip=True)
        accordion_id = card_wrap.find("div", {"id": True}).get("id")

        # Parse Cycle Dates
        if "Cycle Dates" in title or "accordion-10541566" in accordion_id or "accordion-10885581" in accordion_id:
            cycle_table = []
            table = card_wrap.find("table")
            if table:
                rows = table.find("tbody").find_all("tr")
                for row in rows:
                    columns = row.find_all("td")
                    week_of = columns[0].get_text(strip=True)
                    menu_cycle = columns[1].get_text(strip=True)
                    cycle_table.append({"week_of": week_of, "menu_cycle": menu_cycle})
            dining_data["Cycle Dates"][title] = cycle_table

        # Parse Always Available section
        elif "accordion-10541616" in accordion_id:
            always_available = {}
            for meal_section in card_wrap.find_all("h3"):
                meal_time = meal_section.get_text(strip=True).replace(" always includes:", "")
                items = [item.get_text(strip=True) for item in meal_section.find_next("ul").find_all("li")]
                always_available[meal_time] = items
            dining_data["Always Available"] = always_available

        # Parse Allergen Identification
        elif "accordion-10541941" in accordion_id:
            allergens = {}
            allergen_section = card_wrap.find("div", class_="card-body row")
            if allergen_section:
                for line in allergen_section.find_all("p"):
                    for strong_tag in line.find_all("strong"):
                        allergen_code = strong_tag.get_text(strip=True)
                        allergen_desc = strong_tag.next_sibling.strip("= ").strip()
                        allergens[allergen_code] = allergen_desc
            dining_data["Allergens"] = allergens
            
    current_cycle = None
    allowed_meal_times = ["Breakfast", "Brunch", "Lunch", "Dinner"]
    valid_locations = ["Parkside", "Hillside", "Beachside"]

   # Loop through field items in the HTML content
    for field_item in soup.find_all("div", class_="field__item"):
        # Detect cycle headers
        cycle_header = field_item.find("h2")
        if cycle_header:
            cycle_text = cycle_header.get_text(strip=True)
            if re.match(r"Cycle \d+ Menu", cycle_text):
                current_cycle = cycle_text
                dining_data["Daily Menus"][current_cycle] = {}
                continue

        # Parse days within each cycle
        if current_cycle:
            for card_wrap in field_item.find_all("div", class_="card-wrap"):
                day_name = card_wrap.find("h2", class_="accordion-heading")
                if day_name:
                    day_name = day_name.get_text(strip=True).split()[0]
                    dining_data["Daily Menus"][current_cycle][day_name] = {}

                    # Parse meal times within each day's menu
                    meal_time = None
                    location = None
                    for tag in card_wrap.find_all(["strong", "em", "p", "br"]):
                        # print("Name:", tag.name)
                        # if tag.name == "br" and tag.next_sibling.next_sibling.name == "em":
                        #     print("hewqweqw")
                        if tag.name == "strong":
                            # Identify meal time
                            meal_time = tag.get_text(strip=True)
                            if meal_time in allowed_meal_times:
                                dining_data["Daily Menus"][current_cycle][day_name][meal_time] = {}
                        elif tag.name == "em":
                            # Identify location
                            location_text = tag.get_text(strip=True)
                            if location_text in valid_locations:
                                location = location_text
                                if meal_time and location:
                                    # Initialize location under current meal time if not already done
                                    if location not in dining_data["Daily Menus"][current_cycle][day_name][meal_time]:
                                        dining_data["Daily Menus"][current_cycle][day_name][meal_time][location] = {}
                        elif tag.name == "br" and location and meal_time:
                            # Handle items without allergens
                            item_text = tag.next_sibling
                            if isinstance(item_text, str):
                                item_name = item_text.strip()
                                if item_name:
                                    # No allergens; add item with an empty allergen list
                                    dining_data["Daily Menus"][current_cycle][day_name][meal_time][location][item_name] = []
                            
                            try:
                                # Attempt to check for allergens in the next sibling
                                if tag.next_sibling.next_sibling.name == "em":
                                    allergen_tag = tag.next_sibling.next_sibling
                                    allergens = re.findall(r'\b[A-Z]{1,2}(?:-[A-Z]+)?\b', allergen_tag.get_text(strip=True))
                                    # Assign allergens to the item
                                    dining_data["Daily Menus"][current_cycle][day_name][meal_time][location][item_name] = allergens
                            except AttributeError as e:
                                continue  # Proceed with the next item


    return dining_data

def save_to_json(data, filename="dining_menu.json"):
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)
    print(f"Data saved to {filename}")

def main():
    html = fetch_page(url)
    soup = BeautifulSoup(html, "html.parser")
    
    dining_data = parse_sections(soup)
    save_to_json(dining_data)

if __name__ == "__main__":
    main()
