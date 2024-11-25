import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  selectedDate: Date | null; // Allow null as ReactDatePicker can pass null
  onDateChange: (date: Date | null) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className="relative">
      <label
        htmlFor="date-picker"
        className="block text-sm font-medium text-headingLight dark:text-headingDark"
      >
        Select Date
      </label>
      <ReactDatePicker
        id="date-picker"
        selected={selectedDate}
        onChange={(date) => onDateChange(date)} // Ensure null is handled
        dateFormat="MM-dd-yyyy"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-background-borderLight dark:border-background-borderDark bg-background-boxLight dark:bg-background-boxDark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark sm:text-sm rounded-md shadow-sm"
      />
    </div>
  );
};

export default DatePicker;
