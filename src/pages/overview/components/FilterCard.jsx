import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { CustomDatePicker } from "components/controls";

const FilterCard = ({ fromDate, setFromDate, toDate, setToDate }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Bộ lọc" />
      <CardContent>
        <CustomDatePicker
          value={fromDate}
          label="Từ ngày"
          handleChange={(value) => setFromDate(value)}
        />
        <CustomDatePicker
          value={toDate}
          label="Đến ngày"
          handleChange={(value) => setToDate(value)}
        />
      </CardContent>
    </Card>
  );
};

export default FilterCard;
