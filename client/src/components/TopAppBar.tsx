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
  LinearProgress,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import {
  Link as LinkReactRouter,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { userActions } from "../store/users-slice";

const pages = [
  { title: "Movies", path: "/movie" },
  { title: "Tv Series", path: "/tv-show" },
  { title: "Genres", path: "/movie/genre" },
  { title: "Search", path: "/movie/search" },
];
const settings = [
  {
    name: "Profile",
    handler: () => {},
  },
  {
    name: "Account",
    handler: () => {},
  },
  {
    name: "Logout",
    handler: () => {
      store.dispatch(userActions.logoutUser());
    },
  },
];

const TopAppBar = () => {
  // To set active NavLink Style
  const pathName = useLocation().pathname;

  const [activeNavLinkIndex, setActiveNavLinkIndex] = useState<
    null | 0 | 1 | 2 | 3
  >(null);

  useEffect(() => {
    if (pathName == "/movie" || pathName == "/movie" + "/") {
      setActiveNavLinkIndex(0);
    } else if (pathName == "/tv-show" || pathName == "/tv-show" + "/") {
      setActiveNavLinkIndex(1);
    } else if (
      pathName.startsWith("/movie/genre") ||
      pathName.startsWith("/tv-show/genre")
    ) {
      setActiveNavLinkIndex(2);
    } else if (
      pathName.startsWith("/movie/search") ||
      pathName.startsWith("/tv-show/search")
    ) {
      setActiveNavLinkIndex(3);
    } else {
      setActiveNavLinkIndex(null);
    }
  }, [pathName]);
  //******************************/

  const isLoading = useSelector(
    (state: RootState) => state.others.appBarLoading
  );

  const user = useSelector((state: RootState) => state.users.userId);

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

  const handleCloseUserMenu = (handler?: () => void) => {
    setAnchorElUser(null);
    if (handler) {
      handler();
    }
  };

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      <AppBar className="bg-black bg-opacity-80">
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
                M Flix
              </Link>
            </Typography>
            <Box className="ml-16 sm:flex hidden sm:items-center sm:gap-6">
              {pages.map((page, i) => (
                <Link
                  component={LinkReactRouter}
                  key={page.title}
                  className={`text-white block cursor-pointer transition-transform ${
                    activeNavLinkIndex === i ? "text-[#e03131]" : ""
                  }`}
                  underline="none"
                  to={page.path}
                >
                  {page.title}
                </Link>
              ))}
            </Box>
          </Box>
          <Box>
            {user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Link
                component={LinkReactRouter}
                onClick={() => {
                  store.dispatch(userActions.logoutUser());
                }}
                className="cursor-pointer block border-[1px] text-base border-solid py-0 px-2 text-[#e03131] hover:bg-[#e03131] hover:text-zinc-200 transition-colors border-[#e03131]"
                underline="none"
                to={"/login"}
              >
                Login
              </Link>
            )}

            <Menu
              open={!!anchorElUser}
              className="bg-transparent"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              anchorEl={anchorElUser}
              onClose={() => handleCloseUserMenu()}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => handleCloseUserMenu(setting.handler)}
                >
                  <Typography textAlign="center"> {setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        {isLoading && <LinearProgress />}
      </AppBar>
    </Slide>
  );
};

export default TopAppBar;
