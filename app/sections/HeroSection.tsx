"use client"

import React, { useState, useEffect } from "react";
import CardGrid from "@/components/HeroSection/CardGrid";
import { DatePicker, LocationPicker, MealTypePicker, AllergenPicker } from "@/components/HeroSection/Pickers";


type MenuItem = {
  name: string;
  allergens: number[]; // Array of allergen IDs
};

type CardData = {
  location: string;
  mealType: string;
  menuItems: MenuItem[];
};

const HeroSection: React.FC = () => {
  const [selectedDateId, setSelectedDateId] = useState<number | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [selectedMealTypeId, setSelectedMealTypeId] = useState<number | null>(null);
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch menu items whenever selections change
  useEffect(() => {
    const fetchMenuItems = async () => {
      if (selectedDateId && selectedLocationId && selectedMealTypeId !== null) {
        setLoading(true);
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/menu_items?day_id=${selectedDateId}&location_id=${selectedLocationId}&meal_type_id=${selectedMealTypeId}`
          );
          const data = await response.json();

          // Transform data to match CardGrid's expected structure
          const transformedData: CardData[] = [
            {
              location: data.length > 0 ? data[0].location : "Unknown Location",
              mealType: data.length > 0 ? data[0].meal_type : "Unknown Meal Type",
              menuItems: data.map((item: any) => ({
                name: item.item_name,
                allergens: item.allergens, // Array of allergen IDs
              })),
            },
          ];

          setCardsData(transformedData);
        } catch (error) {
          console.error("Error fetching menu items:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMenuItems();
  }, [selectedDateId, selectedLocationId, selectedMealTypeId]);

  return (
    <div className="container mx-auto p-4">
      {/* Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DatePicker selectedDateId={selectedDateId} onDateChange={setSelectedDateId} />
        <LocationPicker selectedLocationId={selectedLocationId} onLocationChange={setSelectedLocationId} />
        <MealTypePicker selectedMealTypeId={selectedMealTypeId} onMealTypeChange={setSelectedMealTypeId} />
        <AllergenPicker selectedAllergens={selectedAllergens} onAllergensChange={setSelectedAllergens} />
      </div>

      {/* Card Grid */}
      {loading ? (
        <div>Loading menu items...</div>
      ) : (
        <CardGrid cards={cardsData} selectedAllergens={selectedAllergens} />
      )}
    </div>
  );
};

export default HeroSection;
