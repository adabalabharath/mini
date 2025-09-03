import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Filters from "./Filters";
import TuneIcon from "@mui/icons-material/Tune";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "./AuthProvider";
import NoItems from "./NoItems";

const Page = ({ products }) => {
  const [drawerFilters, setDrawerFilters] = useState(false);
  const [fav, setFav] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCart = (item) => {
    let exists = user?.bag.find((x) => x.id === item.id);
    if (!user) {
      navigate("/profile");
    } else {
      const updatedUser = exists
        ? {
            ...user,
            bag: user?.bag.filter((x) => x.id !== item.id),
          }
        : { ...user, bag: [...user?.bag, item] };
      console.log(updatedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const handleFav = (product) => {
    setFav(true);
    let exists = user?.wishlist.find((x) => x.id === product.id);
    if (!user) {
      navigate("/profile");
    }
    const updatedUser = exists
      ? {
          ...user,
          wishlist: user?.wishlist.filter((x) => x.id !== product.id),
        }
      : { ...user, wishlist: [...user?.wishlist, product] };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <Grid container sx={{ mt: 2, justifyContent: "space-between" }}>
      <Grid size={2.5} sx={{ display: { xs: "none", md: "block" } }}>
        <Filters />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 12, md: 9.5 }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Grid
          size={12}
          sx={{
            display: {
              xs: "block",
              md: "none",
              lg: "none",
              textAlign: "center",
            },
          }}
        >
          {products.length > 0 && (
            <Button
              variant="filled"
              fullWidth
              sx={{ textTransform: "none" }}
              onClick={() => setDrawerFilters(true)}
            >
              <TuneIcon /> Apply Filters
            </Button>
          )}
          <Drawer
            anchor="left"
            open={drawerFilters}
            onClose={() => setDrawerFilters(false)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <Filters />
          </Drawer>
        </Grid>

        {products.length ? (
          <Grid container size={12} rowSpacing={5} columnSpacing={3}>
            {products?.map((product) => (
              <Grid
                size={{
                  xs: 6,
                  sm: 6,
                  md: 2,
                }}
                key={product.id}
                sx={{
                  border: "1px solid white",
                  p: 2,
                  height: 500,
                  flexWrap: "wrap",
                  position: "relative",
                }}
              >
                <Link
                  to={`/productId/${product.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      pointerEvents: fav ? "auto" : "none",
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      style={{
                        width: "100%",
                        height: 220,

                        borderRadius: 8,
                      }}
                    />
                  </Box>
                  <Grid
                    container
                    height={220}
                    direction={"column"}
                    justifyContent={"space-evenly"}
                    flexWrap={"wrap"}
                  >
                    <Grid>
                      <Typography variant="h6" fontWeight={"fantasy"}>
                        {product.brand}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="subtitle2">
                        {product.productName.split(" ").length >= 3
                          ? product.productName
                              .split(" ")
                              .slice(0, 4)
                              .join(" ") + "..."
                          : product.productName}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="caption">
                        <Rating
                          value={product.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: "black",
                            },
                          }}
                        />
                        {`(${product.rating})`}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="subtitle1">
                        {"\u20B9"}
                        {product.price}{" "}
                        <sup style={{ color: "light-black" }}>00</sup>
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 20,
                    top: 20,
                    minWidth: "auto",
                    padding: "4px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => handleFav(product)}
                >
                  {user?.wishlist?.find((x) => x.id == product.id) ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "black" }} />
                  )}
                </IconButton>

                {location.pathname == "/bag" ? (
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "black",
                      color: "white",
                      my: 1,
                    }}
                    fullWidth
                    onClick={() => handleCart(product)}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "black",
                      color: "white",
                      my: 1,
                    }}
                    fullWidth
                    onClick={() => handleCart(product)}
                    disabled={user?.bag?.find((x) => x.id == product.id)}
                  >
                    {user?.bag?.find((x) => x.id == product.id)
                      ? "Added To cart"
                      : "Add to cart"}
                  </Button>
                )}
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            size={12}
            mt={10}
          >
            <img
              src="/images/noItems.png"
              alt="No items"
              style={{ height: "300px",width:'200px' }}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Page;
