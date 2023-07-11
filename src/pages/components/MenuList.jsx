import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  Tab,
} from "@mui/material";
import { TabContext, TabList } from "@mui/lab";

import CategoryTab from "./CategoryTab";
import FreshJuiceTab from "./FreshJuiceTab";

const MenuList = ({ orderDetail, setOrderDetail }) => {
  const [categoryID, setCategoryID] = useState("6499af08a0cbda6616877ec5");

  const addOrderDetail = (product) => {
    // Nếu item đã có trong list order detail => chỉ update quantity
    let index = orderDetail.findIndex(
      (x) => x.productName === product.productName
    );
    if (index >= 0) {
      setOrderDetail(
        orderDetail.map((item) =>
          item.productName === product.productName
            ? { ...item, quantity: Number(item.quantity) + 1 }
            : item
        )
      );
    }
    // Nếu item chưa có trong list order detail => thêm item vào list
    else {
      setOrderDetail([
        ...orderDetail,
        {
          productID: product._id,
          productName: product.productName,
          categoryID: product.categoryID,
          categoryName: product.categoryName,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
  };

  // if (isLoading) return <CircularProgress />;

  return (
    <Card sx={{ maxWidth: "90vw" }}>
      <CardHeader title="Danh sách món" />
      <Divider />
      <CardContent>
        <TabContext value={categoryID}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList
              onChange={(_, newValue) => setCategoryID(newValue)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Cà phê" value="6499af08a0cbda6616877ec5" />
              <Tab label="Trà sữa" value="6499af13a0cbda6616877ec9" />
              <Tab label="Trà trái cây" value="6499af1aa0cbda6616877ecc" />
              <Tab label="Nước ép" value="64aa294664f579e7ad6ba4b1" />
            </TabList>
          </Box>
          {categoryID !== "64aa294664f579e7ad6ba4b1" && (
            <CategoryTab
              categoryID={categoryID}
              addOrderDetail={addOrderDetail}
            />
          )}
          {categoryID === "64aa294664f579e7ad6ba4b1" && (
            <FreshJuiceTab
              categoryID={categoryID}
              addOrderDetail={addOrderDetail}
            />
          )}
        </TabContext>
      </CardContent>
    </Card>
  );
};

export default MenuList;
