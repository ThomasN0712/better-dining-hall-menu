"use client";
import React, { useState } from "react";
import CardGrid from "./_components/CardGrid";
import DateSelector from "./_components/DateSelector";
import LocationSelector from "./_components/LocationSelector";

const MenuDisplay = () => {
  // State to store the selected date range
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });

  // State to store the selected locations
  const [selectedLocations, setSelectedLocations] = useState<string[]>([
    "Beachside",
    "Hillside",
    "Parkside",
  ]);

  // Dummy data for testing
  const dummyData = [
    {
      location: "Beachside",
      mealTypes: [
        { type: "Breakfast", menuItems: [{ name: "Pancakes", allergens: ["M", "W"] }] },
        { type: "Lunch", menuItems: [{ name: "Pizza", allergens: ["M", "W"] }] },
      ],
    },
    {
      location: "Hillside",
      mealTypes: [
        { type: "Breakfast", menuItems: [{ name: "Omelette", allergens: ["E", "M"] }] },
        { type: "Lunch", menuItems: [{ name: "Sandwich", allergens: ["W"] }] },
      ],
    },
    {
      location: "Parkside",
      mealTypes: [
        { type: "Breakfast", menuItems: [{ name: "Bagels", allergens: ["W"] }] },
        { type: "Lunch", menuItems: [{ name: "Salad", allergens: [] }] },
      ],
    },
  ];

  // Handler to update the date range
  const handleDateRangeChange = (range: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(range);
    console.log("Selected Date Range:", range); // Log for debugging
  };

  // Handler to update the selected locations
  const handleLocationChange = (locations: string[]) => {
    setSelectedLocations(locations);
    console.log("Selected Locations:", locations); // Log for debugging
  };

  // Filtered data based on selected locations
  const filteredData = dummyData.filter((data) => selectedLocations.includes(data.location));

  return (
    <div className="flex flex-col items-center justify-start space-y-6 p-6 dark:bg-dark-200 bg-white">
      {/* Date Selector */}
      <DateSelector onDateRangeChange={handleDateRangeChange} />

      {/* Location Selector */}
      <LocationSelector
        locations={["Beachside", "Hillside", "Parkside"]}
        onLocationChange={handleLocationChange}
      />

      {/* Display the selected date range */}
      <div className="text-gray-700 dark:text-gray-300">
        {dateRange.startDate && dateRange.endDate
          ? `Selected: ${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
          : "Please select a date range"}
      </div>

      {/* Card Grid for displaying menus */}
      <CardGrid data={filteredData} />
    </div>
  );
};

export default MenuDisplay;
