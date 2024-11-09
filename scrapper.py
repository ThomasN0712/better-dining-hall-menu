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

        # Parse Daily Menus (5 Cycles, 7 Days)
        elif "accordion-10541646" in accordion_id or "accordion-10541651" in accordion_id or "accordion-10541656" in accordion_id:
            day_menu = {}
            day_name = title.split()[0]  # Get the day name, e.g., "Monday"
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
            
            dining_data["Daily Menus"][day_name] = day_menu

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
