import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Filters from "./Filters";
import TuneIcon from "@mui/icons-material/Tune";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "./AuthProvider";
import NoItems from "./NoItems";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { addToBag } from "../customHook/addToBagHook";

const Page = ({ products }) => {
  const [drawerFilters, setDrawerFilters] = useState(false);
  const [sizeDrawer, setSizeDrawer] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const isLoading = useSelector((store) => store.isLoading);
  const [fav, setFav] = useState(false);
  const { user, localSet } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSkeleton, setShowSkeleton] = useState(true);
  console.log(products)
  useEffect(() => {
    let timer;

    if (!products.length) {
      timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 3000);
    } else {
      setShowSkeleton(false);
    }

    return () => clearTimeout(timer);
  }, [products]);

  const handleCart = (item) => {
    if (item.availableSizes.length > 0) {
      setSizeDrawer(true);
      const exists = user?.bag.some(
        (x) => x.id === item.id && x.selectedSize === selectedSize
      );

      if (exists) {
        const updatedBag = user.bag.map((x) =>
          x.id === item.id && x.selectedSize === selectedSize
            ? { ...x, qty: x.qty + 1 }
            : x
        );
        const updatedUser = { ...user, bag: updatedBag };
        localSet(updatedUser);
      } else {
        const cartItem = { ...item, selectedSize, qty: 1, selected: true };
        const updatedUser = { ...user, bag: [...user.bag, cartItem] };
        localSet(updatedUser);
      }
    } else {
      const cartItem = { ...item, selectedSize, qty: 1, selected: true };
      const updatedUser = { ...user, bag: [...user.bag, cartItem] };
      localSet(updatedUser);
      setOpen(true);
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
    localSet(updatedUser);
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

        {!products.length && showSkeleton ? (
          <Grid container size={12} rowSpacing={5} columnSpacing={3}>
            {/* Skeleton loaders for when data is loading */}
            {[...Array(18)].map((_, index) => (
              <Grid key={index} size={{ xs: 6, sm: 6, md: 2 }}>
                <Box
                  sx={{ p: 2, border: "1px solid white", position: "relative" }}
                >
                  <Skeleton variant="rectangular" width="100%" height={220} />
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="text" width="50%" />
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="40%" />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : products.length > 0 ? (
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
                    height={200}
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

                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "black",
                    color: "white",
                    my: 1,
                  }}
                  fullWidth
                  onClick={() => {
                    !user
                      ? navigate("/profile")
                      : product.availableSizes.length > 0
                      ? (setSelectedProduct(product), setSizeDrawer(true))
                      : handleCart(product);
                  }}
                  //disabled={user?.bag?.find((x) => x.id == product.id)}
                >
                  Add to Bag
                </Button>
              </Grid>
            ))}
            <Drawer
              anchor="bottom"
              open={sizeDrawer}
              onClose={() => setSizeDrawer(false)}
            >
              <Typography sx={{ p: 2, fontWeight: "bold" }}>
                Select a size
              </Typography>
              <Box sx={{ display: "flex", gap: 2, px: 2, pb: 2 }}>
                {selectedProduct?.availableSizes?.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "contained" : "outlined"}
                    size="small"
                    sx={{
                      borderRadius: "50%",
                      minWidth: 40,
                      minHeight: 40,
                      borderColor: "black",
                      color: selectedSize == size ? "white" : "black",
                      backgroundColor: selectedSize == size && "black",
                    }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </Box>
              <Button
                fullWidth
                variant="contained"
                disabled={!selectedSize}
                onClick={() => {
                  handleCart(selectedProduct);
                  setSizeDrawer(false);
                  setOpen(true);
                }}
                sx={{ backgroundColor: "black", color: "white",mb:1 }}
              >
                Done
              </Button>
            </Drawer>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={() => setOpen(false)}
            >
              <Alert
                onClose={() => setOpen(false)}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Successfully Added to Bag
              </Alert>
            </Snackbar>
          </Grid>
        ) : products.length == 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
            mt={10}
          >
            <img
              src="/images/noItems.png"
              alt="No items"
              style={{ height: "300px", width: "200px" }}
            />

            <Link to="/" sx={{ textDecoration: "none" }}>
              {" "}
              <Button
                sx={{
                  textTransform: "none",
                  backgroundColor: "black",
                  color: "white",
                  my: 1,
                }}
              >
                Go to Home
              </Button>{" "}
            </Link>
          </Box>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default Page;
