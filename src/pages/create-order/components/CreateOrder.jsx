import React from "react";
import dayjs from "dayjs";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import OrderDetailTable from "../../components/OrderDetailTable";
import useNotification from "hooks/useNotification";
import { useAddOrderMutation } from "state/api/orderApi";
import { CustomDatePicker } from "components/controls";

const CreateOrder = ({
  order,
  setOrder,
  clearOrder,
  orderDetail,
  setOrderDetail,
}) => {
  const { showMessage, Notification } = useNotification();
  const [addOrder] = useAddOrderMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOrder({
        customerName: order.customerName,
        address: order.address,
        phone: order.phone,
        discountAmount: Number(order.discountAmount),
        shippingFee: Number(order.shippingFee),
        subTotal: order.subTotal,
        total:
          Number(order.subTotal) -
          Number(order.discountAmount) +
          Number(order.shippingFee),
        orderDate: order.orderDate,
        orderDetails: orderDetail,
      }).unwrap();
      showMessage("success", "Thêm mới order thành công");
      clearOrder();
    } catch (error) {
      //  console.log()
      showMessage("error", error.data.message);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader
          title="Tạo mới order"
          action={
            <Button variant="outlined" type="submit">
              Đặt món
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
          {orderDetail.length <= 0 ? (
            <Typography variant="body1" sx={{ my: 2 }}>
              Chưa có món nào
            </Typography>
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

export default CreateOrder;
