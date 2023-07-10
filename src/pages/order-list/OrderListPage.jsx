import React from "react";
import { Grid } from "@mui/material";
import OrderList from "./components/OrderList";
import useTitle from "hooks/useTitle";

const OrderListPage = () => {
  useTitle("Danh sách order");

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <OrderList />
      </Grid>
    </Grid>
  );
};

export default OrderListPage;
