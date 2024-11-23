// components/HeroSection/Pickers/DatePicker.tsx
import React, { useEffect, useState } from "react";

type Day = {
  day_id: number;
  day_name: string;
};

type DatePickerProps = {
  selectedDateId: number | null;
  onDateChange: (dayId: number) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({ selectedDateId, onDateChange }) => {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/days");
        const data = await response.json();
        setDays(data);
      } catch (error) {
        console.error("Error fetching days:", error);
      }
    };

    fetchDays();
  }, []);

  return (
    <div>
      <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700">
        Select Date
      </label>
      <select
        id="date-picker"
        value={selectedDateId || ""}
        onChange={(e) => onDateChange(Number(e.target.value))}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
      >
        <option value="">-- Select Date --</option>
        {days.map((day) => (
          <option key={day.day_id} value={day.day_id}>
            {day.day_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatePicker;
