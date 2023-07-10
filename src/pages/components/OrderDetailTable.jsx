import React, { useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/AddCircle";

const OrderDetailTable = ({ order, setOrder, orderDetail, setOrderDetail }) => {
  useEffect(() => {
    setOrder({
      ...order,
      total: total(),
      subTotal: subtotal(),
    });
  }, [order.discountAmount, order.shippingFee, orderDetail]);

  function totalQuantity() {
    return orderDetail
      .map(({ quantity }) => quantity)
      .reduce((sum, i) => sum + i, 0);
  }

  function subtotal() {
    return orderDetail
      .map(({ price, quantity }) => price * quantity)
      .reduce((sum, i) => sum + i, 0);
  }

  const total = () =>
    Number(subtotal()) -
    Number(order.discountAmount) +
    Number(order.shippingFee);

  const handleAddQuantity = (item) => {
    // Nếu món là món tự chọn
    if (item.categoryID === 7) {
      setOrderDetail(
        orderDetail.map((x) =>
          x._id === item._id &&
          x.productName === item.productName &&
          x.price === item.price
            ? { ...x, quantity: Number(x.quantity) + 1 }
            : x
        )
      );
    }
    // Nếu món nằm trong menu
    else {
      setOrderDetail(
        orderDetail.map((x) =>
          x._id === item._id ? { ...x, quantity: Number(x.quantity) + 1 } : x
        )
      );
    }
  };

  const handleSubtractQuantity = (item) => {
    // Nếu món là món tự chọn
    if (item.categoryID === 7) {
      if (item.quantity > 1) {
        setOrderDetail(
          orderDetail.map((x) =>
            x._id === item._id &&
            x.productName === item.productName &&
            x.price === item.price
              ? { ...x, quantity: x.quantity - 1 }
              : x
          )
        );
      } else {
        setOrderDetail(orderDetail.filter((x) => x !== item));
      }
    }
    // Nếu món nằm trong menu
    else {
      if (item.quantity > 1) {
        setOrderDetail(
          orderDetail.map((x) =>
            x.id === item.id ? { ...x, quantity: Number(x.quantity) - 1 } : x
          )
        );
      } else {
        setOrderDetail(orderDetail.filter((x) => x.id !== item.id));
      }
    }
  };

  return (
    <Table>
      <TableHead sx={{ bgcolor: "primary.main" }}>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>MÓN</TableCell>
          <TableCell>SỐ LƯỢNG</TableCell>
          <TableCell>GIÁ BÁN</TableCell>
          <TableCell>THÀNH TIỀN</TableCell>
          <TableCell></TableCell>
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
            <TableCell>{item.productName}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.price * item.quantity}</TableCell>
            <TableCell>
              <IconButton
                sx={{ color: "primary.main", marginLeft: 1 }}
                onClick={() => handleSubtractQuantity(item)}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <IconButton
                sx={{ color: "primary.main", marginLeft: 1 }}
                onClick={() => handleAddQuantity(item)}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </TableCell>
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
          <TableCell colSpan={2}>Tổng số ly</TableCell>
          <TableCell colSpan={2}>{totalQuantity()}</TableCell>
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
          <TableCell colSpan={2}>{subtotal()}</TableCell>
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
          <TableCell colSpan={2}>{order.discountAmount}</TableCell>
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
          <TableCell colSpan={2}>{order.shippingFee}</TableCell>
        </TableRow>
        <TableRow
          key="total"
          sx={{
            ".MuiTableCell-root": {
              fontWeight: 700,
            },
          }}
        >
          <TableCell colSpan={2}>Tổng tiền</TableCell>
          <TableCell colSpan={2}>{order.total}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OrderDetailTable;
