// components/HeroSection/Pickers/AllergenPicker.tsx
import React from "react";

type AllergenPickerProps = {
  allergens: string[]; // Array of available allergens
  selectedAllergens: string[]; // Currently selected allergens
  onChange: (allergens: string[]) => void; // Callback to update selected allergens
};

const AllergenPicker: React.FC<AllergenPickerProps> = ({
  allergens,
  selectedAllergens,
  onChange,
}) => {
  // Handle toggle selection
  const toggleAllergen = (allergen: string) => {
    const updatedAllergens = selectedAllergens.includes(allergen)
      ? selectedAllergens.filter((item) => item !== allergen) // Remove if already selected
      : [...selectedAllergens, allergen]; // Add if not selected
    onChange(updatedAllergens);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allergens.map((allergen) => (
        <label key={allergen} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedAllergens.includes(allergen)}
            onChange={() => toggleAllergen(allergen)}
            className="form-checkbox h-5 w-5 text-primary-light dark:text-primary-dark"
          />
          <span className="text-gray-700 dark:text-gray-400">{allergen}</span>
        </label>
      ))}
    </div>
  );
};

export default AllergenPicker;
