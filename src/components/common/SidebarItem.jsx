import {
  ListItemButton,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeSidebar } from "state/appStateSlice";

const SidebarItem = ({ item }) => {
  const dispatch = useDispatch();
  const { appState } = useSelector((state) => state.appState);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  return item.sidebarProps && item.path ? (
    <ListItemButton
      onClick={() => {
        if (!lgUp) dispatch(closeSidebar());
      }}
      component={Link}
      to={item.path}
      sx={{
        "&: hover": {
          backgroundColor: "#e3511a",
          color: "#FFFFFF",
        },
        backgroundColor:
          appState === item.state ? "#e3511a" : "unset",
        color: appState === item.state ? "#FFFFFF" : "unset",
        paddingY: "12px",
        paddingX: "24px",
      }}
    >
      <ListItemIcon
        sx={{ color: appState === item.state ? "#FFFFFF" : "primary.main" }}
      >
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      {item.sidebarProps.displayText}
    </ListItemButton>
  ) : null;
};

export default SidebarItem;
