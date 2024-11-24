import React, { useEffect, useState } from "react";

type Allergen = {
  allergen_id: number;
  description: string;
};

type AllergenPickerProps = {
  selectedAllergens: number[];
  onAllergensChange: (allergens: number[]) => void;
};

const AllergenPicker: React.FC<AllergenPickerProps> = ({
  selectedAllergens,
  onAllergensChange,
}) => {
  const [allergens, setAllergens] = useState<Allergen[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/allergens");
        const data = await response.json();
        setAllergens(data);
      } catch (error) {
        console.error("Error fetching allergens:", error);
      }
    };

    fetchAllergens();
  }, []);

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

  // Get allergen descriptions for the selected IDs
  const selectedAllergenDescriptions = selectedAllergens
    .map((id) => allergens.find((allergen) => allergen.allergen_id === id)?.description)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="relative">
      <div className="mb-3 text-text-light dark:text-text-dark"> Exclude Allergen </div>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="w-full bg-background-cardLight dark:bg-background-cardDark text-text-light dark:text-text-dark border border-background-borderLight dark:border-background-borderDark rounded-md px-4 py-2 text-left shadow-sm flex justify-between items-center"
      >
        <span>
          {selectedAllergenDescriptions.length > 0
            ? selectedAllergenDescriptions
            : "Select Allergens"}
        </span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
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
            {allergens.map((allergen) => (
              <li key={allergen.allergen_id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAllergens.includes(allergen.allergen_id)}
                  onChange={() => handleCheckboxChange(allergen.allergen_id)}
                  className="w-4 h-4 text-primary-light dark:text-primary-dark focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:outline-none rounded"
                />
                <span className="ml-3 text-text-light dark:text-text-dark">
                  {allergen.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllergenPicker;
