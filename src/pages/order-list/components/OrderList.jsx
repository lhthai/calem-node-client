import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  CircularProgress,
  Button,
} from "@mui/material";
import DetailIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import useTable from "hooks/useTable";
import { formatDatetime } from "utils";
import { SearchInput } from "components/controls";
import { useGetOrdersQuery } from "state/api/orderApi";

const headCells = [
  { id: "customerName", label: "Khách hàng" },
  { id: "address", label: "Địa chỉ" },
  { id: "phone", label: "Điện thoại" },
  { id: "total", label: "Tổng tiền" },
  { id: "createdAt", label: "Ngày đặt" },
  { id: "", label: "" },
];

const OrderList = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useGetOrdersQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter((o) => {
      return Object.keys(o).some((k) => {
        return o[k].toString().toLowerCase().indexOf(searchTerm) !== -1;
      });
    });
  }, [searchTerm, orders]);
  const [filterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, records } = useTable(
    filteredItems,
    headCells,
    filterFn
  );
  if (isLoading) return <CircularProgress />;

  return (
    <Card>
      <CardHeader title="Danh sách order" />
      <Divider />
      <CardContent>
        <Toolbar style={{ padding: 0, mb: 1 }}>
          <SearchInput
            value={searchTerm}
            handleSearch={(e) => setSearchTerm(e.target.value)}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
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
            {records().map((item, idx) => (
              <TableRow key={`OrderList-${idx}`}>
                <TableCell>{item.customerName}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.total.toLocaleString()}</TableCell>
                <TableCell>{formatDatetime(item.orderDate)}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      navigate("/chinh-sua-order", {
                        state: { order: item },
                      });
                    }}
                  >
                    <EditIcon size="small" />
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    onClick={() => {
                      navigate("/chi-tiet-order", {
                        state: { order: item },
                      });
                    }}
                  >
                    Chi tiết{"  "}
                    <DetailIcon size="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </CardContent>
    </Card>
  );
};

export default OrderList;
