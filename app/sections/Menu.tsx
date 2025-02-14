"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CardGrid from "@/components/Menu/CardGrid";
import MealTimer from "@/components/Menu/MealTimer";
import AlwaysAvailableCard from "@/components/Menu/AlwaysAvailableCard";
import { TypewriterEffect } from "@/components/TypeWriterEffect";
import { format, isWeekend } from "date-fns";
import { CUT_OFF_DATE } from "@/utils/constants";
import Image from "next/image";
import {
  DatePicker,
  LocationPicker,
  MealTypePicker,
  AllergenPicker,
} from "@/components/Menu/Pickers";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://better-dining-hall-menu.onrender.com";

// Utility to format dates as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

type MenuItem = {
  name: string;
  allergens: { id: number; name: string }[];
  aiDescription?: string;
};

type CardData = {
  location: string;
  mealType: string;
  menuItems: MenuItem[];
};

const Menu: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [selectedMealTypeIds, setSelectedMealTypeIds] = useState<number[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
  const [menuItemsData, setMenuItemsData] = useState<any[]>([]);
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isWeekendSelected, setIsWeekendSelected] = useState<boolean>(false);
  const [temporaryMenuName, setTemporaryMenuName] = useState<string | null>(
    null,
  );
  const [isCutOffExceeded, setIsCutOffExceeded] = useState<boolean>(false);
  const fetchIdRef = useRef<number>(0);

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

  // Fetch menu items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!selectedDate) {
        setMenuItemsData([]);
        return;
      }

      const currentFetchId = ++fetchIdRef.current;
      setLoading(true);

      try {
        const dateStr = formatDate(selectedDate);

        if (new Date(dateStr) > new Date(CUT_OFF_DATE)) {
          setIsCutOffExceeded(true);
          setMenuItemsData([]);
          setTemporaryMenuName(null);
          return;
        }

        setIsCutOffExceeded(false);
        const response = await fetch(
          `${API_BASE_URL}/menu_items?date=${dateStr}`,
        );
        const data = await response.json();

        // Update menu items only if the fetch ID matches
        if (fetchIdRef.current === currentFetchId) {
          setMenuItemsData(data);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        if (fetchIdRef.current === currentFetchId) {
          setLoading(false);
        }
      }
    };

    fetchMenuItems();
  }, [selectedDate]);

  // Filter and group menu items for display
  useEffect(() => {
    const filterMenuItems = () => {
      if (menuItemsData.length > 0) {
        // Start with all menu items
        let filteredData = menuItemsData;

        // Filter by location if selected
        if (selectedLocationIds.length > 0) {
          filteredData = filteredData.filter((item) =>
            selectedLocationIds.includes(item.location_id),
          );
        }

        // Filter by meal type if selected
        if (selectedMealTypeIds.length > 0) {
          filteredData = filteredData.filter((item) =>
            selectedMealTypeIds.includes(item.meal_type_id),
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
            aiDescription: item.ai_description,
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

  // Check if the selected date is a weekend
  useEffect(() => {
    setIsWeekendSelected(isWeekend(selectedDate || new Date()));
  }, [selectedDate]);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center pt-48 text-text-light dark:text-text-dark"
      id="menu"
    >
      <div className="container relative z-10">
        {/* Title */}
        <div className="text-center">
          <motion.h1
            className="text-center text-4xl font-bold sm:text-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="bg-accent bg-clip-text text-transparent">
              CSULB
            </span>{" "}
            <span className="text-black dark:text-white">DINING HALL MENU</span>{" "}
            <span className="text-5xl">🍽️</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <TypewriterEffect words={words} className="mb-2 mt-2" />

        <div className="mb-6 justify-center text-center text-lg italic text-blue-500">
          Spring 2025 Menu Available*
        </div>

        <div className="flex flex-col justify-center gap-6 md:flex-row">
          <MealTimer />
          <div className="flex flex-col gap-6 rounded-lg border border-background-borderLight bg-background-cardLight p-6 shadow-lg dark:border-background-borderDark dark:bg-background-cardDark md:flex-row">
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

        {isCutOffExceeded ? (
          <div className="text-mutedLight dark:text-mutedDark flex flex-col items-center gap-6 pb-6 pt-10 text-center text-3xl font-bold">
            The menu will be updated soon. Check back later.
            <Image
              src="/sad-racc.jpg"
              alt="Sad Raccoon"
              width={600}
              height={600}
            />
          </div>
        ) : (
          <>
            <div className="relative mb-10 pt-10">
              {loading ? (
                <div className="text-mutedLight dark:text-mutedDark text-center">
                  Loading menu items...
                </div>
              ) : (
                <CardGrid
                  cards={cardsData}
                  selectedAllergens={selectedAllergens}
                  isWeekendSelected={isWeekendSelected}
                />
              )}
            </div>
            <h2 className="text-xl font-bold">
              <span className="text-accent">Always Available:</span>
            </h2>
            <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {selectedMealTypeIds.map((mealTypeId) => (
                <AlwaysAvailableCard key={mealTypeId} mealTypeId={mealTypeId} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
