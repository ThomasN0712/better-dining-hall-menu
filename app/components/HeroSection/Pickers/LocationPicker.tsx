import React, { useEffect, useState } from "react";

type Location = {
  location_id: number;
  location_name: string;
};

type LocationPickerProps = {
  selectedLocationIds: number[];
  onLocationsChange: (locationIds: number[]) => void;
};

const LocationPicker: React.FC<LocationPickerProps> = ({
  selectedLocationIds,
  onLocationsChange,
}) => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/locations");
        const data = await response.json();
        setLocations(data);

        // Select all locations by default
        const allLocationIds = data.map(
          (location: Location) => location.location_id
        );
        onLocationsChange(allLocationIds);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
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
      <div className="flex flex-col xl:flex-row mt-2 gap-2 space-y-1">
        {locations.map((location) => (
          <label key={location.location_id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedLocationIds.includes(location.location_id)}
              onChange={() => handleCheckboxChange(location.location_id)}
              className="mr-2"
            />
            {location.location_name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default LocationPicker;
