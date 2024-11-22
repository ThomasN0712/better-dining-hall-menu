import { query } from "./db";

// Fetch menu items by date, location, and meal type
export const getMenuItems = async (date: string, locationId: number, mealTypeId: number) => {
  const result = await query(
    `
    SELECT mi.item_name, ma.*
    FROM menu_availability ma
    INNER JOIN menu_item mi ON ma.item_id = mi.item_id
    WHERE ma.location_id = $1
      AND ma.meal_type_id = $2
      AND ma.day_id = (SELECT day_id FROM day WHERE cycle_id = (SELECT cycle_id FROM cycle WHERE start_date <= $3 ORDER BY start_date DESC LIMIT 1))
    `,
    [locationId, mealTypeId, date]
  );
  return result.rows;
};

// Fetch items always available
export const getAlwaysAvailableItems = async () => {
  const result = await query(
    `
    SELECT mi.item_name, mt.meal_type_name
    FROM always_available aa
    INNER JOIN menu_item mi ON aa.item_id = mi.item_id
    INNER JOIN meal_type mt ON aa.meal_type_id = mt.meal_type_id
    `
  );
  return result.rows;
};

// Fetch locations
export const getLocations = async () => {
  const result = await query("SELECT * FROM location");
  return result.rows;
};
