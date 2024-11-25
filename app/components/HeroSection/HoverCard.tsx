import React from "react";
import { CircleAlert } from "lucide-react";

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
    <div className="hover:shadow-lg hover:scale-105 transition-transform duration-300 bg-background-cardLight dark:bg-background-cardDark text-text-light dark:text-text-dark rounded-lg shadow-md p-4 flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-headingLight dark:text-text-headingDark">
          {mealType}
        </h3>
      </div>

      {/* Menu Items */}
      <div className="flex-1">
        {filteredMenuItems.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMenuItems.map((item, index) => (
              <li
                key={index}
                className="py-2 flex items-center justify-between"
              >
                <span>{item.name}</span>
                {/* Information Icon with Tooltip */}
                {item.allergens.length > 0 && (
                  <div className="ml-2 text-gray-500 dark:text-gray-400 cursor-pointer relative group">
                    <CircleAlert
                      size={16}
                      className="text-text-light dark:text-text-dark"
                    />
                    <div className="absolute hidden group-hover:block z-10 bg-white text-gray-800 rounded-md p-2 shadow-lg dark:bg-gray-800 dark:text-gray-200 text-sm max-w-xs">
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
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No menu items available based on your selections.
          </p>
        )}
      </div>
    </div>
  );
};

export default HoverCard;
