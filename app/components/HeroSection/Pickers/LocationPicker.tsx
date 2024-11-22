// components/HeroSection/Pickers/LocationPicker.tsx
import React, { useState } from "react";

type LocationPickerProps = {
  locations: string[]; // Array of available locations
  selectedLocations: string[]; // Currently selected locations
  onChange: (locations: string[]) => void; // Callback to update selected locations
};

const LocationPicker: React.FC<LocationPickerProps> = ({
  locations,
  selectedLocations,
  onChange,
}) => {
  // Handle toggle selection
  const toggleLocation = (location: string) => {
    const updatedLocations = selectedLocations.includes(location)
      ? selectedLocations.filter((loc) => loc !== location) // Remove if already selected
      : [...selectedLocations, location]; // Add if not selected
    onChange(updatedLocations);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {locations.map((location) => (
        <button
          key={location}
          onClick={() => toggleLocation(location)}
          className={`px-4 py-2 rounded border ${
            selectedLocations.includes(location)
              ? "bg-primary-light text-white border-primary-light dark:bg-primary-dark"
              : "bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-400"
          }`}
        >
          {location}
        </button>
      ))}
    </div>
  );
};

export default LocationPicker;
