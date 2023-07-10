import React from "react";
import { Grid, Button, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Grid
      container
      direction="column"
      spacing={0}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item xs={12} md={4} style={{ marginBottom: 10 }}>
        <Typography variant="h3">404 - Không tìm thấy trang!</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button variant="contained" color="primary" href="/">
          Quay về trang chủ
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
