import json
from bs4 import BeautifulSoup
import requests

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

    current_cycle = None
    current_day = None

    # Loop through all relevant field__item sections to detect cycles
    for field_item in soup.find_all("div", class_="field__item"):
        # Detect Cycle Headers by matching <h2> tags with text like "Cycle 1 Menu"
        cycle_header = field_item.find("h2")
        if cycle_header and "Cycle" in cycle_header.get_text(strip=True) and "Menu" in cycle_header.get_text(strip=True):
            current_cycle = cycle_header.get_text(strip=True)
            dining_data["Daily Menus"][current_cycle] = {}
            continue

        # If we're in a cycle, continue parsing days
        if current_cycle:
            for card_wrap in field_item.find_all("div", class_="card-wrap"):
                header = card_wrap.find("h2", class_="accordion-heading")
                if not header:
                    continue

                day_name = header.get_text(strip=True).split()[0]  # e.g., "Monday"
                day_menu = {}

                # Parse meal sections within each day's menu
                for meal_time in card_wrap.find_all("strong"):
                    meal_name = meal_time.get_text(strip=True)  # Breakfast, Lunch, Dinner
                    meal_data = []
                    location = None

                    # Loop through all sibling elements to get location, item, and allergen information
                    sibling = meal_time.find_next_sibling()
                    while sibling and sibling.name in ["em", "p", "ul"]:
                        if sibling.name == "em":  # Dining location
                            location = sibling.get_text(strip=True)
                        elif sibling.name == "p":
                            item = sibling.get_text(strip=True)
                            allergens = [tag.get_text(strip=True) for tag in sibling.find_all("em")]
                            meal_data.append({
                                "location": location,
                                "item": item,
                                "allergens": allergens
                            })
                        sibling = sibling.find_next_sibling()

                    day_menu[meal_name] = meal_data

                dining_data["Daily Menus"][current_cycle][day_name] = day_menu

        # Parse other sections like Always Available and Allergens as before
        # Parse Always Available section
        if "accordion-10541616" in field_item.get("id", ""):
            always_available = {}
            for meal_section in field_item.find_all("h3"):
                meal_time = meal_section.get_text(strip=True).replace(" always includes:", "")
                items = [item.get_text(strip=True) for item in meal_section.find_next("ul").find_all("li")]
                always_available[meal_time] = items
            dining_data["Always Available"] = always_available

        # Parse Allergen Identification
        if "accordion-10541941" in field_item.get("id", ""):
            allergens = {}
            allergen_section = field_item.find("div", class_="card-body row")
            if allergen_section:
                for line in allergen_section.find_all("p"):
                    for strong_tag in line.find_all("strong"):
                        allergen_code = strong_tag.get_text(strip=True)
                        allergen_desc = strong_tag.next_sibling.strip("= ").strip()
                        allergens[allergen_code] = allergen_desc
            dining_data["Allergens"] = allergens

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
