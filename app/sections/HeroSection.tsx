"use client"
import React, { useState, useEffect } from "react";
import CardGrid from "@/components/HeroSection/CardGrid";
import { DatePicker, LocationPicker, MealTypePicker, AllergenPicker } from "@/components/HeroSection/Pickers";

type MenuItem = {
  name: string;
  allergens: number[];
};

type CardData = {
  location: string;
  mealType: string;
  menuItems: MenuItem[];
};

const HeroSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [selectedMealTypeIds, setSelectedMealTypeIds] = useState<number[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (selectedDate && selectedLocationIds.length > 0 && selectedMealTypeIds.length > 0) {
        setLoading(true);
        try {
          const dateStr = selectedDate.toISOString().split("T")[0];

          const fetchPromises = [];

          for (const locationId of selectedLocationIds) {
            for (const mealTypeId of selectedMealTypeIds) {
              const url = `http://127.0.0.1:8000/menu_items?date=${dateStr}&location_id=${locationId}&meal_type_id=${mealTypeId}`;
              fetchPromises.push(fetch(url).then((response) => response.json()));
            }
          }

          const results = await Promise.all(fetchPromises);

          // Flatten the results and group by location and meal type
          const newCardsData: CardData[] = [];

          results.forEach((data, index) => {
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
    <div className="container mx-auto p-4">
      {/* Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <LocationPicker selectedLocationIds={selectedLocationIds} onLocationsChange={setSelectedLocationIds} />
        <MealTypePicker selectedMealTypeIds={selectedMealTypeIds} onMealTypesChange={setSelectedMealTypeIds} />
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
