// src/components/CardGrid.tsx
import React from "react";
import HoverCard from "./HoverCard";
import { MealType } from "../types";

type CardGridProps = {
  data: {
    location: string;
    mealTypes: MealType[];
    onClick?: () => void; // Optional click handler for each card
  }[];
};

const CardGrid: React.FC<CardGridProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-50 dark:bg-dark-100">
      {data.map((cardData, index) => (
        <div
          key={index}
          className="hover:shadow-lg focus:ring-2 focus:ring-primary-500 rounded-md transition duration-300"
        >
          <HoverCard
            location={cardData.location}
            mealTypes={cardData.mealTypes}
            onClick={cardData.onClick}
          />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
