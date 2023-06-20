import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  Menu,
  Link,
  MenuItem,
  Tooltip,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { Link as LinkReactRouter, useNavigate } from "react-router-dom";

const pages = [
  { title: "Movies", path: "/movie" },
  { title: "Tv Series", path: "/tv-show" },
  { title: "Genres", path: "/movie/genre" },
  { title: "Search", path: "/movie/search" },
  { title: "Downloads", path: "/" },
];
const settings = ["Profile", "Account", "Logout"];

const TopAppBar = () => {
  const navigate = useNavigate();

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

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      <AppBar className="bg-transparent">
        <Toolbar className="flex justify-between" variant="dense">
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
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    navigate(page.path);
                  }}
                >
                  {page.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box className="flex">
            <Typography variant="h6" fontWeight="700">
              <Link component={LinkReactRouter} underline="none" to="/">
                LOGO
              </Link>
            </Typography>
            <Box className="ml-16 sm:flex hidden sm:items-center sm:gap-6">
              {pages.map((page) => (
                <Link
                  component={LinkReactRouter}
                  key={page.title}
                  className="text-white block cursor-pointer"
                  underline="none"
                  to={page.path}
                >
                  {page.title}
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
    </Slide>
  );
};

export default TopAppBar;
