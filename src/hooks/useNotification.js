import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const useNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };

  const showMessage = (type, message) => {
    setMessage(message);
    setType(type);
    setIsOpen(true);
  };

  const Notification = () => {
    return (
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert severity={type} onClose={handleClose} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    );
  };

  return { Notification, showMessage };
};

export default useNotification;
