// components/HeroSection/Pickers/DatePicker.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  selectedDates: Date[]; // Currently selected dates
  onChange: (dates: Date[]) => void; // Callback to update selected dates
};

const CustomDatePicker: React.FC<DatePickerProps> = ({
  selectedDates,
  onChange,
}) => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      // Add the new date if it's not already selected
      const updatedDates = selectedDates.some(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
      )
        ? selectedDates.filter(
            (selectedDate) => selectedDate.toDateString() !== date.toDateString()
          ) // Remove date if already selected
        : [...selectedDates, date]; // Add new date

      // Restrict to max 7 dates
      if (updatedDates.length <= 7) {
        onChange(updatedDates);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <DatePicker
        inline
        selected={null} // Disable default selection behavior
        onChange={handleDateChange} // Handle each selected date
        highlightDates={selectedDates} // Highlight already selected dates
        className="rounded-md bg-white dark:bg-dark-100 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
        shouldCloseOnSelect={false} // Keep calendar open for multiple selections
      />
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Select up to 7 dates
      </p>
    </div>
  );
};

export default CustomDatePicker;
