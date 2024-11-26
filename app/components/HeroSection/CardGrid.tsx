import React from "react";
import HoverCard from "./HoverCard";
import "@/styles/globals.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

type MenuItem = {
  name: string;
  allergens: { id: number; name: string }[]; // Updated type
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
            <h2 className="text-xl font-bold">
              <span className="text-accent">{location}</span>
            </h2>
            {/* Cards for this location */}
            <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locationCards.map((card) => {
                const cardKey = `${location}_${card.mealType}`; // Unique key
                return (
                  <CSSTransition key={cardKey} timeout={300} classNames="card">
                    <HoverCard
                      mealType={card.mealType}
                      menuItems={card.menuItems}
                      selectedAllergens={selectedAllergens}
                    />
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
        )
      )}
    </div>
  );
};

export default CardGrid;
