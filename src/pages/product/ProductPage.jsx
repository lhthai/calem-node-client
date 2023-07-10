import React, { useState } from "react";
import { Grid } from "@mui/material";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

const ProductPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState({
    productName: "",
    price: 30000,
    cost: 0,
    categoryID: "",
    note: "",
  });

  return (
    <Grid container spacing={2}>
      <Grid item sm={4}>
        <ProductForm
          item={item}
          setItem={setItem}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Grid>
      <Grid item sm={8}>
        <ProductList
          item={item}
          setItem={setItem}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Grid>
    </Grid>
  );
};

export default ProductPage;
