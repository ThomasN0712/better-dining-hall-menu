"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CardGrid from "@/components/Menu/CardGrid";
import MealTimer from "@/components/Menu/MealTimer";
import AlwaysAvailableCard from "@/components/Menu/AlwaysAvailableCard";
import { TypewriterEffect } from "@/components/TypeWriterEffect";
import { isWeekend } from "date-fns";
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

// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

// Utility function to format date explicitly as YYYY-MM-DD
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

type MenuItem = {
  name: string;
  allergens: { id: number; name: string }[];
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
        const currentFetchId = ++fetchIdRef.current;
        setLoading(true);
        try {
          const dateStr = formatDate(selectedDate);

          // Check if the selected date exceeds the cut-off date
          if (new Date(dateStr) > new Date(CUT_OFF_DATE)) {
            setIsCutOffExceeded(true);
            setTemporaryMenuName(null);
            setMenuItemsData([]);
            return;
          }

          setIsCutOffExceeded(false);

          // Check if the date is in temporaryMenus
          // if (temporaryMenus[dateStr]) {
          //   const { menuName, menuItems } = temporaryMenus[dateStr];
          //   if (currentFetchId === fetchIdRef.current) {
          //     setTemporaryMenuName(menuName);
          //     setMenuItemsData(menuItems);
          //   }
          //   return;
          // }

          // Reset temporary menu name
          setTemporaryMenuName(null);

          const url = `${API_BASE_URL}/menu_items?date=${dateStr}`;
          const response = await fetch(url);
          const data = await response.json();

          // Only update if fetchId matches the latest request
          if (currentFetchId === fetchIdRef.current) {
            // Cache the data
            setMenuItemsData(data);
          }
        } catch (error) {
          console.error("Error fetching menu items:", error);
        } finally {
          if (currentFetchId === fetchIdRef.current) {
            setLoading(false);
          }
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
            selectedLocationIds.includes(item.location_id),
          );
        }

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
    if (selectedDate) {
      setIsWeekendSelected(isWeekend(selectedDate));
    }
  }, [selectedDate]);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center pt-48 text-text-light dark:text-text-dark"
      id="menu"
    >
      {/* Content */}
      <div className="container relative z-10">
        {/* Title */}
        <div className="text-center">
          <motion.h1
            className="text-center text-4xl font-bold sm:text-6xl"
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
        <TypewriterEffect words={words} className="mt-4" />

        <div className="flex flex-col justify-center gap-6 md:flex-row">
          {/* Timer */}
          <MealTimer />

          {/* Pickers */}
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

        {/* Display Message for Dates Exceeding Cut-Off */}
        {isCutOffExceeded ? (
          <div className="text-mutedLight dark:text-muted Dark flex flex-col items-center gap-6 pb-6 pt-10 text-center text-3xl font-bold">
            The menu will be updated soon when information is available. Check
            back later.
            <Image
              src="/sad-racc.jpg"
              alt="Sad Raccoon"
              width={600}
              height={600}
            />
          </div>
        ) : (
          <>
            {/* Card Grid */}
            <div className="relative mb-10 pt-10">
              {/* Temporary Menu Name */}
              {temporaryMenuName && (
                <div className="pb-2">
                  <h2 className="text-2xl font-bold">{temporaryMenuName}</h2>
                  <div className="flex items-center space-x-2">
                    <h1 className="font-bold text-red-600">Note:</h1>
                    <p>
                      The finals week menu provided by the school does not
                      include allergen information. Please confirm with dining
                      hall staff if you have allergies.
                    </p>
                  </div>
                </div>
              )}

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

            {/* Always Available Cards */}
            <h2 className="text-xl font-bold">
              <span className="text-accent">Always Available:</span>
            </h2>
            <h2 className="mb-4 text-lg font-medium">
              <span className="text-text-subtitleLight dark:text-text-subtitleDark">
                These items are always available at all dining hall locations.
              </span>
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
