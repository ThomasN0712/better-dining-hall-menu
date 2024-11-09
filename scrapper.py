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
        "Always Available": {}
    }

    # Loop through all relevant card-wrap sections
    for card_wrap in soup.find_all("div", class_="card-wrap"):
        header = card_wrap.find("h2", class_="accordion-heading")
        if not header:
            continue

        title = header.get_text(strip=True)
        accordion_id = card_wrap.find("div", {"id": True}).get("id")

        # Check if the section is "Cycle Dates" based on ID pattern or keywords in title
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

        # Check if the section is "Always Available" based on ID pattern or keywords in title
        elif "accordion-10541616" in accordion_id:
            always_available = {}
            for meal_section in card_wrap.find_all("h3"):
                meal_time = meal_section.get_text(strip=True).replace(" always includes:", "")
                items = [item.get_text(strip=True) for item in meal_section.find_next("ul").find_all("li")]
                always_available[meal_time] = items
            dining_data["Always Available"] = always_available

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
