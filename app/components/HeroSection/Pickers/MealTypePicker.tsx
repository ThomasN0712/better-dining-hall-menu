import React, { useEffect, useState } from "react";

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

const MealTypePicker: React.FC<MealTypePickerProps> = ({
  selectedMealTypeIds,
  onMealTypesChange,
}) => {
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchMealTypes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/meal_types");
        const data = await response.json();
        setMealTypes(data);

        // Set all meal types as selected by default
        const allMealTypeIds = data.map(
          (mealType: MealType) => mealType.meal_type_id
        );
        onMealTypesChange(allMealTypeIds);
      } catch (error) {
        console.error("Error fetching meal types:", error);
      }
    };

    fetchMealTypes();
  }, []);

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
        className="w-full pr-6 bg-background-cardLight dark:bg-background-cardDark text-text-light dark:text-text-dark border border-background-borderLight dark:border-background-borderDark rounded-md px-4 py-2 text-left shadow-sm flex flex-wrap gap-2 items-center"
      >
        {selectedMealTypeIds.length > 0 ? (
          selectedMealTypeIds.map((mealTypeId) => {
            const mealType = mealTypes.find(
              (m) => m.meal_type_id === mealTypeId
            );
            if (!mealType) return null;
            const { emoji, color } = getMealTypeStyle(mealType.meal_type_name);
            return (
              <span
                key={mealType.meal_type_id}
                className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${color}`}
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
          className={`w-5 h-5 ml-auto transform transition-transform ${
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
        <div className="absolute z-10 mt-2 w-full bg-background-light dark:bg-background-dark border border-background-borderLight dark:border-background-borderDark rounded-md shadow-lg">
          <ul className="max-h-full overflow-auto p-2 space-y-2">
            {mealTypes.map((mealType) => {
              const { emoji } = getMealTypeStyle(mealType.meal_type_name);
              return (
                <li
                  key={mealType.meal_type_id}
                  className="flex items-center hover:bg-background-boxLight dark:hover:bg-background-boxDark rounded cursor-pointer"
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedMealTypeIds.includes(
                        mealType.meal_type_id
                      )}
                      onChange={() =>
                        handleCheckboxChange(mealType.meal_type_id)
                      }
                      className="w-4 h-4 accent-accent focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:outline-none rounded"
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
