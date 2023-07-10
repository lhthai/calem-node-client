import React, { useState } from "react";
import { Grid } from "@mui/material";
import CreateOrder from "./components/CreateOrder";
import MenuList from "../components/MenuList";
import useTitle from "hooks/useTitle";
import dayjs from "dayjs";

const initialState = {
  customerName: "",
  phone: "",
  address: "",
  discountAmount: 0,
  shippingFee: 0,
  subTotal: 0,
  total: 0,
  orderDate: dayjs(),
};

const CreateOrderPage = () => {
  useTitle("Tạo order");
  const [order, setOrder] = useState(initialState);
  const [orderDetail, setOrderDetail] = useState([]);

  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <CreateOrder
          order={order}
          setOrder={setOrder}
          orderDetail={orderDetail}
          setOrderDetail={setOrderDetail}
          clearOrder={() => {
            setOrder(initialState);
            setOrderDetail([]);
          }}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <MenuList orderDetail={orderDetail} setOrderDetail={setOrderDetail} />
      </Grid>
    </Grid>
  );
};

export default CreateOrderPage;
