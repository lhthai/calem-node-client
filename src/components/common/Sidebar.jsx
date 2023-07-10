import {
  Drawer,
  List,
  Stack,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import assets from "assets";
import { sidebarWidth } from "constants";
import { closeSidebar } from "state/appStateSlice";
import appRoutes from "routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
// import { useAuth } from "hooks/useAuth";

const Sidebar = () => {
  const dispatch = useDispatch();
  // const { auth } = useAuth();
  const { isSidebarOpen } = useSelector((state) => state.appState);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <List disablePadding>
      <Toolbar>
        <Stack sx={{ width: "100%" }} direction="row" justifyContent="center">
          <img alt="logo" src={assets.images.logo} style={{ width: 150 }} />
        </Stack>
      </Toolbar>
      {appRoutes.map((route, index) =>
        route.sidebarProps ? (
          route.child ? (
            <SidebarItemCollapse item={route} key={index} />
          ) : (
            <SidebarItem item={route} key={index} />
          )
        ) : null
      )}
    </List>
  );

  if (lgUp) {
    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
        onClose={() => dispatch(closeSidebar())}
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          backgroundColor: "#f0ed26",
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
            borderRight: "0px",
          },
          zIndex: 0,
        }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      onClose={() => dispatch(closeSidebar())}
      open={isSidebarOpen}
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        backgroundColor: "#f0ed26",
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          borderRight: "0px",
        },
        zIndex: (theme) => theme.zIndex.appBar + 100,
      }}
    >
      {content}
    </Drawer>
  );
};

export default Sidebar;
