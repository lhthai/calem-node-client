import React, { useState, useMemo } from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  IconButton,
} from "@mui/material";
import { TabPanel } from "@mui/lab";
import useTable from "hooks/useTable";
import { SearchInput } from "components/controls";
import AddIcon from "@mui/icons-material/Add";
import { useGetProductByCategoryQuery } from "state/api/productApi";

const headCells = [
  { id: "productName", label: "Tên món" },
  { id: "price", label: "Giá bán" },
  { id: "", label: "" },
];

const CategoryTab = ({ categoryID, addOrderDetail }) => {
  const { data: products = [] } = useGetProductByCategoryQuery(categoryID);
  const [searchTerm, setSearchTerm] = useState("");

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };
  const filteredItems = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((o) => {
      return Object.keys(o).some((k) => {
        if (k === "name") {
          let temp = removeAccents(o[k].toString().toLowerCase());
          return temp.indexOf(searchTerm.toLowerCase()) !== -1;
        }
      });
    });
  }, [searchTerm, products]);
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
  return (
    <TabPanel style={{ marginTop: "1rem", padding: 0 }} value={categoryID}>
      <Toolbar style={{ padding: 0 }}>
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
