// components/HeroSection/Pickers/MealTypePicker.tsx
import React, { useEffect, useState } from "react";

type MealType = {
  meal_type_id: number;
  meal_type_name: string;
};

type MealTypePickerProps = {
  selectedMealTypeId: number | null;
  onMealTypeChange: (mealTypeId: number) => void;
};

const MealTypePicker: React.FC<MealTypePickerProps> = ({ selectedMealTypeId, onMealTypeChange }) => {
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);

  useEffect(() => {
    const fetchMealTypes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/meal_types");
        const data = await response.json();
        setMealTypes(data);
      } catch (error) {
        console.error("Error fetching meal types:", error);
      }
    };

    fetchMealTypes();
  }, []);

  return (
    <div>
      <label htmlFor="meal-type-picker" className="block text-sm font-medium text-gray-700">
        Select Meal Type
      </label>
      <select
        id="meal-type-picker"
        value={selectedMealTypeId || ""}
        onChange={(e) => onMealTypeChange(Number(e.target.value))}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
      >
        <option value="">-- Select Meal Type --</option>
        {mealTypes.map((mealType) => (
          <option key={mealType.meal_type_id} value={mealType.meal_type_id}>
            {mealType.meal_type_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MealTypePicker;
