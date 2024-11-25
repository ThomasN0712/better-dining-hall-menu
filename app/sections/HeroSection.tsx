"use client";

import React, { useState, useEffect } from "react";
import CardGrid from "@/components/HeroSection/CardGrid";
import Timer from "@/components/HeroSection/Timer";
import { BackgroundBeams } from "@/components/background-beams";

import {
  DatePicker,
  LocationPicker,
  MealTypePicker,
  AllergenPicker,
} from "@/components/HeroSection/Pickers";

type MenuItem = {
  name: string;
  allergens: { id: number; name: string }[];
};

type CardData = {
  location: string;
  mealType: string;
  menuItems: MenuItem[];
};

const HeroSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [selectedMealTypeIds, setSelectedMealTypeIds] = useState<number[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (
        selectedDate &&
        selectedLocationIds.length > 0 &&
        selectedMealTypeIds.length > 0
      ) {
        setLoading(true);
        try {
          const dateStr = selectedDate.toISOString().split("T")[0];
          const fetchPromises = [];

          for (const locationId of selectedLocationIds) {
            for (const mealTypeId of selectedMealTypeIds) {
              const url = `http://127.0.0.1:8000/menu_items?date=${dateStr}&location_id=${locationId}&meal_type_id=${mealTypeId}`;
              fetchPromises.push(
                fetch(url).then((response) => response.json())
              );
            }
          }

          const results = await Promise.all(fetchPromises);

          // Flatten the results and group by location and meal type
          const newCardsData: CardData[] = [];
          results.forEach((data) => {
            if (data.length > 0) {
              const firstItem = data[0];
              const card: CardData = {
                location: firstItem.location,
                mealType: firstItem.meal_type,
                menuItems: data.map((item: any) => ({
                  name: item.item_name,
                  allergens: item.allergens,
                })),
              };
              newCardsData.push(card);
            }
          });

          setCardsData(newCardsData);
        } catch (error) {
          console.error("Error fetching menu items:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCardsData([]);
      }
    };

    fetchMenuItems();
  }, [selectedDate, selectedLocationIds, selectedMealTypeIds]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark pt-48">
      <BackgroundBeams className="" />
      {/* Content */}
      <div className="relative z-10 container mx-auto p-4">
        {/* Title */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-[#eba904] to-[#96938d] bg-clip-text text-transparent">
            CSULB DINING HALL MENU
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-between">
          {/* Timer */}
          <Timer />

          {/* Pickers */}
          <div className="flex flex-col md:flex-row gap-6 bg-background-cardLight dark:bg-background-cardDark border-background-borderLight dark:border-background-borderDark border p-6 rounded-lg shadow-lg">
            <DatePicker
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
            <LocationPicker
              selectedLocationIds={selectedLocationIds}
              onLocationsChange={setSelectedLocationIds}
            />
            <MealTypePicker
              selectedMealTypeIds={selectedMealTypeIds}
              onMealTypesChange={setSelectedMealTypeIds}
            />
            <AllergenPicker
              selectedAllergens={selectedAllergens}
              onAllergensChange={setSelectedAllergens}
            />
          </div>
        </div>

        {/* Card Grid */}
        <div className="relative pt-10">
          {loading ? (
            <div className="text-center text-mutedLight dark:text-mutedDark">
              Loading menu items...
            </div>
          ) : (
            <CardGrid cards={cardsData} selectedAllergens={selectedAllergens} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
