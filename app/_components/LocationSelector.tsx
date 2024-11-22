import React, { useState } from "react";

interface LocationSelectorProps {
  locations: string[]; // Array of location names (e.g., ["Beachside", "Hillside", "Parkside"])
  onLocationChange: (selectedLocations: string[]) => void; // Callback to notify parent of selected locations
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  locations,
  onLocationChange,
}) => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>(locations); // Default: All locations selected

  const handleLocationToggle = (location: string) => {
    const isSelected = selectedLocations.includes(location);
    const updatedLocations = isSelected
      ? selectedLocations.filter((loc) => loc !== location)
      : [...selectedLocations, location];

    setSelectedLocations(updatedLocations);
    onLocationChange(updatedLocations); // Notify parent of updated selection
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Select Location
      </h2>
      <div className="space-y-2">
        {locations.map((location) => (
          <label
            key={location}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedLocations.includes(location)}
              onChange={() => handleLocationToggle(location)}
              className="form-checkbox h-5 w-5 text-green-600 bg-gray-200 rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-gray-800 dark:text-gray-200">{location}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
