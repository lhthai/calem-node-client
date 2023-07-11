import React, { useState } from "react";
import { TableBody, TableRow, TableCell, IconButton } from "@mui/material";
import { TabPanel } from "@mui/lab";
import useTable from "hooks/useTable";
import AddIcon from "@mui/icons-material/Add";
import { useGetProductByCategoryQuery } from "state/api/productApi";

const headCells = [
  { id: "productName", label: "Tên món" },
  { id: "price", label: "Giá bán" },
  { id: "", label: "" },
];

const CategoryTab = ({ categoryID, addOrderDetail }) => {
  const { data: products = [] } = useGetProductByCategoryQuery(categoryID);
  const [filterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, records } = useTable(
    products,
    headCells,
    filterFn
  );
  return (
    <TabPanel style={{ marginTop: "1rem", padding: 0 }} value={categoryID}>
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
            <TableRow key={`ProductList-${idx}`}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <IconButton
                  sx={{
                    bgcolor: "primary.main",
                    marginLeft: 1,
                    color: "#FFFFFF",
                  }}
                  onClick={() => addOrderDetail(item)}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </TabPanel>
  );
};

export default CategoryTab;
