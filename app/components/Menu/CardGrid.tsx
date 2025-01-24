import React from "react";
import HoverCard from "./HoverCard";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type LocationSchedule = {
  location: string;
  mealType: string;
  start: string;
  end: string;
};

const weekdaySchedules: LocationSchedule[] = [
  {
    location: "Parkside",
    mealType: "Breakfast",
    start: "7:00 AM",
    end: "10:00 AM",
  },
  {
    location: "Parkside",
    mealType: "Lunch",
    start: "11:00 AM",
    end: "2:30 PM",
  },
  {
    location: "Parkside",
    mealType: "Dinner",
    start: "4:00 PM",
    end: "8:30 PM",
  },
  {
    location: "Hillside",
    mealType: "Breakfast",
    start: "7:00 AM",
    end: "10:00 AM",
  },
  {
    location: "Hillside",
    mealType: "Lunch",
    start: "11:00 AM",
    end: "2:30 PM",
  },
  {
    location: "Hillside",
    mealType: "Dinner",
    start: "4:00 PM",
    end: "8:30 PM",
  },
  {
    location: "Beachside",
    mealType: "Breakfast",
    start: "6:30 AM",
    end: "9:00 AM",
  },
  {
    location: "Beachside",
    mealType: "Lunch",
    start: "11:00 AM",
    end: "1:30 PM",
  },
  {
    location: "Beachside",
    mealType: "Dinner",
    start: "5:00 PM",
    end: "8:30 PM",
  },
];

const weekendSchedules: LocationSchedule[] = [
  {
    location: "Parkside",
    mealType: "Brunch",
    start: "9:30 AM",
    end: "1:30 PM",
  },
  {
    location: "Parkside",
    mealType: "Dinner",
    start: "4:00 PM",
    end: "7:30 PM",
  },
  {
    location: "Hillside",
    mealType: "Brunch",
    start: "9:30 AM",
    end: "1:30 PM",
  },
  {
    location: "Hillside",
    mealType: "Dinner",
    start: "4:00 PM",
    end: "7:30 PM",
  },
  {
    location: "Beachside",
    mealType: "Brunch",
    start: "11:00 AM",
    end: "1:30 PM",
  },
  {
    location: "Beachside",
    mealType: "Dinner",
    start: "5:00 PM",
    end: "7:30 PM",
  },
];

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
  isWeekendSelected: boolean;
};

const CardGrid: React.FC<CardGridProps> = ({
  cards,
  selectedAllergens,
  isWeekendSelected,
}) => {
  // Determine the current schedule
  const schedules = isWeekendSelected ? weekendSchedules : weekdaySchedules;

  // Group cards by location
  const groupedCards = cards.reduce(
    (acc: { [key: string]: CardData[] }, card) => {
      if (!acc[card.location]) {
        acc[card.location] = [];
      }
      acc[card.location].push(card);
      return acc;
    },
    {},
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {locationCards.map((card) => {
                  const cardKey = `${location}_${card.mealType}`;

                  // Find the schedule for this location and meal type
                  const schedule = schedules.find(
                    (s) =>
                      s.location === location && s.mealType === card.mealType,
                  );

                  // If schedule is found, extract start and end times
                  const startTime = schedule?.start || "";
                  const endTime = schedule?.end || "";

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
                        startTime={startTime}
                        endTime={endTime}
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
