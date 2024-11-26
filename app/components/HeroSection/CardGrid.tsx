import React from "react";
import HoverCard from "./HoverCard";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type MenuItem = {
  name: string;
  allergens: { id: number; name: string }[];
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
      {Object.entries(groupedCards).map(([location, locationCards]) => (
        <div key={location} className="space-y-4">
          {/* Location Header */}
          <h2 className="text-xl font-bold">
            <span className="text-accent">{location}</span>
          </h2>
          {/* Cards for this location */}
          <LayoutGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {locationCards.map((card) => {
                  const cardKey = `${location}_${card.mealType}`;
                  return (
                    <motion.div
                      key={cardKey}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HoverCard
                        mealType={card.mealType}
                        menuItems={card.menuItems}
                        selectedAllergens={selectedAllergens}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
