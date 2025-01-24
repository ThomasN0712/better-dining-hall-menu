import React, { useState } from "react";

type MealType = {
  meal_type_id: number;
  meal_type_name: string;
};

type MealTypePickerProps = {
  selectedMealTypeIds: number[];
  onMealTypesChange: (mealTypeIds: number[]) => void;
};

// Emoji and tag colors for meal types
const mealTypeStyles: Record<string, { emoji: string; color: string }> = {
  Breakfast: { emoji: "🍳", color: "bg-yellow-200 text-yellow-800" },
  Brunch: { emoji: "🥞", color: "bg-orange-200 text-orange-800" },
  Lunch: { emoji: "🥗", color: "bg-green-200 text-green-800" },
  Dinner: { emoji: "🍝", color: "bg-blue-200 text-blue-800" },
};

// Static meal types data
const staticMealTypes: MealType[] = [
  { meal_type_id: 1, meal_type_name: "Breakfast" },
  { meal_type_id: 2, meal_type_name: "Brunch" },
  { meal_type_id: 3, meal_type_name: "Lunch" },
  { meal_type_id: 4, meal_type_name: "Dinner" },
];

const MealTypePicker: React.FC<MealTypePickerProps> = ({
  selectedMealTypeIds,
  onMealTypesChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Ensure all meal types are selected by default
  React.useEffect(() => {
    const allMealTypeIds = staticMealTypes.map(
      (mealType) => mealType.meal_type_id,
    );
    onMealTypesChange(allMealTypeIds);
  }, [onMealTypesChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (mealTypeId: number) => {
    if (selectedMealTypeIds.includes(mealTypeId)) {
      onMealTypesChange(selectedMealTypeIds.filter((id) => id !== mealTypeId));
    } else {
      onMealTypesChange([...selectedMealTypeIds, mealTypeId]);
    }
  };

  const handleTagRemove = (mealTypeId: number) => {
    onMealTypesChange(selectedMealTypeIds.filter((id) => id !== mealTypeId));
  };

  const getMealTypeStyle = (mealTypeName: string) =>
    mealTypeStyles[mealTypeName] || {
      emoji: "❓",
      color: "bg-gray-200 text-gray-800",
    };

  return (
    <div className="relative">
      <h3 className="text-md mb-2 font-medium text-text-light dark:text-text-dark">
        Select Meal Types
      </h3>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex w-full flex-wrap items-center gap-2 rounded-md border border-background-borderLight bg-background-cardLight px-4 py-2 pr-6 text-left text-text-light shadow-sm dark:border-background-borderDark dark:bg-background-cardDark dark:text-text-dark"
      >
        {selectedMealTypeIds.length > 0 ? (
          selectedMealTypeIds.map((mealTypeId) => {
            const mealType = staticMealTypes.find(
              (m) => m.meal_type_id === mealTypeId,
            );
            if (!mealType) return null;
            const { emoji, color } = getMealTypeStyle(mealType.meal_type_name);
            return (
              <span
                key={mealType.meal_type_id}
                className={`inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ${color}`}
              >
                {emoji} {mealType.meal_type_name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTagRemove(mealType.meal_type_id);
                  }}
                  className="ml-2 text-text-light hover:text-red-600 dark:hover:text-red-400"
                  aria-label={`Remove ${mealType.meal_type_name}`}
                >
                  ×
                </button>
              </span>
            );
          })
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            Select Meal Types
          </span>
        )}
        <svg
          className={`ml-auto h-5 w-5 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-background-borderLight bg-background-light shadow-lg dark:border-background-borderDark dark:bg-background-dark">
          <ul className="max-h-full space-y-2 overflow-auto p-2">
            {staticMealTypes.map((mealType) => {
              const { emoji } = getMealTypeStyle(mealType.meal_type_name);
              return (
                <li
                  key={mealType.meal_type_id}
                  className="flex cursor-pointer items-center rounded hover:bg-background-boxLight dark:hover:bg-background-boxDark"
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedMealTypeIds.includes(
                        mealType.meal_type_id,
                      )}
                      onChange={() =>
                        handleCheckboxChange(mealType.meal_type_id)
                      }
                      className="h-4 w-4 rounded accent-accent focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                    />
                    <span className="ml-3 text-text-light dark:text-text-dark">
                      {emoji} {mealType.meal_type_name}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MealTypePicker;
