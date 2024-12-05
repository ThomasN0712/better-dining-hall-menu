import React, { useEffect } from "react";

type Location = {
  location_id: number;
  location_name: string;
};

type LocationPickerProps = {
  selectedLocationIds: number[];
  onLocationsChange: (locationIds: number[]) => void;
};

// Static locations data
const staticLocations: Location[] = [
  { location_id: 85, location_name: "Beachside" },
  { location_id: 86, location_name: "Hillside" },
  { location_id: 87, location_name: "Parkside" },
];

const LocationPicker: React.FC<LocationPickerProps> = ({
  selectedLocationIds,
  onLocationsChange,
}) => {
  // Ensure all locations are selected by default
  useEffect(() => {
    const allLocationIds = staticLocations.map(
      (location) => location.location_id
    );
    onLocationsChange(allLocationIds);
  }, [onLocationsChange]);

  const handleCheckboxChange = (locationId: number) => {
    if (selectedLocationIds.includes(locationId)) {
      onLocationsChange(selectedLocationIds.filter((id) => id !== locationId));
    } else {
      onLocationsChange([...selectedLocationIds, locationId]);
    }
  };

  return (
    <div>
      <h3 className="text-md font-medium text-text-light dark:text-text-dark">
        Select Locations
      </h3>
      <div className="flex flex-col mt-2 gap-2 space-y-1">
        {staticLocations.map((location) => (
          <label key={location.location_id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedLocationIds.includes(location.location_id)}
              onChange={() => handleCheckboxChange(location.location_id)}
              className="mr-2 accent-accent"
            />
            {location.location_name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default LocationPicker;
