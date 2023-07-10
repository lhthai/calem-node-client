import React, { useState } from "react";
import { Grid } from "@mui/material";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";

const CategoryPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({
    categoryName: "",
  });

  return (
    <Grid container spacing={2}>
      <Grid item lg={4}>
        <CategoryForm
          item={item}
          setItem={setItem}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Grid>
      <Grid item lg={8}>
        <CategoryList
          item={item}
          setItem={setItem}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Grid>
    </Grid>
  );
};

export default CategoryPage;
