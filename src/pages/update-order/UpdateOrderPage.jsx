import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import MenuList from "pages/components/MenuList";
import useTitle from "hooks/useTitle";
import UpdateOrder from "./components/UpdateOrder";

const UpdateOrderPage = () => {
  useTitle("Chỉnh sửa order");
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || {});
  const [orderDetail, setOrderDetail] = useState([]);

  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <UpdateOrder
          order={order}
          setOrder={setOrder}
          orderDetail={orderDetail}
          setOrderDetail={setOrderDetail}
        />
      </Grid>
      <Grid item md={6}>
        <MenuList orderDetail={orderDetail} setOrderDetail={setOrderDetail} />
      </Grid>
    </Grid>
  );
};

export default UpdateOrderPage;
