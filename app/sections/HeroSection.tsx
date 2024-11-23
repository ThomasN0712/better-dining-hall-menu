// HeroSection.tsx
import React, { useState, useEffect } from "react";
import CardGrid from "@/components/HeroSection/CardGrid";
import { DatePicker, LocationPicker, MealTypePicker, AllergenPicker } from "@/components/HeroSection/Pickers";

const HeroSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [selectedMealTypeId, setSelectedMealTypeId] = useState<number | null>(null);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [cardsData, setCardsData] = useState<any[]>([]);

  useEffect(() => {
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/menu_items?date=${selectedDate}&location_id=${selectedLocationId}&meal_type_id=${selectedMealTypeId}`
      );
      const data = await response.json();

      // Transform data to match the expected structure for CardGrid
      const transformedData = [
        {
          location: data.length > 0 ? data[0].location : "Unknown Location",
          mealType: data.length > 0 ? data[0].meal_type : "Unknown Meal Type",
          menuItems: data.map((item: any) => ({
            name: item.item_name,
            hasAllergen: selectedAllergens.includes(item.item_name.toLowerCase()),
          })),
        },
      ];

      setCardsData(transformedData);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  if (selectedDate && selectedLocationId && selectedMealTypeId !== null) {
    fetchMenuItems();
  }
}, [selectedDate, selectedLocationId, selectedMealTypeId, selectedAllergens]);


  return (
    <div>
      {/* Your pickers go here */}
      <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <LocationPicker selectedLocationId={selectedLocationId} onLocationChange={setSelectedLocationId} />
      <MealTypePicker selectedMealTypeId={selectedMealTypeId} onMealTypeChange={setSelectedMealTypeId} />
      <AllergenPicker selectedAllergens={selectedAllergens} onAllergensChange={setSelectedAllergens} />

      {/* Pass the data to CardGrid */}
      <CardGrid cards={cardsData} selectedAllergens={selectedAllergens} />
    </div>
  );
};

export default HeroSection;
