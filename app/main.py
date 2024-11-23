from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from uuid import uuid4

app = FastAPI()

# Mock Database
cycles = []
days = []
menu_items = []
allergens = []
locations = [{"id": 1, "name": "Parkside"}, {"id": 2, "name": "Hillside"}, {"id": 3, "name": "Beachside"}]

# Models
class Allergen(BaseModel):
    id: str
    name: str


class MenuItem(BaseModel):
    id: str
    name: str
    day_id: str
    allergens: List[str]


class Day(BaseModel):
    id: str
    name: str
    cycle_id: str


class Cycle(BaseModel):
    id: str
    name: str


@app.get("/")
def root():
    return {"message": "Welcome to the Dining Hall API!"}


# Allergen Endpoints
@app.get("/allergens", response_model=List[Allergen])
def get_all_allergens():
    return allergens


@app.post("/allergens", response_model=Allergen)
def create_allergen(allergen: Allergen):
    allergen.id = str(uuid4())
    allergens.append(allergen)
    return allergen


@app.delete("/allergens/{allergen_id}")
def delete_allergen(allergen_id: str):
    global allergens
    allergens = [a for a in allergens if a.id != allergen_id]
    return {"message": f"Allergen with id {allergen_id} deleted."}


# Menu Item Endpoints
@app.get("/menu_items", response_model=List[MenuItem])
def get_all_menu_items():
    return menu_items


@app.post("/menu_items", response_model=MenuItem)
def create_menu_item(menu_item: MenuItem):
    menu_item.id = str(uuid4())
    menu_items.append(menu_item)
    return menu_item


@app.delete("/menu_items/{item_id}")
def delete_menu_item(item_id: str):
    global menu_items
    menu_items = [item for item in menu_items if item.id != item_id]
    return {"message": f"Menu item with id {item_id} deleted."}


# Day Endpoints
@app.get("/days", response_model=List[Day])
def get_all_days():
    return days


@app.post("/days", response_model=Day)
def create_day(day: Day):
    day.id = str(uuid4())
    days.append(day)
    return day


@app.delete("/days/{day_id}")
def delete_day(day_id: str):
    global days
    days = [d for d in days if d.id != day_id]
    return {"message": f"Day with id {day_id} deleted."}


# Cycle Endpoints
@app.get("/cycles", response_model=List[Cycle])
def get_all_cycles():
    return cycles


@app.post("/cycles", response_model=Cycle)
def create_cycle(cycle: Cycle):
    cycle.id = str(uuid4())
    cycles.append(cycle)
    return cycle


@app.delete("/cycles/{cycle_id}")
def delete_cycle(cycle_id: str):
    global cycles
    cycles = [c for c in cycles if c.id != cycle_id]
    return {"message": f"Cycle with id {cycle_id} deleted."}


# Location Endpoints
@app.get("/locations")
def get_locations():
    return locations


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
