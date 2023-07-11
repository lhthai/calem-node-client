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
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useTable from "hooks/useTable";
import useTitle from "hooks/useTitle";
import useNotification from "hooks/useNotification";
import { formatDatetime } from "utils";
import { SearchInput, DeleteDialog } from "components/controls";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "state/api/categoryApi";

const headCells = [
  { id: "_id", label: "ID" },
  { id: "categoryName", label: "Tên danh mục" },
  { id: "createdAt", label: "Ngày tạo" },
  { id: "", label: "" },
];

const CategoryList = ({ setIsEditing, setItem }) => {
  useTitle("Quản lý - Danh mục");
  const { showMessage } = useNotification();
  const { data = [], isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    item: null,
  });

  const filteredItems = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((o) => {
      return Object.keys(o).some((k) => {
        return o[k].toString().toLowerCase().indexOf(searchTerm) !== -1;
      });
    });
  }, [searchTerm, data]);
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

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      showMessage("success", "Đã xóa thành công");
    } catch (error) {
      showMessage("error", error.message);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Card>
      <CardHeader title="Danh sách danh mục" />
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
                maxWidth: "180px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          >
            {records().map((item, idx) => (
              <TableRow key={`Categories-${idx}`}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>{formatDatetime(item.createdAt)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsEditing(true);
                      setItem(item);
                    }}
                    variant="outlined"
                  >
                    <EditIcon />
                  </Button>
                  <IconButton
                    sx={{ color: "error.main", marginLeft: 1 }}
                    onClick={() => setDeleteDialog({ open: true, item: item })}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </CardContent>
      <DeleteDialog
        open={deleteDialog.open}
        title="Vui lòng xác nhận bạn muốn xóa danh mục này?"
        handleClose={() => setDeleteDialog({ open: false, item: null })}
        handleDelete={() => handleDelete(deleteDialog.item._id)}
      />
    </Card>
  );
};

export default CategoryList;
