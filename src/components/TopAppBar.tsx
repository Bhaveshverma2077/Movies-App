import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  Button,
  AppBar,
  Menu,
  MenuItem,
  Tooltip,
  Link,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";

const pages = ["Movies", "Tv Series", "Downloads"];
const settings = ["Profile", "Account", "Logout"];

const TopAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color="primary" position="sticky">
      <Toolbar className="flex justify-between">
        <Box className="sm:hidden block">
          <IconButton onClick={handleOpenNavMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            open={!!anchorElNav}
            anchorEl={anchorElNav}
            onClose={handleCloseNavMenu}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
          >
            {pages.map((page) => (
              <MenuItem key={page}>{page}</MenuItem>
            ))}
          </Menu>
        </Box>
        <Box className="flex">
          <Typography variant="h6" fontWeight="700">
            LOGO
          </Typography>
          <Box className="ml-16 sm:flex hidden sm:items-center sm:gap-6">
            {pages.map((page) => (
              <Link
                key={page}
                className="text-white block cursor-pointer"
                underline="none"
              >
                {page}
              </Link>
            ))}
          </Box>
        </Box>
        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Menu
            open={!!anchorElUser}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            anchorEl={anchorElUser}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center"> {setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
