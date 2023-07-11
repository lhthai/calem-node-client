import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import AddIcon from "@mui/icons-material/AddCircle";
import UpIcon from "@mui/icons-material/ArrowCircleUp";
import NoteIcon from "@mui/icons-material/NoteAdd";
import NoteDialog from "./NoteDialog";

const OrderDetailTable = ({ order, setOrder, orderDetail, setOrderDetail }) => {
  const [openNoteDialog, setOpenNoteDialog] = useState({
    open: false,
    item: null,
  });

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
    setOrderDetail(
      orderDetail.map((x) =>
        x.productName === item.productName
          ? { ...x, quantity: Number(x.quantity) + 1 }
          : x
      )
    );
  };

  const handleSubtractQuantity = (item) => {
    if (item.quantity > 1) {
      setOrderDetail(
        orderDetail.map((x) =>
          x.productName === item.productName
            ? { ...x, quantity: Number(x.quantity) - 1 }
            : x
        )
      );
    } else {
      setOrderDetail(
        orderDetail.filter((x) => x.productName !== item.productName)
      );
    }
  };

  const handleUpsize = (item) => {
    setOrderDetail(
      orderDetail.map((x) =>
        x.productName === item.productName
          ? {
              ...x,
              price: Number(x.price) + 5000,
              productName:
                x.productName.indexOf("big size") > 0
                  ? x.productName
                  : x.productName + " big size",
            }
          : x
      )
    );
  };

  const handleAddNote = (item) => {};

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
              <Tooltip title="Giảm">
                <IconButton
                  sx={{ color: "primary.main", marginLeft: 1 }}
                  onClick={() => handleSubtractQuantity(item)}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Thêm">
                <IconButton
                  sx={{ color: "primary.main", marginLeft: 1 }}
                  onClick={() => handleAddQuantity(item)}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Up size">
                <IconButton
                  sx={{ color: "primary.main", marginLeft: 1 }}
                  onClick={() => handleUpsize(item)}
                >
                  <UpIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Ghi chú">
                <IconButton
                  sx={{ color: "primary.main", marginLeft: 1 }}
                  onClick={() => setOpenNoteDialog({ open: true, item: item })}
                >
                  <NoteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
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
      <NoteDialog
        open={openNoteDialog.open}
        handleClose={() => setOpenNoteDialog(false)}
        orderDetail={orderDetail}
        setOrderDetail={setOrderDetail}
        item={openNoteDialog.item}
      />
    </Table>
  );
};

export default OrderDetailTable;
