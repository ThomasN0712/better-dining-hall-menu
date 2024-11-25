import React from "react";
import HoverCard from "./HoverCard";

type MenuItem = {
  name: string;
  allergens: number[];
};

type CardData = {
  location: string;
  mealType: string;
  menuItems: MenuItem[];
};

type CardGridProps = {
  cards: CardData[];
  selectedAllergens: number[];
};

const CardGrid: React.FC<CardGridProps> = ({ cards, selectedAllergens }) => {
  // Group cards by location
  const groupedCards = cards.reduce(
    (acc: { [key: string]: CardData[] }, card) => {
      if (!acc[card.location]) {
        acc[card.location] = [];
      }
      acc[card.location].push(card);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-8">
      {Object.entries(groupedCards).map(
        ([location, locationCards], locationIndex) => (
          <div key={locationIndex} className="space-y-4">
            {/* Location Header */}
            <h2 className="text-xl font-bold text-text-headingLight dark:text-text-headingDark">
              {location}
            </h2>
            {/* Cards for this location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationCards.map((card, cardIndex) => (
                <HoverCard
                  key={cardIndex}
                  location={card.location}
                  mealType={card.mealType}
                  menuItems={card.menuItems}
                  selectedAllergens={selectedAllergens}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CardGrid;
