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
      const updatedDates = selectedDates.length < 7
        ? [...selectedDates, date]
        : selectedDates; // Restrict to max 7 dates
      onChange(updatedDates);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <DatePicker
        selected={selectedDates[selectedDates.length - 1] || null}
        onChange={handleDateChange}
        multiple
        inline
        className="rounded-md bg-white dark:bg-dark-100 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
      />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Select up to 7 dates.
      </p>
    </div>
  );
};

export default CustomDatePicker;
