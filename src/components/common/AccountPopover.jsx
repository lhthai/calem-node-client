import React from "react";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
// import { useAuth } from "hooks/useAuth";

const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  //   const { logout, auth } = useAuth();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {/* {auth.user.displayName} */} Le Hong Thai
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={() => {}}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

export default AccountPopover;
