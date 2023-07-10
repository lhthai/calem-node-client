import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";

const DeleteDialog = ({ open, title, handleClose, handleDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Xác nhận</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          Thoát
        </Button>
        <Button
          onClick={() => {
            handleDelete();
            handleClose();
          }}
          color="error"
          variant="contained"
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
