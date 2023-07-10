import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useGetCategoriesQuery } from "state/api/categoryApi";

const CategoryDropdown = ({ value, handleChange, disabled }) => {
  const { data = [], isLoading } = useGetCategoriesQuery();

  if (isLoading) return <CircularProgress />;

  return (
    <FormControl fullWidth margin="dense" required disabled={disabled}>
      <InputLabel>Category</InputLabel>
      <Select value={value} label="Category" onChange={handleChange}>
        {data.map((item, index) => (
          <MenuItem key={index} value={`${item._id}`}>
            {item.categoryName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
