import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "./AuthProvider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { addToBag } from "../customHook/addToBagHook";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import orderPlaced from "../../public/images/orderPlaced.jpeg";
import emailjs from "emailjs-com";
import Skeleton from "@mui/material/Skeleton";
const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [path, setPath] = useState("");
  const params = useParams();
  const products = useSelector((store) => store.products);
  const { user, localSet } = useContext(AuthContext);
  const [dialog, setDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [buy, setBuy] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    let timer;

    if (!product) {
      timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 3000);
    } else {
      setShowSkeleton(false);
    }

    return () => clearTimeout(timer);
  }, [product]);
  useEffect(() => {
    const detail = products.find((x) => {
      if (params.id) {
        return x.id === params.id;
      } else if (params.name) {
        return x.productName == params.name;
      }
    });
    setProduct(detail);
    let pathArr = location.pathname.split("/");
    const name = pathArr[pathArr.length - 1].split("%20").join(" ");
    pathArr.splice(pathArr.length - 1, 1, name);
    const newPath = pathArr.map((x) => " " + x + " ");
    setPath(newPath.join("/"));
  }, [params, products]);

  const handleFav = (p) => {
    if (!user) {
      navigate("/profile");
    }
    const fav = {
      ...user,
      wishlist: user?.wishlist?.some((x) => x?.id === p.id)
        ? user.wishlist
        : [...user.wishlist, p],
    };
    localSet(fav);
  };

  const handleSize = (s) => {
    setSelectedSize(s);
    const size = {};
  };
  const handleBag = () => {
    if (!user) {
      navigate("/profile");
      return;
    }
    if (product?.availableSizes.length > 0 && !selectedSize) {
      setDialog(true);
      return;
    }
    if (product?.availableSizes.length > 0 && selectedSize) {
      const exists = user?.bag.some(
        (x) => x.id === product?.id && x.selectedSize === selectedSize
      );

      if (exists) {
        const updatedBag = user.bag.map((x) =>
          x.id === product?.id && x.selectedSize === selectedSize
            ? { ...x, qty: x.qty + 1 }
            : x
        );
        const updatedUser = { ...user, bag: updatedBag };
        localSet(updatedUser);
        setOpen(true);
      } else {
        const cartItem = { ...product, selectedSize, qty: 1, selected: true };
        const updatedUser = { ...user, bag: [...user.bag, cartItem] };
        localSet(updatedUser);
        setOpen(true);
      }
    } else {
      const cartItem = { ...product, selectedSize, qty: 1, selected: true };
      const updatedUser = { ...user, bag: [...user.bag, cartItem] };
      localSet(updatedUser);
      setOpen(true);
    }
  };

  const sendEmail = () => {
    const templateParams = {
      userName: user?.name,
      email: user?.email,
      order_id: Date.now(),
      name: product?.productName,
      units: 1,
      size: product?.availableSizes.length ? selectedSize : "Free Size",
      price: product.price,
      shipping: product?.price > 1200 ? 0 : 50,
      tax: 100,
      total: product.price + (product?.price > 1200 ? 0 : 50) + 100,
    };
    setLoading(true);
    emailjs
      .send(
        "service_z8t1myy", // from EmailJS dashboard
        "template_k9v5i2a", // from EmailJS dashboard
        templateParams,
        "RlzD4i2llX_Q8d6TV" // from EmailJS dashboard
      )
      .then(() => {
        setBuy(false);
        setConfirmed(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send email.");
      });
  };
  useEffect(() => {
    if (ordered) {
      const remaining = {
        ...user,
        orders: [...user.orders, product],
      };
      localSet(remaining);
    }
  }, [ordered]);
  return (
    <Box>
      {product && (
        <Box>
          <Typography sx={{ color: "grey", fontWeight: "bold", mt: 2 }}>
            {path}
          </Typography>
        </Box>
      )}
      {product && (
        <Grid container direction={"column"}>
         
          <Grid size={{ xs: 12, md: 4 }} pt={2}>
            <img src={product?.imageUrl} style={{ width: "100%" }} />
            <Grid
              display={"flex"}
              flexDirection={"column"}
              gap={1}
              mb={2}
              size={{ xs: 12, md: 4 }}
            >
              <Typography sx={{ color: "grey" }}>
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {product?.brand}
                </span>{" "}
                {product?.gender == "male"
                  ? "Men " + product?.productName
                  : "Women " + product?.productName}
              </Typography>

              <Typography sx={{ fontWeight: "bold" }} variant="button">
                <span style={{ color: "grey", fontWeight: "lighter" }}>
                  MRP{" "}
                  <s>
                    {"\u20B9"}
                    {product?.price + 2000}&nbsp;
                  </s>
                </span>{" "}
                {"\u20B9"}
                {product?.price}
              </Typography>

              <Typography
                sx={{ fontWeight: "bold", color: "red" }}
                variant="caption "
              >
                Only Few Left!
              </Typography>
            </Grid>

            {product?.availableSizes.length ? (
              <>
                {" "}
                <Typography>Select a Size</Typography>
                <Grid display={"flex"} flexWrap={"wrap"}>
                  {product?.availableSizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "contained" : "outlined"}
                      size="small"
                      sx={{
                        borderRadius: "30%",
                        minWidth: 30,
                        minHeight: 30,
                        borderColor: "black",
                        mt: 1,
                        mr: 1,

                        border: "1px solid grey",

                        textTransform: "none",
                        color: selectedSize == size ? "white" : "black",
                        backgroundColor: selectedSize == size && "black",
                      }}
                      onClick={() => {
                        handleSize(size);
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {size}
                        <Typography variant="caption" color="grey">
                          {"\u20B9"}
                          {product?.price}
                        </Typography>
                      </Box>
                    </Button>
                  ))}
                </Grid>
              </>
            ) : (
              <Typography variant="subtitle"> Size: Free Size</Typography>
            )}
            <Grid mt={2} display={"flex"} gap={1}>
              <Button onClick={() => handleFav(product)}>
                {user?.wishlist?.some((x) => x.id == product?.id) ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "black" }} />
                )}
              </Button>
              <Button
                variant="contained"
                color="black"
                fullWidth
                onClick={handleBag}
                sx={{ color: "white", backgroundColor: "black" }}
                size="small"
              >
                Add to Bag
              </Button>
              <Button
                variant="contained"
                color="black"
                fullWidth
                onClick={() => {
                  if (!user) {
                    navigate("/profile");
                    return;
                  }
                  if (product.availableSizes.length > 0) {
                    selectedSize ? setBuy(true) : setDialog(true);
                  } else {
                    setBuy(true);
                  }
                }}
                size="small"
                sx={{ color: "white", backgroundColor: "black" }}
              >
                Buy now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogContent>Please select a size to continue</DialogContent>
        <DialogActions
          onClick={() => setDialog(false)}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Ok
        </DialogActions>
      </Dialog>
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
      <Drawer open={buy} anchor="bottom" onClose={() => setBuy(false)}>
        <Grid container p={2} direction={"column"}>
          <Box display={"flex"} justifyContent={"space-between"} py={2}>
            <Typography variant="caption">Total MRP</Typography>
            <Typography variant="caption">
              {" "}
              {"\u20B9"}
              {product?.price + 2000}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} py={2}>
            <Typography variant="caption">Discount on MRP</Typography>
            <Typography variant="caption" color="green">
              {" "}
              {"\u20B9"}
              {2000}
            </Typography>
          </Box>

          <Box display={"flex"} justifyContent={"space-between"} py={2}>
            <Typography variant="caption">Shipping</Typography>
            <Typography variant="caption">
              {" "}
              {product?.price < 1200 ? "\u20B9" + 50 : "\u20B9" + 0}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} py={2}>
            <Typography variant="caption">GST</Typography>
            <Typography variant="caption">
              {" "}
              {"\u20B9"}
              100
            </Typography>
          </Box>
          <Divider sx={{ px: 2 }} />

          <Box display={"flex"} justifyContent={"space-between"} py={2}>
            <Typography variant="caption">Total</Typography>
            <Typography variant="caption">
              {" "}
              {"\u20B9"}
              {product?.price + 100 + (product?.price > 1200 ? 0 : 50)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "black",
              color: "white",
              mt: 2,
            }}
            onClick={sendEmail}
            loading={loading}
            fullWidth
          >
            Place Order
          </Button>
        </Grid>
      </Drawer>
      <Dialog
        open={confirmed}
        keepMounted
        onClose={() => {
          setConfirmed(false), setOrdered(true);
        }}
        aria-describedby="alert-dialog-slide-description"
        sx={{ height: "100%" }}
      >
        <DialogContent>
          <img src={orderPlaced} style={{ width: "100%", p: 0 }} />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            height: "50%",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              alignItems: "center",
              border: "1px solid green",
              color: "green",
            }}
            onClick={() => {
              setConfirmed(false), setOrdered(true);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {!product && showSkeleton ? (
        <>
          <Grid>
            <Skeleton variant="rectangular" width="100%" height={220} />
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="40%" />
          </Grid>
          <Grid>
            <Skeleton variant="rectangular" width="100%" height={220} />
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="40%" />
          </Grid>
        </>
      ) : (
        !product &&
        !showSkeleton && (
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
        )
      )}
    </Box>
  );
};

export default ProductDetail;
