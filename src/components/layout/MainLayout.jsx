import { Outlet } from "react-router-dom";
import { Box, Toolbar, useTheme, colors } from "@mui/material";
import { useSelector } from "react-redux";
import { sidebarWidth } from "constants";
import Sidebar from "components/common/Sidebar";
import Topbar from "components/common/Topbar";

const MainLayout = () => {
  const theme = useTheme();
  const { isSidebarOpen } = useSelector((state) => state.appState);

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Topbar />
      <Box
        component="nav"
        sx={{
          width: { lg: !isSidebarOpen ? 0 : sidebarWidth },
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
          bgcolor:
            theme.palette.mode === "light" ? colors.grey[100] : "#333333",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
