import React, { useEffect, useState } from "react";

type Allergen = {
  allergen_id: number;
  description: string;
};

type AllergenPickerProps = {
  selectedAllergens: number[];
  onAllergensChange: (allergens: number[]) => void;
};

// Static allergens data
const staticAllergens: Allergen[] = [
  { allergen_id: 1, description: "Eggs" },
  { allergen_id: 2, description: "Milk" },
  { allergen_id: 3, description: "Wheat" },
  { allergen_id: 4, description: "Soy" },
  { allergen_id: 5, description: "Peanuts" },
  { allergen_id: 6, description: "Tree Nuts" },
  { allergen_id: 7, description: "Fish" },
  { allergen_id: 8, description: "Crustacean" },
  { allergen_id: 9, description: "Sesame Seeds" },
];

// Emoji and tag colors for allergens
const allergenStyles: Record<string, { emoji: string; color: string }> = {
  Eggs: { emoji: "🥚", color: "bg-yellow-200 text-yellow-800" },
  Milk: { emoji: "🥛", color: "bg-blue-200 text-blue-800" },
  Wheat: { emoji: "🌾", color: "bg-orange-200 text-orange-800" },
  Soy: { emoji: "🌱", color: "bg-green-200 text-green-800" },
  Peanuts: { emoji: "🥜", color: "bg-amber-200 text-amber-800" },
  "Tree Nuts": { emoji: "🌰", color: "bg-amber-300 text-amber-900" },
  Fish: { emoji: "🐟", color: "bg-cyan-200 text-cyan-800" },
  Crustacean: { emoji: "🦐", color: "bg-red-200 text-red-800" },
  "Sesame Seeds": { emoji: "𓇢", color: "bg-yellow-300 text-yellow-900" },
};

const AllergenPicker: React.FC<AllergenPickerProps> = ({
  selectedAllergens,
  onAllergensChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (allergenId: number) => {
    if (selectedAllergens.includes(allergenId)) {
      onAllergensChange(selectedAllergens.filter((id) => id !== allergenId));
    } else {
      onAllergensChange([...selectedAllergens, allergenId]);
    }
  };

  const handleTagRemove = (allergenId: number) => {
    onAllergensChange(selectedAllergens.filter((id) => id !== allergenId));
  };

  const getAllergenStyle = (description: string) =>
    allergenStyles[description] || {
      emoji: "❓",
      color: "bg-gray-200 text-gray-800",
    };

  return (
    <div className="relative">
      <h3 className="text-md mb-2 font-medium text-text-light dark:text-text-dark">
        Got Allergen ❓
      </h3>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex w-full flex-wrap items-center gap-2 rounded-md border border-background-borderLight bg-background-cardLight px-4 py-2 text-left text-text-light shadow-sm dark:border-background-borderDark dark:bg-background-cardDark dark:text-text-dark"
      >
        {selectedAllergens.length > 0 ? (
          selectedAllergens.map((allergenId) => {
            const allergen = staticAllergens.find(
              (a) => a.allergen_id === allergenId,
            );
            if (!allergen) return null;
            const { emoji, color } = getAllergenStyle(allergen.description);
            return (
              <span
                key={allergen.allergen_id}
                className={`inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ${color}`}
              >
                {emoji} {allergen.description}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTagRemove(allergen.allergen_id);
                  }}
                  className="ml-2 text-text-light hover:text-red-600 dark:hover:text-red-400"
                  aria-label={`Remove ${allergen.description}`}
                >
                  ×
                </button>
              </span>
            );
          })
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            Exclude Allergens
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
            {staticAllergens.map((allergen) => {
              const { emoji } = getAllergenStyle(allergen.description);
              return (
                <li
                  key={allergen.allergen_id}
                  className="flex cursor-pointer items-center rounded hover:bg-background-boxLight dark:hover:bg-background-boxDark"
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedAllergens.includes(allergen.allergen_id)}
                      onChange={() =>
                        handleCheckboxChange(allergen.allergen_id)
                      }
                      className="h-4 w-4 rounded accent-accent focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                    />
                    <span className="ml-3 text-text-light dark:text-text-dark">
                      {emoji} {allergen.description}
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

export default AllergenPicker;
