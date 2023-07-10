import React, { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import { TabPanel } from "@mui/lab";

const initialState = {
  categoryID: 7,
  categoryName: "Món tự chọn",
  productID: 99,
  productName: "",
  quantity: 1,
  price: 0,
};

const CustomMenuTab = ({ addOrderDetail }) => {
  const [item, setItem] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <TabPanel value="7">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addOrderDetail(item);
        }}
      >
        <Grid container>
          <Grid item md={6}>
            <TextField
              autoFocus
              required
              fullWidth
              name="productName"
              value={item.productName}
              label="Tên món"
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              type="number"
              required
              fullWidth
              name="quantity"
              value={item.quantity}
              label="Số lượng"
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              type="number"
              required
              fullWidth
              name="price"
              value={item.price}
              label="Giá"
              onChange={handleChange}
              margin="dense"
            />
            <Button variant="contained" type="submit" sx={{ mt: 1 }}>
              ADD
            </Button>
          </Grid>
        </Grid>
      </form>
    </TabPanel>
  );
};

export default CustomMenuTab;
