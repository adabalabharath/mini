import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import miniLogo from "../assets/OIP (4).jpeg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "./AuthProvider";
const pages = ["Men", "Women", "Kids", "Home", "Beauty"];
const settings = ["Profile", "Wishlist", "Bag"];
const settingsIcons = [
  <PersonIcon />,
  <FavoriteBorderIcon />,
  <LocalMallIcon />,
];
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const {logout}=useContext(AuthContext);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
const navigation=useNavigate();
  
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          //alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center",cursor:'pointer' }} onClick={() => navigation('/')}>
          <img
            style={{ height: "70px", width: "80px" }}
            src={miniLogo}
            alt="mini-logo"
          />
          <Typography
            variant="h6"
            sx={{
              ml: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "fantasy",
              fontWeight: 700,
            }}
          >
            MINI
          </Typography>
        </Box>

        {/* Nav Pages */}
        <Box sx={{ gap: 3, display: { xs: "none", sm: "none", md: "flex" } }}>
          {pages.map((p,i) => (
            <Link
              to={`/shop-${p.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
               key={i}
            >
              <Typography
               
                sx={{ fontFamily: "cursive", cursor: "pointer" }}
                variant="subtitle1"
              >
                {p}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Search Bar */}
        <Box sx={{ flex: 1, maxWidth: 400, mx: 1 }}>
          <TextField
            placeholder="Search products..."
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
        <Button onClick={() => setDrawerOpen(true)}>
          <MenuIcon sx={{ display: { xs: "block", md: "none" ,color:'black'} }} />
        </Button>
        <Drawer
  anchor="right"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
>
  <Box
    sx={{
      width: 250,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    {/* Top Menu */}
    <List>
      {settings.map((p, i) => (
        <ListItem button key={i} component={Link} to={p.toLowerCase()}>
          <ListItemIcon>{settingsIcons[i]}</ListItemIcon>
          <ListItemText primary={p} sx={{ color: "black" }} />
        </ListItem>
      ))}
    </List>

    {/* Logout at bottom */}
  {localStorage.getItem('loggedInUser')!==null &&  <Box sx={{ mt: "auto", mb: 2 }}>
      <Button
        onClick={logout}
        sx={{
          textTransform: "none",
          color: "black",
          width: "100%",
          justifyContent: "flex-start",
        }}
      >
        <LogoutIcon sx={{ mr: 1 }} />
        <Typography>Logout</Typography>
      </Button>
    </Box>}
  </Box>
</Drawer>

        {/* Icons Section */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            justifyContent: "center",
          }}
        >
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PersonIcon />
              <Typography variant="caption">Profile</Typography>
            </Box>
          </Link>
          <Link
            to="/wishlist"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FavoriteBorderIcon />
              <Typography variant="caption">Wishlist</Typography>
            </Box>
          </Link>

          <Link to="/bag" style={{ textDecoration: "none", color: "inherit" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LocalMallIcon />
              <Typography variant="caption">Bag</Typography>
            </Box>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
