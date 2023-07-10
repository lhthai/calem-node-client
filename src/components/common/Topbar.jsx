import { useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountPopover from "./AccountPopover";
import { sidebarWidth } from "constants";
import { toggleThemeMode, toggleSidebar } from "state/appStateSlice";

const Topbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { isSidebarOpen } = useSelector((state) => state.appState);
  const accountRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  const getInitials = (name) => {
    return name
      .match(/(^\S\S?|\b\S)?/g)
      .join("")
      .match(/(^\S|\S$)?/g)
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <AppBar
        sx={{
          left: {
            lg: !isSidebarOpen ? 0 : sidebarWidth,
          },
          width: {
            lg: !isSidebarOpen ? "100%" : `calc(100% - ${sidebarWidth})`,
          },
          backgroundColor: "#d94c16",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={() => dispatch(toggleSidebar())}
            sx={{
              color: "#FFFFFF",
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip>
            <IconButton
              sx={{ mr: 2 }}
              onClick={() => dispatch(toggleThemeMode())}
            >
              {theme.palette.mode === "light" ? (
                <DarkModeIcon sx={{ color: "#FFFFFF" }} fontSize="medium" />
              ) : (
                <LightModeIcon sx={{ color: "#FFFFFF" }} fontSize="medium" />
              )}
            </IconButton>
          </Tooltip>
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={accountRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
              mr: 2,
              bgcolor: "#FFFFFF",
              color: "primary.main",
            }}
          >
            {getInitials("Thai Le")}
          </Avatar>
        </Toolbar>
      </AppBar>
      <AccountPopover
        anchorEl={accountRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

export default Topbar;
