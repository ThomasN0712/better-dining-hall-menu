// components/HeroSection/Pickers/DatePicker.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  selectedDate: Date | null; // Currently selected date
  onChange: (date: Date | null) => void; // Callback to update the selected date
};

const CustomDatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
}) => {
  return (
    <div className="flex flex-col items-center">
      <DatePicker
        selected={selectedDate} // The selected date
        onChange={onChange} // Update the selected date
        inline
        className="rounded-md bg-white dark:bg-dark-100 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
      />
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Select a date to view the menu.
      </p>
    </div>
  );
};

export default CustomDatePicker;
