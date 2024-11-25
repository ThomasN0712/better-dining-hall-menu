"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CardGrid from "@/components/HeroSection/CardGrid";
import MealTimer from "@/components/HeroSection/MealTimer";

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

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

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
      {/* Grid Background */}
      <div className="absolute inset-0 h-full w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] pointer-events-none z-0">
        {/* Radial Gradient */}
        <div className="absolute inset-0 h-full w-full dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container">
        {/* Title */}
        <div className="text-center">
          <motion.h1
            className="text-4xl sm:text-6xl font-bold text-center"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <span className="bg-accent bg-clip-text text-transparent">
              CSULB
            </span>{" "}
            <span className="text-black dark:text-white">
              DINING HALL MENU{" "}
            </span>
            <span className="text-5xl">🍽️</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-center italic sm:text-xl text-gray-700 dark:text-gray-400 mt-4 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Your Ultimate Guide to CSULB Dining.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-6 justify-between">
          {/* Timer */}
          <MealTimer />

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
        <div className="relative pt-10 mb-16">
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
