import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  CircularProgress,
  Box,
  Tab,
} from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useGetCategoriesQuery } from "state/api/categoryApi";

import CategoryTab from "./CategoryTab";
import CustomMenuTab from "./CustomMenuTab";

const MenuList = ({ orderDetail, setOrderDetail }) => {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [categoryID, setCategoryID] = useState("6499af08a0cbda6616877ec5");

  const addOrderDetail = (product) => {
    // Danh cho món tự chọn
    if (product.categoryID === 7) {
      let index = orderDetail.findIndex(
        (x) =>
          x.productID === product.productID &&
          x.productName === product.productName &&
          Number(x.price) === Number(product.price)
      );
      // Nếu item đã có trong list order detail => chỉ update quantity
      if (index >= 0) {
        setOrderDetail(
          orderDetail.map((item) =>
            item.productID === product.productID &&
            item.productName === product.productName &&
            Number(item.price) === Number(product.price)
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
            ...product,
          },
        ]);
      }
    }
    // Dành cho món có trong menu
    else {
      // Nếu item đã có trong list order detail => chỉ update quantity
      let index = orderDetail.findIndex((x) => x.productID === product._id);
      if (index >= 0) {
        setOrderDetail(
          orderDetail.map((item) =>
            item.productID === product._id
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
            // _id: product._id,
            productID: product._id,
            productName: product.productName,
            categoryID: product.categoryID,
            categoryName: product.categoryName,
            price: product.price,
            quantity: 1,
          },
        ]);
      }
    }
  };

  if (isLoading) return <CircularProgress />;

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
              {categories.map((category, index) => (
                <Tab
                  key={index}
                  label={category.categoryName}
                  value={`${category._id}`}
                />
              ))}
            </TabList>
          </Box>
          {categoryID !== "7" && (
            <CategoryTab
              categoryID={categoryID}
              addOrderDetail={addOrderDetail}
            />
          )}

          {categoryID === "7" && (
            <CustomMenuTab addOrderDetail={addOrderDetail} />
          )}
        </TabContext>
      </CardContent>
    </Card>
  );
};

export default MenuList;
