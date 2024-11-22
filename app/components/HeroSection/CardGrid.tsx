// components/HeroSection/CardGrid.tsx
import React from "react";
import HoverCard from "./HoverCard";

type MenuItem = {
  name: string;
  hasAllergen: boolean;
};

type CardGridProps = {
  cards: {
    location: string;
    mealType: string;
    menuItems: MenuItem[];
  }[];
  selectedAllergens: string[];
};

const CardGrid: React.FC<CardGridProps> = ({ cards, selectedAllergens }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <HoverCard
          key={index}
          location={card.location}
          mealType={card.mealType}
          menuItems={card.menuItems}
          selectedAllergens={selectedAllergens}
        />
      ))}
    </div>
  );
};

export default CardGrid;
