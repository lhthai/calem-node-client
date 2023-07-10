import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import React from "react";
import useNotification from "hooks/useNotification";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "state/api/productApi";
import { useGetCategoriesQuery } from "state/api/categoryApi";
import CategoryDropdown from "./CategoryDropdown";

const ProductForm = ({ isEditing, setIsEditing, item, setItem }) => {
  const { showMessage, Notification } = useNotification();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data: categories = [] } = useGetCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await updateProduct(item).unwrap();
        showMessage("success", "Sửa món thành công");
      } catch (error) {
        showMessage("error", error.data.message);
      }
    } else {
      try {
        await addProduct(item).unwrap();
        showMessage("success", "Tạo mới món thành công");
      } catch (error) {
        showMessage("error", error.data.message);
      }
    }
    setItem({
      ...item,
      productName: "",
      price: 30000,
      cost: 0,
      categoryID: categories[0]._id,
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <Card>
      <CardHeader title={`${isEditing ? "Sửa" : "Thêm"} món`} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <TextField
            autoFocus
            required
            name="productName"
            value={item.productName}
            label="Tên món"
            fullWidth
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            required
            type="number"
            name="price"
            value={item.price}
            label="Giá bán"
            fullWidth
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            required
            type="number"
            name="cost"
            value={item.cost}
            label="Giá vốn"
            fullWidth
            onChange={handleChange}
            margin="dense"
          />
          <CategoryDropdown
            value={item.categoryID}
            handleChange={(e) => {
              let curItem = categories.find(
                (x) => x._id.toString() === e.target.value.toString()
              );
              setItem({
                ...item,
                categoryID: curItem._id,
                categoryName: curItem.categoryName,
              });
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            sx={{ ml: 2 }}
            variant="contained"
            size="medium"
            type="submit"
          >
            {isEditing ? "Lưu" : "Tạo mới"}
          </Button>
          {isEditing && (
            <Button
              sx={{ ml: 5 }}
              color="inherit"
              variant="contained"
              size="medium"
              onClick={() => {
                setIsEditing(false);
                setItem({
                  ...item,
                  productName: "",
                  price: 0,
                  cost: 0,
                  categoryID: categories[0]._id,
                });
              }}
            >
              Thoát
            </Button>
          )}
        </CardActions>
      </form>
      <Notification />
    </Card>
  );
};

export default ProductForm;
