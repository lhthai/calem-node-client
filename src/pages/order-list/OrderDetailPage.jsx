import React from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  IconButton,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDatetime } from "utils";
import { useGetOrderDetailQuery } from "state/api/orderDetailApi";

const OrderDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const { data: orderDetail = [], isLoading } = useGetOrderDetailQuery(
    order._id
  );

  const totalQuantity = () => {
    return orderDetail
      .map(({ quantity }) => quantity)
      .reduce((sum, i) => sum + i, 0);
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Card>
      <CardHeader
        title="Order Detail"
        avatar={
          <IconButton onClick={() => navigate(-1)}>
            <BackIcon />
          </IconButton>
        }
        action={
          <Button
            sx={{ mt: 1 }}
            variant="contained"
            onClick={() =>
              navigate("/hoa-don", {
                state: { order: order },
              })
            }
          >
            Print
          </Button>
        }
        sx={{ paddingY: 1 }}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item md={6}>
            <Typography>Khách hàng: {order.customerName}</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography>Số điện thoại: {order.phone}</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography>Địa chỉ giao hàng: {order.address}</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography>Ngày đặt: {formatDatetime(order.orderDate)}</Typography>
          </Grid>
        </Grid>

        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              <TableCell>#</TableCell>
              <TableCell>DANH MỤC</TableCell>
              <TableCell>MÓN</TableCell>
              <TableCell>SỐ LƯỢNG</TableCell>
              <TableCell>ĐƠN GIÁ</TableCell>
              <TableCell>THÀNH TIỀN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              ".MuiTableCell-root": {
                maxWidth: "250px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          >
            {orderDetail.map((item, idx) => (
              <TableRow key={`OrderDetail-${idx}`}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.price * item.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                ".MuiTableCell-root": {
                  fontWeight: 700,
                },
              }}
              key="totalQty"
            >
              <TableCell rowSpan={5} />
              <TableCell rowSpan={5} />
              <TableCell rowSpan={5} />
              <TableCell colSpan={2}>Tổng số ly</TableCell>
              <TableCell>{totalQuantity()}</TableCell>
            </TableRow>
            <TableRow
              key="subtotal"
              sx={{
                ".MuiTableCell-root": {
                  fontWeight: 700,
                },
              }}
            >
              <TableCell colSpan={2}>Tạm tính</TableCell>
              <TableCell>{order.subTotal}</TableCell>
            </TableRow>
            <TableRow
              key="discount"
              sx={{
                ".MuiTableCell-root": {
                  fontWeight: 700,
                },
              }}
            >
              <TableCell colSpan={2}>Giảm giá</TableCell>
              <TableCell>{order.discountAmount}</TableCell>
            </TableRow>
            <TableRow
              key="shippingFee"
              sx={{
                ".MuiTableCell-root": {
                  fontWeight: 700,
                },
              }}
            >
              <TableCell colSpan={2}>Phí ship</TableCell>
              <TableCell>{order.shippingFee}</TableCell>
            </TableRow>
            <TableRow
              key="total"
              sx={{
                ".MuiTableCell-root": {
                  fontWeight: 700,
                },
              }}
            >
              <TableCell colSpan={2}>Thành tiền</TableCell>
              <TableCell>{order.total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderDetailPage;
