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
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "state/api/categoryApi";

const CategoryForm = ({ isEditing, setIsEditing, item, setItem }) => {
  const { showMessage, Notification } = useNotification();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await updateCategory(item).unwrap();
        showMessage("success", "Sửa danh mục thành công");
      } catch (error) {
        showMessage("error", error.data.message);
      }
    } else {
      try {
        await addCategory(item).unwrap();
        showMessage("success", "Tạo mới danh mục thành công");
      } catch (error) {
        showMessage("error", error.data.message);
      }
    }
    setItem({ ...item, categoryName: "" });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader title={`${isEditing ? "Sửa" : "Thêm"} danh mục`} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <TextField
            autoFocus
            required
            name="categoryName"
            value={item.categoryName}
            label="Tên danh mục"
            fullWidth
            onChange={(e) => setItem({ ...item, categoryName: e.target.value })}
            margin="dense"
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
                setItem({ ...item, categoryName: "" });
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

export default CategoryForm;
