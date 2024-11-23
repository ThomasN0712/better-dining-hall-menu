import React from "react";

type MenuItem = {
  name: string;
  allergens: number[];
};

type HoverCardProps = {
  location: string;
  mealType: string;
  menuItems: MenuItem[];
  selectedAllergens: number[];
};

const HoverCard: React.FC<HoverCardProps> = ({
  location,
  mealType,
  menuItems,
  selectedAllergens,
}) => {
  // Filter menu items based on allergens
  const filteredMenuItems = menuItems.filter((item) => {
    const itemAllergens = item.allergens || [];
    // Check if any of the item's allergens are in the selected allergens
    return !itemAllergens.some((allergenId) => selectedAllergens.includes(allergenId));
  });

  return (
    <div className="hover:shadow-lg hover:scale-105 transition-transform duration-300 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-lg shadow-md p-4 flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          {location} - {mealType}
        </h3>
      </div>

      {/* Menu Items */}
      <div className="flex-1">
        {filteredMenuItems.length > 0 ? (
          <ul className="space-y-2">
            {filteredMenuItems.map((item, index) => (
              <li
                key={index}
                className="p-2 rounded bg-primary-light dark:bg-primary-dark text-white"
              >
                {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No menu items available based on your selections.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 text-right">
        <button className="bg-accent text-white px-4 py-2 rounded shadow hover:bg-yellow-600">
          More Info
        </button>
      </div>
    </div>
  );
};

export default HoverCard;