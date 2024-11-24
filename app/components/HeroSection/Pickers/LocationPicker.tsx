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
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleCheckboxChange = (locationId: number) => {
    if (selectedLocationIds.includes(locationId)) {
      onLocationsChange(selectedLocationIds.filter((id) => id !== locationId));
    } else {
      onLocationsChange([...selectedLocationIds, locationId]);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">Select Locations</h3>
      <div className="mt-2 space-y-1">
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
