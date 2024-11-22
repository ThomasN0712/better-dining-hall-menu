"use client";

import React, { useState } from "react";
import Timer from "@/components/HeroSection/Timer";
import LocationPicker from "@/components/HeroSection/Pickers/LocationPicker";
import MealTypePicker from "@/components/HeroSection/Pickers/MealTypePicker";
import AllergenPicker from "@/components/HeroSection/Pickers/AllergenPicker";
import CustomDatePicker from "@/components/HeroSection/Pickers/DatePicker";
import CardGrid from "@/components/HeroSection/CardGrid";
import AlwaysAvailableCard from "@/components/HeroSection/AlwaysAvailableCard";

// Mock Data
const mealSchedule = [
  { mealType: "Breakfast", start: "07:00", end: "09:30" },
  { mealType: "Lunch", start: "11:30", end: "13:30" },
  { mealType: "Dinner", start: "17:30", end: "19:30" },
];

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

const alwaysAvailableItems = ["Cereal", "Milk", "Coffee", "Tea", "Fruit"];

const HeroSection: React.FC = () => {
  // State Management
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

  // Filter Logic
  const filteredMenuData = mockMenuData.filter((item) => {
    const matchesDate =
      !selectedDate || item.date.toDateString() === selectedDate.toDateString();
    const matchesLocation =
      selectedLocations.length === 0 || selectedLocations.includes(item.location);
    const matchesMealType =
      selectedMealTypes.length === 0 || selectedMealTypes.includes(item.mealType);
    const filteredMenuItems = item.menuItems.filter(
      (menuItem) =>
        !menuItem.hasAllergen ||
        !selectedAllergens.some((allergen) =>
          menuItem.name.toLowerCase().includes(allergen.toLowerCase())
        )
    );

    return matchesDate && matchesLocation && matchesMealType && filteredMenuItems.length > 0;
  });

  return (
    <section className="p-6 bg-background-light dark:bg-background-dark">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">
        Better Dining Hall
      </h1>

      {/* Timer */}
      <div className="mb-6">
        <Timer mealSchedule={mealSchedule} />
      </div>

      {/* Pickers */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
          Select a Date
        </h2>
        <CustomDatePicker
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
          Select Dining Locations
        </h2>
        <LocationPicker
          locations={["Hillside", "Beachside", "Parkside"]}
          selectedLocations={selectedLocations}
          onChange={setSelectedLocations}
        />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
          Select Meal Types
        </h2>
        <MealTypePicker
          mealTypes={["Breakfast", "Lunch", "Dinner"]}
          selectedMealTypes={selectedMealTypes}
          onChange={setSelectedMealTypes}
        />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
          Select Allergens
        </h2>
        <AllergenPicker
          allergens={["Peanuts", "Dairy", "Gluten"]}
          selectedAllergens={selectedAllergens}
          onChange={setSelectedAllergens}
        />
      </div>

      {/* Always Available Card */}
      <div className="mb-6">
        <AlwaysAvailableCard items={alwaysAvailableItems} />
      </div>

      {/* Card Grid */}
      <div>
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
