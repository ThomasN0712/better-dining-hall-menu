// src/components/DateSelector.tsx
import { useState } from "react";

interface DateSelectorProps {
  onDateChange: (date: string) => void; // Callback to send selected date to the parent component
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onDateChange(newDate); // Send selected date to the parent component
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <label
        htmlFor="date"
        className="text-gray-700 dark:text-gray-300 font-medium"
      >
        Select Date
      </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
      />
    </div>
  );
};

export default DateSelector;
