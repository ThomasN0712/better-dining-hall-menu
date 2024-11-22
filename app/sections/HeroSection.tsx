"use client";

import React, { useState } from "react";
import LocationPicker from "@/components/HeroSection/Pickers/LocationPicker";
import MealTypePicker from "@/components/HeroSection/Pickers/MealTypePicker";
import AllergenPicker from "@/components/HeroSection/Pickers/AllergenPicker";
import CustomDatePicker from "@/components/HeroSection/Pickers/DatePicker";
import Timer from "@/components/HeroSection/Timer";
import CardGrid from "@/components/HeroSection/CardGrid";

// Mock menu data
const mockMenuData = [
  {
    location: "Hillside",
    mealType: "Breakfast",
    date: new Date("2024-11-22"),
    menuItems: [
      { name: "Pancakes", hasAllergen: false },
      { name: "Scrambled Eggs", hasAllergen: false },
      { name: "Peanut Butter", hasAllergen: true },
    ],
  },
  {
    location: "Beachside",
    mealType: "Lunch",
    date: new Date("2024-11-22"),
    menuItems: [
      { name: "Grilled Chicken", hasAllergen: false },
      { name: "Caesar Salad", hasAllergen: false },
      { name: "Gluten-Free Pasta", hasAllergen: false },
    ],
  },
  {
    location: "Parkside",
    mealType: "Dinner",
    date: new Date("2024-11-22"),
    menuItems: [
      { name: "Spaghetti", hasAllergen: true },
      { name: "Garlic Bread", hasAllergen: true },
      { name: "Steamed Vegetables", hasAllergen: false },
    ],
  },
];

const HeroSection: React.FC = () => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const mealSchedule = [
    { mealType: "Breakfast", start: "07:00", end: "09:30" },
    { mealType: "Lunch", start: "11:30", end: "13:30" },
    { mealType: "Dinner", start: "17:30", end: "19:30" },
  ];

  // Filter menu data based on picker selections
  const filteredMenuData = mockMenuData.filter((item) => {
    const matchesLocation =
      selectedLocations.length === 0 || selectedLocations.includes(item.location);
    const matchesMealType =
      selectedMealTypes.length === 0 || selectedMealTypes.includes(item.mealType);
    const matchesDate =
      selectedDates.length === 0 ||
      selectedDates.some(
        (date) => date.toDateString() === item.date.toDateString()
      );
    const filteredMenuItems = item.menuItems.filter(
      (menuItem) =>
        !menuItem.hasAllergen ||
        !selectedAllergens.some((allergen) =>
          menuItem.name.toLowerCase().includes(allergen.toLowerCase())
        )
    );

    return matchesLocation && matchesMealType && matchesDate && filteredMenuItems.length > 0;
  });

  return (
    <section className="p-6 bg-background-light dark:bg-background-dark">
      <h1 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">
        Better Dining Hall
      </h1>

      {/* Timer */}
      <div className="mb-6">
        <Timer mealSchedule={mealSchedule} />
      </div>

      {/* Pickers */}
      <div className="mb-6">
        <LocationPicker
          locations={["Hillside", "Beachside", "Parkside"]}
          selectedLocations={selectedLocations}
          onChange={setSelectedLocations}
        />
      </div>
      <div className="mb-6">
        <MealTypePicker
          mealTypes={["Breakfast", "Lunch", "Dinner"]}
          selectedMealTypes={selectedMealTypes}
          onChange={setSelectedMealTypes}
        />
      </div>
      <div className="mb-6">
        <AllergenPicker
          allergens={["Peanuts", "Dairy", "Gluten"]}
          selectedAllergens={selectedAllergens}
          onChange={setSelectedAllergens}
        />
      </div>
      <div className="mb-6">
        <CustomDatePicker
          selectedDates={selectedDates}
          onChange={setSelectedDates}
        />
      </div>

      {/* Card Grid */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-text-light dark:text-text-dark">
          Menu Items
        </h2>
        <CardGrid
          cards={filteredMenuData.map((data) => ({
            location: data.location,
            mealType: data.mealType,
            menuItems: data.menuItems.filter(
              (menuItem) =>
                !menuItem.hasAllergen ||
                !selectedAllergens.some((allergen) =>
                  menuItem.name.toLowerCase().includes(allergen.toLowerCase())
                )
            ),
          }))}
          selectedAllergens={selectedAllergens}
        />
      </div>
    </section>
  );
};

export default HeroSection;
