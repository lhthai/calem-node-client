import HomeIcon from "@mui/icons-material/Home";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";

import { Outlet } from "react-router-dom";

// Order
import CreateOrderPage from "pages/create-order/CreateOrderPage";
import OrderListPage from "pages/order-list/OrderListPage";
import OrderDetailPage from "pages/order-list/OrderDetailPage";
import UpdateOrderPage from "pages/update-order/UpdateOrderPage";

// Quản lý
import CategoryPage from "pages/category/CategoryPage";
import ProductPage from "pages/product/ProductPage";
import OverviewPage from "pages/overview/OverviewPage";

const appRoutes = [
  {
    path: "/",
    element: <Outlet />,
    state: "order",
    sidebarProps: {
      displayText: "Order",
      icon: <HomeIcon />,
    },
    child: [
      {
        path: "/tao-order",
        element: <CreateOrderPage />,
        state: "order.tao-order",
        sidebarProps: {
          displayText: "Tạo Order",
        },
      },
      {
        path: "/danh-sach-order",
        element: <OrderListPage />,
        state: "order.danh-sach-order",
        sidebarProps: {
          displayText: "Danh sách Order",
        },
      },
      {
        path: "/chi-tiet-order",
        element: <OrderDetailPage />,
        state: "order.chi-tiet-order",
      },
      {
        path: "/chinh-sua-order",
        element: <UpdateOrderPage />,
        state: "order.chinh-sua-order",
      },
    ],
  },
  {
    path: "/quan-ly",
    element: <Outlet />,
    state: "quanly",
    sidebarProps: {
      displayText: "Quản lý",
      icon: <AppsOutlinedIcon />,
    },
    child: [
      {
        path: "/quan-ly/danh-muc",
        element: <CategoryPage />,
        state: "quan-ly.danh-muc",
        sidebarProps: {
          displayText: "Danh mục",
        },
      },
      {
        path: "/quan-ly/mon",
        element: <ProductPage />,
        state: "quan-ly.mon",
        sidebarProps: {
          displayText: "Món",
        },
      },
      {
        path: "/quan-ly/bao-cao",
        element: <OverviewPage />,
        state: "quan-ly.bao-cao",
        sidebarProps: {
          displayText: "Báo cáo",
        },
      },
    ],
  },
];

export default appRoutes;
