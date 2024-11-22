// components/HeroSection/AlwaysAvailableCard.tsx
import React from "react";

type AlwaysAvailableCardProps = {
  items: string[]; // List of always-available items
};

const AlwaysAvailableCard: React.FC<AlwaysAvailableCardProps> = ({ items }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Always Available
      </h2>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded shadow"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No always-available items at the moment.
        </p>
      )}
    </div>
  );
};

export default AlwaysAvailableCard;
