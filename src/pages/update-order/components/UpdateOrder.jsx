import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import OrderDetailTable from "../../components/OrderDetailTable";
import { CustomDatePicker } from "components/controls";
import useNotification from "hooks/useNotification";
import { useUpdateOrderMutation } from "state/api/orderApi";
import { useGetOrderDetailQuery } from "state/api/orderDetailApi";

const UpdateOrder = ({ order, setOrder, orderDetail, setOrderDetail }) => {
  const navigate = useNavigate();
  const { data: orderDetails = [] } = useGetOrderDetailQuery(order._id);
  const [updateOrder] = useUpdateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage, Notification } = useNotification();

  useEffect(() => {
    setIsLoading(true);
    if (orderDetails) {
      setOrderDetail(orderDetails);
    }
    setIsLoading(false);
  }, [orderDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrder({
        order,
        orderDetails: orderDetail.map(
          ({ id, orderID, createdDate, ...props }) => props
        ),
      }).unwrap();
      showMessage("success", "Chỉnh sửa order thành công");
      navigate("/danh-sach-order");
    } catch (error) {
      showMessage("error", error.data.message);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader
          title={`Chỉnh sửa order #${order._id}`}
          action={
            <Button variant="outlined" type="submit">
              Lưu
            </Button>
          }
        />
        <Divider />
        <CardContent>
          <TextField
            sx={{ width: "50%", paddingRight: 1 }}
            autoFocus
            required
            name="customerName"
            value={order.customerName}
            label="Tên khách hàng"
            onChange={(e) =>
              setOrder({ ...order, customerName: e.target.value })
            }
            margin="dense"
          />

          <Box
            sx={{ mt: 1 }}
            display="grid"
            gridTemplateRows="auto"
            gridTemplateColumns="repeat(2, 1fr)"
            gap="1rem"
          >
            <TextField
              name="phone"
              value={order.phone}
              label="Số điện thoại người nhận"
              onChange={(e) => setOrder({ ...order, phone: e.target.value })}
            />
            <CustomDatePicker
              value={dayjs(new Date(order.orderDate))}
              required={false}
              label="Ngày đặt"
              disabled={false}
              handleChange={(value) => {
                setOrder({
                  ...order,
                  orderDate: dayjs(new Date(value)).format(
                    "YYYY-MM-DDThh:mm:ss"
                  ),
                });
              }}
            />
            <TextField
              name="discount"
              type="number"
              value={order.discountAmount}
              label="Giảm giá"
              onChange={(e) =>
                setOrder({ ...order, discountAmount: e.target.value })
              }
            />
            <TextField
              name="shippingFee"
              type="number"
              value={order.shippingFee}
              label="Phí ship"
              onChange={(e) =>
                setOrder({ ...order, shippingFee: e.target.value })
              }
            />
            <TextField
              sx={{ gridColumn: "1/3" }}
              multiline
              rows={2}
              name="address"
              value={order.address}
              label="Địa chỉ giao hàng"
              onChange={(e) => setOrder({ ...order, address: e.target.value })}
            />
          </Box>

          <Typography variant="h6" sx={{ my: 2 }}>
            Danh sách món
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <OrderDetailTable
              order={order}
              setOrder={setOrder}
              orderDetail={orderDetail}
              setOrderDetail={setOrderDetail}
            />
          )}
          <Divider />
        </CardContent>
      </form>
      <Notification />
    </Card>
  );
};

export default UpdateOrder;
