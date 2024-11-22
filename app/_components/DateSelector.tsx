
import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker, DateRange } from "@mui/x-date-pickers-pro";

interface DateSelectorProps {
  onDateRangeChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateRangeChange }) => {
  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);

  const handleDateRangeChange = (newValue: DateRange<Date>) => {
    setDateRange(newValue);
    onDateRangeChange({ startDate: newValue[0], endDate: newValue[1] });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="flex flex-col items-start space-y-4">
        <label className="text-gray-700 dark:text-gray-300 font-medium">
          Select Date Range
        </label>
        <DateRangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          slots={{
            textField: TextField,
          }}
          slotProps={{
            textField: {
              variant: "outlined",
              className: "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md",
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateSelector;
