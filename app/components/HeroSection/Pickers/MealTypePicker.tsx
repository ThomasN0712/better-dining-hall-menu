import React, { useEffect, useState } from "react";

type MealType = {
  meal_type_id: number;
  meal_type_name: string;
};

type MealTypePickerProps = {
  selectedMealTypeIds: number[];
  onMealTypesChange: (mealTypeIds: number[]) => void;
};

const MealTypePicker: React.FC<MealTypePickerProps> = ({ selectedMealTypeIds, onMealTypesChange }) => {
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

  const handleCheckboxChange = (mealTypeId: number) => {
    if (selectedMealTypeIds.includes(mealTypeId)) {
      onMealTypesChange(selectedMealTypeIds.filter((id) => id !== mealTypeId));
    } else {
      onMealTypesChange([...selectedMealTypeIds, mealTypeId]);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">Select Meal Types</h3>
      <div className="mt-2 space-y-1">
        {mealTypes.map((mealType) => (
          <label key={mealType.meal_type_id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedMealTypeIds.includes(mealType.meal_type_id)}
              onChange={() => handleCheckboxChange(mealType.meal_type_id)}
              className="mr-2"
            />
            {mealType.meal_type_name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MealTypePicker;
