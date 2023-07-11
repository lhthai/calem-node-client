import React, { useState } from "react";
import { TextField, Autocomplete, Box, Button } from "@mui/material";
import { TabPanel } from "@mui/lab";
import { useGetProductByCategoryQuery } from "state/api/productApi";

const initialState = {
  _id: "",
  productName: "",
  price: 0,
  cost: 0,
  categoryID: "",
  categoryName: "",
};

const FreshJuiceTab = ({ categoryID, addOrderDetail }) => {
  const { data: products = [] } = useGetProductByCategoryQuery(categoryID);
  const [currentProduct, setCurrentProduct] = useState(initialState);

  return (
    <TabPanel style={{ marginTop: "1rem", padding: 0 }} value={categoryID}>
      <Box sx={{ maxWidth: "80%" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addOrderDetail(currentProduct);
          }}
        >
          <Autocomplete
            getOptionLabel={(option) => option.productName}
            options={products}
            freeSolo
            onInputChange={(_, newValue) =>
              setCurrentProduct({ ...currentProduct, productName: newValue })
            }
            onChange={(_, newValue) => {
              if (newValue) {
                setCurrentProduct(newValue);
              }
            }}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Món" />}
          />
          <TextField
            required
            type="number"
            name="price"
            value={currentProduct.price}
            label="Giá"
            fullWidth
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, price: e.target.value })
            }
            margin="dense"
          />
          <Button variant="contained" sx={{ mt: 1 }} type="submit">
            Thêm món
          </Button>
        </form>
      </Box>
    </TabPanel>
  );
};

export default FreshJuiceTab;
