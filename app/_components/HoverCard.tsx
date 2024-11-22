// src/components/HoverCard.tsx
import React from "react";
import { MealType } from "../types";

interface HoverCardProps {
  location: string;
  mealTypes: MealType[];
  onClick?: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({ location, mealTypes, onClick }) => {
  return (
    <div
      className="bg-gray-100 dark:bg-dark-700 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-bold mb-3">{location}</h3>
      {mealTypes.map((meal, index) => (
        <div key={index} className="mb-4">
          <h4 className="text-md font-semibold">{meal.type}</h4>
          <ul className="list-disc list-inside text-sm">
            {meal.menuItems.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item.name}{" "}
                {item.allergens.length > 0 && (
                  <span className="text-xs text-gray-500">
                    (Allergens: {item.allergens.join(", ")})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HoverCard;
