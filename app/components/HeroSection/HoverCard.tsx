import React from "react";

type MenuItem = {
  name: string;
  allergens: { id: number; name: string }[];
};

type HoverCardProps = {
  mealType: string;
  menuItems: MenuItem[];
  selectedAllergens: number[];
};

// Allergen-to-Emoji Mapping
const allergenEmojiMap: Record<string, string> = {
  Eggs: "🥚",
  Milk: "🥛",
  Wheat: "🌾",
  Soy: "🌱",
  Peanuts: "🥜",
  "Tree Nuts": "🌰",
  Fish: "🐟",
  Crustacean: "🦀",
  "Sesame Seeds": "🌼",
};

const HoverCard: React.FC<HoverCardProps> = ({
  mealType,
  menuItems,
  selectedAllergens,
}) => {
  // Filter menu items based on allergens
  const filteredMenuItems = menuItems.filter((item) => {
    const itemAllergenIds = item.allergens.map((allergen) => allergen.id);
    return !itemAllergenIds.some((allergenId) =>
      selectedAllergens.includes(allergenId)
    );
  });

  return (
    <div className="hover:shadow-lg hover:scale-105 transition-transform duration-300 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-lg shadow-md p-4 flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-headingLight dark:text-text-headingDark">
          {mealType}
        </h3>
      </div>

      {/* Menu Items */}
      <div className="flex-1">
        {filteredMenuItems.length > 0 ? (
          <ul className="space-y-2">
            {filteredMenuItems.map((item, index) => (
              <li
                key={index}
                className="p-2 flex items-center justify-between rounded bg-primary-light dark:bg-primary-dark text-white"
              >
                <span>{item.name}</span>
                {/* Information Icon with Tooltip */}
                <div className="ml-2 text-gray-200 dark:text-gray-300 cursor-pointer relative group">
                  ℹ️
                  <div className="absolute hidden group-hover:block z-10 bg-white text-gray-800 rounded-md p-2 shadow-lg dark:bg-gray-800 dark:text-gray-200 text-sm max-w-xs">
                    {item.allergens.length > 0 ? (
                      <div>
                        <p className="font-medium">Allergens:</p>
                        <ul className="mt-1 space-y-1">
                          {item.allergens.map((allergen) => (
                            <li key={allergen.id} className="flex items-center">
                              <span className="mr-2">
                                {allergenEmojiMap[allergen.name] || "❓"}
                              </span>
                              <span>{allergen.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p>No allergens.</p>
                    )}
                  </div>
                </div>
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
