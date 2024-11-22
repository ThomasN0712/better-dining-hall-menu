// Example Usage in HeroSection
import React from "react";
import CardGrid from "@/components/HeroSection/CardGrid";

const HeroSection: React.FC = () => {
  const mockCards = [
    {
      location: "Hillside Dining",
      mealType: "Lunch",
      menuItems: [
        { name: "Grilled Chicken", hasAllergen: false },
        { name: "Peanut Butter Sandwich", hasAllergen: true },
        { name: "Vegan Salad", hasAllergen: false },
      ],
    },
    {
      location: "Beachside Dining",
      mealType: "Dinner",
      menuItems: [
        { name: "Fish Tacos", hasAllergen: false },
        { name: "Cheese Pizza", hasAllergen: true },
        { name: "Garden Salad", hasAllergen: false },
      ],
    },
  ];

  const selectedAllergens = ["peanut"];

  return (
    <section className="p-6 bg-background-light dark:bg-background-dark">
      <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
        Dining Hall Menu
      </h2>
      <CardGrid cards={mockCards} selectedAllergens={selectedAllergens} />
    </section>
  );
};

export default HeroSection;
