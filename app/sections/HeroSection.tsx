"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import CardGrid from "@/components/HeroSection/CardGrid";
import MealTimer from "@/components/HeroSection/MealTimer";
import AlwaysAvailableCard from "@/components/HeroSection/AlwaysAvailableCard";
import { TypewriterEffect } from "@/components/TypeWriterEffect";

import {
  DatePicker,
  LocationPicker,
  MealTypePicker,
  AllergenPicker,
} from "@/components/HeroSection/Pickers";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://better-dining-hall-menu.onrender.com";

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
  const [menuItemsData, setMenuItemsData] = useState<any[]>([]);
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

  const words = [
    {
      text: "A",
    },
    {
      text: "Slightly",
    },
    {
      text: "Better",
    },
    {
      text: "Menu",
    },
    {
      text: "Design",
    },
  ];

  // Fetch all menu items for the selected date and cache them
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (selectedDate) {
        setLoading(true);
        try {
          const dateStr = selectedDate.toISOString().split("T")[0];
          const url = `${API_BASE_URL}/menu_items?date=${dateStr}`;
          const response = await fetch(url);
          const data = await response.json();

          // Cache the data
          setMenuItemsData(data);
        } catch (error) {
          console.error("Error fetching menu items:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setMenuItemsData([]);
      }
    };

    fetchMenuItems();
  }, [selectedDate]);

  // Filter menu items based on selected locations and meal types
  useEffect(() => {
    const filterMenuItems = () => {
      if (menuItemsData.length > 0) {
        let filteredData = menuItemsData;

        if (selectedLocationIds.length > 0) {
          filteredData = filteredData.filter((item) =>
            selectedLocationIds.includes(item.location_id)
          );
        }

        if (selectedMealTypeIds.length > 0) {
          filteredData = filteredData.filter((item) =>
            selectedMealTypeIds.includes(item.meal_type_id)
          );
        }

        // Group the filtered data by location and meal type
        const groupedData = filteredData.reduce((acc: any, item: any) => {
          const key = `${item.location}-${item.meal_type}`;
          if (!acc[key]) {
            acc[key] = {
              location: item.location,
              mealType: item.meal_type,
              menuItems: [],
            };
          }
          acc[key].menuItems.push({
            name: item.item_name,
            allergens: item.allergens,
          });
          return acc;
        }, {});

        setCardsData(Object.values(groupedData));
      } else {
        setCardsData([]);
      }
    };

    filterMenuItems();
  }, [menuItemsData, selectedLocationIds, selectedMealTypeIds]);

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
        <TypewriterEffect words={words} className="mt-4 mb-16" />

        <div className="flex flex-col md:flex-row gap-6 justify-center">
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
        <div className="relative pt-10 mb-10">
          {loading ? (
            <div className="text-center text-mutedLight dark:text-mutedDark">
              Loading menu items...
            </div>
          ) : (
            <CardGrid cards={cardsData} selectedAllergens={selectedAllergens} />
          )}
        </div>

        {/* Always Available Cards */}
        <h2 className="text-xl font-bold">
          <span className="text-accent">Always Available:</span>
        </h2>
        <h2 className="text-lg font-medium mb-4">
          <span className="text-text-subtitleLight dark:text-text-subtitleDark">
            These items are always available at all dining hall locations.
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {selectedMealTypeIds.map((mealTypeId) => (
            <AlwaysAvailableCard key={mealTypeId} mealTypeId={mealTypeId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
