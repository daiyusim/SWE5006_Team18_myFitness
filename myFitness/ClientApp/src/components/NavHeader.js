import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  styled,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faUser,
  faDumbbell,
  faSignInAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./NavComponents.css";
import logo from "./Images/logo.png";
import { BaseRoutes } from "./helper/Routing";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

const NavLinkWrapper = styled(Box)(({ isActive }) => ({
  borderBottom: isActive ? "2px solid white" : "none",
  paddingBottom: "0.25rem", // Adjust padding as needed
}));

const navigationLinks = [
  { icon: faDumbbell, name: "Workouts", url: BaseRoutes.Workout },
  { icon: faCalendarCheck, name: "Events", url: BaseRoutes.Event },
  { icon: faClock, name: "Attendance", url: BaseRoutes.Attendance },
  { icon: faUser, name: "Profile", url: BaseRoutes.Profile },
];

const NavHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies("jwt");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    handleClose();
    removeCookie("jwt");
  };

  return (
    <header style={{ marginTop: "-16px" }}>
      <AppBar
        position="static"
        elevation={0}
        style={{ background: "#00272B", color: "white" }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
          <Box display="flex" alignItems="center">
            {navigationLinks.map((link) => (
              <NavLinkWrapper
                key={link.name}
                // isActive={window.location.pathname === link.url}
              >
                <Button
                  startIcon={<FontAwesomeIcon icon={link.icon} />}
                  component={NavLink}
                  to={link.url}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    ":hover": { bgcolor: "transparent" },
                  }} // Prevent background color change on hover
                >
                  {link.name}
                </Button>
              </NavLinkWrapper>
            ))}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <LogoutIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default NavHeader;
