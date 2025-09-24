import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import miniLogo from "../../public/images/logo.jpeg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "./AuthProvider";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SellIcon from "@mui/icons-material/Sell";
import { ListItemButton } from "@mui/material";
const pages = ["Men", "Women", "Kids", "Home", "Beauty"];
const settings = ["Profile", "Wishlist", "Bag", "Orders"];
const settingsIcons = [
  <PersonIcon />,
  <FavoriteBorderIcon />,
  <LocalMallIcon />,
  <SellIcon />,
];
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  const [logoutDialog, setLogoutDialog] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const products = useSelector((store) => store.products);
  const options = products.filter((x) =>
    x.productName.toLowerCase().includes(search)
  );
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const navigation = useNavigate();
  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        display: "flex",

        justifyContent: "space-between",
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigation("/")}
        >
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
        <Box
          sx={{
            gap: 3,
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
            },
          }}
        >
          {pages.map((p, i) => (
            <Link
              to={`/shop/${p.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
              key={i}
            >
              <Typography sx={{ cursor: "pointer" }} variant="subtitle1">
                {p}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Search Bar */}
        <Box sx={{ flex: 1, maxWidth: 400 }}>
          <Autocomplete
            freeSolo
            options={search ? options.map((p) => p.productName) : []}
            value={search}
            disableClearable={!search}
            onChange={(event, newValue) => {
              if (newValue && newValue.trim() !== "") {
                setSearch(newValue);
                navigation(`/product/${newValue}`);
                setSearch("");
              }
            }}
            onInputChange={(event, newInputValue) => setSearch(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Products..."
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                    fontFamily: "fantasy",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                    fontFamily: "fantasy",
                  },
                }}
              />
            )}
          />
        </Box>
        <Button
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { xs: "block", md: "none", color: "black" } }}
        >
          <MenuIcon />
        </Button>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
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
            <List>
              {settings.map((p, i) => (
                <ListItemButton key={i} component={Link} to={p.toLowerCase()}>
                  {i == 2 ? (
                    <ListItemIcon sx={{ color: "black" }}>
                      <Badge
                        badgeContent={user?.bag?.filter(x=>!x.buyNow).length}
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: "black",
                            color: "white",
                          },
                        }}
                      >
                        {settingsIcons[i]}
                      </Badge>
                    </ListItemIcon>
                  ) : (
                    <ListItemIcon sx={{ color: "black" }}>
                      {settingsIcons[i]}
                    </ListItemIcon>
                  )}
                  <ListItemText primary={p} sx={{ color: "black" }} />
                </ListItemButton>
              ))}
            </List>

            {/* Logout at bottom */}
            {user && (
              <Box sx={{ mt: "auto", mb: 2 }}>
                <Button
                  onClick={() => setLogoutDialog(true)}
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
              </Box>
            )}
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
              <Badge
                badgeContent={user?.bag?.filter(x=>!x.buyNow).length}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
              >
                <LocalMallIcon />
              </Badge>
              <Typography variant="caption">Bag</Typography>
            </Box>
          </Link>

          <Dialog
            open={logoutDialog}
            onClose={() => setLogoutDialog(false)}
            sx={{ borderRadius: 5 }}
          >
            <DialogContent>
              <Typography>Are you sure, you want to Logout?</Typography>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => {
                  logout(user), setLogoutDialog(false);
                }}
                sx={{
                  mb: 2,
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Yes
              </Button>
              <Button
                onClick={() => setLogoutDialog(false)}
                sx={{
                  mb: 2,
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                }}
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
