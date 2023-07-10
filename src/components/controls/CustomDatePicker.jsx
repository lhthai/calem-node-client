import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CustomDatePicker = ({ value, label, handleChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ mb: 2, width: "100%" }}
        label={label}
        value={value}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
