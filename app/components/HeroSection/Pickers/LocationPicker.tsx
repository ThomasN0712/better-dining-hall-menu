// LocationPicker.tsx
import React, { useEffect, useState } from "react";

type Location = {
  location_id: number;
  location_name: string;
};

type LocationPickerProps = {
  selectedLocationId: number | null;
  onLocationChange: (locationId: number) => void;
};

const LocationPicker: React.FC<LocationPickerProps> = ({ selectedLocationId, onLocationChange }) => {
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

  return (
    <div>
      <label htmlFor="location">Select Location:</label>
      <select
        id="location"
        value={selectedLocationId || ""}
        onChange={(e) => onLocationChange(Number(e.target.value))}
      >
        <option value="">-- Select Location --</option>
        {locations.map((location) => (
          <option key={location.location_id} value={location.location_id}>
            {location.location_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationPicker;
