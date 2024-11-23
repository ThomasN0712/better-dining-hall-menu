import React, { useEffect, useState } from "react";

type Allergen = {
  allergen_id: number;
  description: string;
};

type AllergenPickerProps = {
  selectedAllergens: number[];
  onAllergensChange: (allergens: number[]) => void;
};

const AllergenPicker: React.FC<AllergenPickerProps> = ({ selectedAllergens, onAllergensChange }) => {
  const [allergens, setAllergens] = useState<Allergen[]>([]);

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

  const handleCheckboxChange = (allergenId: number) => {
    if (selectedAllergens.includes(allergenId)) {
      onAllergensChange(selectedAllergens.filter((id) => id !== allergenId));
    } else {
      onAllergensChange([...selectedAllergens, allergenId]);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">Exclude Allergens</h3>
      <div className="mt-2 space-y-1">
        {allergens.map((allergen) => (
          <label key={allergen.allergen_id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedAllergens.includes(allergen.allergen_id)}
              onChange={() => handleCheckboxChange(allergen.allergen_id)}
              className="mr-2"
            />
            {allergen.description}
          </label>
        ))}
      </div>
    </div>
  );
};

export default AllergenPicker;


