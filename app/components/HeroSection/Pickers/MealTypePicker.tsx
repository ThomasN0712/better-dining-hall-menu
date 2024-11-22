// components/HeroSection/Pickers/MealTypePicker.tsx
import React from "react";

type MealTypePickerProps = {
  mealTypes: string[]; // Array of available meal types
  selectedMealTypes: string[]; // Currently selected meal types
  onChange: (mealTypes: string[]) => void; // Callback to update selected meal types
};

const MealTypePicker: React.FC<MealTypePickerProps> = ({
  mealTypes,
  selectedMealTypes,
  onChange,
}) => {
  // Handle toggle selection
  const toggleMealType = (mealType: string) => {
    const updatedMealTypes = selectedMealTypes.includes(mealType)
      ? selectedMealTypes.filter((type) => type !== mealType) // Remove if already selected
      : [...selectedMealTypes, mealType]; // Add if not selected
    onChange(updatedMealTypes);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {mealTypes.map((mealType) => (
        <button
          key={mealType}
          onClick={() => toggleMealType(mealType)}
          className={`px-4 py-2 rounded border ${
            selectedMealTypes.includes(mealType)
              ? "bg-primary-light text-white border-primary-light dark:bg-primary-dark"
              : "bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {mealType}
        </button>
      ))}
    </div>
  );
};

export default MealTypePicker;
