import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ value, name, handleSearch }) => {
  return (
    <TextField
      variant="outlined"
      label="Tìm kiếm"
      name={name}
      value={value}
      placeholder="Nhập từ khóa cần tìm"
      onChange={handleSearch}
      style={{ marginRight: 20, marginBottom: 10 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
