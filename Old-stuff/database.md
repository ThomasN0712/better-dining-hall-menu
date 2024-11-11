### 1. **Cycle Table**

- **Definition**: Stores information about each dining menu cycle, with a unique cycle identifier (`cycle_id`), a name (`cycle_name`), and a start date (`start_date`).
- **Purpose**: Allows the dining hall to organize and cycle through different menu rotations over time, grouping each week or set of weeks into distinct cycles (e.g., "Cycle 1", "Cycle 2").

---

### 2. **Day Table**

- **Definition**: Represents each day in a given menu cycle, with a unique identifier (`day_id`), the day name (e.g., "Monday"), and a foreign key linking it to a specific `Cycle` (`cycle_id`).
- **Purpose**: This table associates days of the week with a specific menu cycle, allowing for unique menus to be planned and served each day within each cycle.

---

### 3. **Location Table**

- **Definition**: Contains information about each dining location, such as Beachside, Hillside, or Parkside, with a unique identifier (`location_id`) and a name (`location_name`).
- **Purpose**: Tracks where meals are served, enabling menu data to be linked to specific dining locations. This is essential for differentiating menus across multiple dining halls or locations.

---

### 4. **Meal_Type Table**

- **Definition**: Lists different types of meals (e.g., "Breakfast", "Lunch", "Dinner") with a unique identifier (`meal_type_id`) and a name (`meal_type_name`).
- **Purpose**: Distinguishes between meal times, allowing different menus to be served at each mealtime and enabling the database to organize items by meal type.

---

### 5. **Menu_Item Table**

- **Definition**: Stores individual menu items (e.g., "Scrambled Eggs", "Waffle Bar") with a unique identifier (`item_id`) and a name (`item_name`).
- **Purpose**: Provides a centralized list of all menu items that can be served, facilitating the organization and reuse of menu items across different days, locations, and meal types.

---

### 6. **Allergen Table**

- **Definition**: Defines allergens with a unique identifier (`allergen_id`), a short code (e.g., "M" for Milk), and a description (e.g., "Milk").
- **Purpose**: Tracks potential allergens in each menu item to ensure food safety for diners with allergies. This table allows allergen information to be linked to individual items on specific days and locations.

---

### 7. **Always_Available Table**

- **Definition**: Links meal types (`meal_type_id`) with items (`item_id`) that are always available (e.g., staple items like “Oatmeal” or “Milk”).
- **Purpose**: Lists items that are always available, regardless of the day or cycle, making it easy for diners to know what staple items are consistently offered at each meal type.

---

### 8. **Menu_Availability Table**

- **Definition**: A junction table that links specific menu items (`item_id`) to days, locations, meal types, and allergens. It has foreign keys for `day_id`, `meal_type_id`, `location_id`, `item_id`, and `allergen_id`.
- **Purpose**: Acts as a comprehensive connector for all menu data, specifying when (day), where (location), and for which meal (meal type) each item is available, along with any allergens it may contain. This table supports flexible querying of item availability and allergen details for each day, meal, and location.

-- Cycle Table
CREATE TABLE Cycle (
cycle_id SERIAL PRIMARY KEY,
cycle_name VARCHAR(50) NOT NULL,
start_date DATE NOT NULL
);

-- Day Table
CREATE TABLE Day (
day_id SERIAL PRIMARY KEY,
day_name VARCHAR(10) NOT NULL,
cycle_id INTEGER REFERENCES Cycle(cycle_id) ON DELETE CASCADE
);

-- Location Table
CREATE TABLE Location (
location_id SERIAL PRIMARY KEY,
location_name VARCHAR(50) NOT NULL
);

-- Meal_Type Table
CREATE TABLE Meal_Type (
meal_type_id SERIAL PRIMARY KEY,
meal_type_name VARCHAR(20) NOT NULL
);

-- Menu_Item Table
CREATE TABLE Menu_Item (
item_id SERIAL PRIMARY KEY,
item_name VARCHAR(100) NOT NULL
);

-- Allergen Table
CREATE TABLE Allergen (
allergen_id SERIAL PRIMARY KEY,
allergen_code VARCHAR(5) NOT NULL,
description VARCHAR(50) NOT NULL
);

-- Always_Available Table
CREATE TABLE Always_Available (
meal_type_id INTEGER REFERENCES Meal_Type(meal_type_id) ON DELETE CASCADE,
item_id INTEGER REFERENCES Menu_Item(item_id) ON DELETE CASCADE,
PRIMARY KEY (meal_type_id, item_id)
);

-- Menu_Availability Table (junction table linking days, locations, meal types, and items with allergens)
CREATE TABLE Menu_Availability (
availability_id SERIAL PRIMARY KEY,
day_id INTEGER REFERENCES Day(day_id) ON DELETE CASCADE,
meal_type_id INTEGER REFERENCES Meal_Type(meal_type_id) ON DELETE CASCADE,
location_id INTEGER REFERENCES Location(location_id) ON DELETE CASCADE,
item_id INTEGER REFERENCES Menu_Item(item_id) ON DELETE CASCADE,
allergen_id INTEGER REFERENCES Allergen(allergen_id) ON DELETE SET NULL
);
