import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700">
        Select Date
      </label>
      <ReactDatePicker
        id="date-picker"
        selected={selectedDate}
        onChange={onDateChange}
        dateFormat="yyyy-MM-dd"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
      />
    </div>
  );
};

export default DatePicker;
