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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import orderPlaced from "../../public/images/submited.gif";
import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import logo from "../../public/images/miniLogo.jpg";
import "swiper/css/pagination";
import { Breadcrumbs } from "@mui/material";

const terms = [
  {
    heading: "100% Original Products",
    points: [
      "Pay on delivery might be available.",
      "Easy 10 days returns and exchanges.",
    ],
  },
  // {
  //   heading: "BEST OFFERS",
  //   points: [
  //     "Best Price: Rs. 146.",
  //     "Applicable on orders above Rs. 150 (only on first purchase).",
  //     "Coupon code: BFF50. Coupon Discount: 50% off (Your total saving: Rs. 503).",
  //   ],
  // },
  {
    heading: "Bank Discounts",
    points: [
      "10% Discount on ICICI Bank Credit & Debit Cards. Min Spend ₹3500, Max Discount ₹1000.",
      "10% Discount on Axis Bank Credit Card. Min Spend ₹3500, Max Discount ₹1000.",
      "10% Discount on Kotak Bank Credit Cards. Min Spend ₹3500, Max Discount ₹1000.",
    ],
  },
  {
    heading: "Cashback",
    points: [
      "Assured Flat ₹20 Cashback. Min Spend ₹750, Max Discount ₹120.",
      "10% Discount on IDFC FIRST SWYP Credit Card. Min Spend ₹850, Max Discount ₹350.",
    ],
  },
];

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
  const [like, setLike] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
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
        ? user.wishlist.filter((x) => x.id !== p.id)
        : [...user.wishlist, p],
    };
    localSet(fav);
  };
  const handleFavLike = (product) => {
    setLike(true);
    if (!user) {
      navigate("/profile");
    }
    const fav = {
      ...user,
      wishlist: user?.wishlist.some((x) => x.id === product.id)
        ? user?.wishlist
        : [...user?.wishlist, product],
    };
    localSet(fav);
    setTimeout(() => setLike(false), 1000);
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

  const handleBuyNow = () => {
    const now = {
      ...user,
      buyNow: { ...product, selectedSize, qty: 1, selected: true },
    };
    localSet(now);
  };

  // const sendEmail = () => {
  //   const templateParams = {
  //     userName: user?.name,
  //     email: user?.email,
  //     order_id: Date.now(),
  //     name: product?.productName,
  //     units: 1,
  //     size: product?.availableSizes.length ? selectedSize : "Free Size",
  //     price: product.price,
  //     shipping: product?.price > 1200 ? 0 : 50,
  //     tax: 100,
  //     total: product.price + (product?.price > 1200 ? 0 : 50) + 100,
  //   };
  //   setLoading(true);
  //   emailjs
  //     .send(
  //       "service_z8t1myy", // from EmailJS dashboard
  //       "template_k9v5i2a", // from EmailJS dashboard
  //       templateParams,
  //       "RlzD4i2llX_Q8d6TV" // from EmailJS dashboard
  //     )
  //     .then(() => {
  //       setBuy(false);
  //       setConfirmed(true);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       alert("Failed to send email.");
  //     });
  // };
  useEffect(() => {
    if (ordered) {
      const orderSet = {
        ...product,
        qty: 1,
        selectedSize,
        selected: true,
        orderedTime: Date.now(),
      };
      const remaining = {
        ...user,
        orders: [...user.orders, orderSet],
      };
      localSet(remaining);
    }
  }, [ordered]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pb: 12,
        mt: 10,
      }}
    >
      {product && !showSkeleton && (
        <>
          <Box display={"flex"} flexDirection={"column"}>
            <Breadcrumbs
              separator="/"
              sx={{
                color: "grey",
                fontWeight: "bold",
                fontSize: "12px",
                my: 1,
              }}
            >
              <Link
                to="/"
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "grey",
                }}
              >
                Home
              </Link>

              {product.gender === "male" && (
                <Link
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "grey",
                  }}
                  to={"/shop/men"}
                >
                  Men
                </Link>
              )}
              {product.gender === "female" && (
                <Link
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "grey",
                  }}
                  to={"/shop/women"}
                >
                  Women
                </Link>
              )}
              {product.gender === "others" && (
                <Link
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "grey",
                  }}
                  to={"/shop/kids"}
                >
                  Kids
                </Link>
              )}
              {product.gender === "beauty" && (
                <Link
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "grey",
                  }}
                  to={"/shop/beauty"}
                >
                  Beauty
                </Link>
              )}
              {product.gender === "home" && (
                <Link
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "grey",
                  }}
                  to={"/shop/home"}
                >
                  Home Appliances
                </Link>
              )}
              <Typography
                color="text.primary"
                variant="caption"
                fontWeight={"bold"}
              >
                {product.productName}
              </Typography>
            </Breadcrumbs>
            <Typography variant="caption">
              ** Double tap on the image to add to wishlist **
            </Typography>
          </Box>
          <Grid
            container
            display={"flex"}
            flexDirection={{ xs: "column", sm: "column", md: "row" }}
            justifyContent={{ md: "space-evenly" }}
            py={1}
          >
            <Grid
              container
              sx={{
                position: "relative",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              size={{ xs: 12, md: 4 }}
            >
              {product.images ? (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  onDoubleClick={() => handleFavLike(product)}
                >
                  {product.images.map((x, i) => (
                    <SwiperSlide key={i}>
                      <Box
                        component="img"
                        src={x}
                        sx={{
                          width: "100%",
                          borderRadius: 2,
                          maxHeight: { xs: "400px", md: "80vh" },
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  modules={[Pagination]}
                  onDoubleClick={() => handleFavLike(product)}
                >
                  <SwiperSlide>
                    <Box
                      component="img"
                      src={product?.imageUrl}
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        height: { xs: "400px", md: "80vh" },
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box
                      sx={{
                        flexDirection: "column",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={logo}
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          maxHeight: "400px",
                          objectFit: "cover",
                        }}
                      />

                      {/* Centered text overlay */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                          background: "rgba(0,0,0,0.5)", // optional dark background
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                        }}
                      >
                        Sorry, Adding images is still in progress
                      </Typography>
                    </Box>
                  </SwiperSlide>
                </Swiper>
              )}
              {user && like && (
                <FavoriteIcon
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform:
                      "translate(-50%, -50%) scale(" + (like ? 1.2 : 0) + ")",
                    opacity: like ? 1 : 0,
                    transition: "transform 0.4s ease, opacity 0.4s ease",
                    color: "red",
                    fontSize: "50px",
                    pointerEvents: "none",
                    border: "1px solid white",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    padding: 1,
                    zIndex: 1100,
                  }}
                />
              )}
            </Grid>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Grid
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                mb={2}
                size={{ xs: 12 }}
                alignSelf={"flex-start"}
              >
                <Typography sx={{ color: "grey" }}>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    {product?.brand}
                  </span>{" "}
                  {product?.gender == "male"
                    ? "Men " + product?.productName
                    : product.gender == "female"
                    ? "Women " + product?.productName
                    : product?.productName}
                </Typography>

                <Typography sx={{ fontWeight: "bold" }} variant="button">
                  <span style={{ color: "grey", fontWeight: "lighter" }}>
                    MRP{" "}
                    <s>
                      {"\u20B9"}
                      {product?.price + 2000}&nbsp;
                    </s>
                  </span>{" "}
                  <span style={{ fontSize: "18px" }}>
                    {"\u20B9"}
                    {product?.price}
                  </span>
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
                  <Grid alignSelf={"flex-start"}>
                    <Typography>Select a Size</Typography>
                    <Grid flexWrap={"wrap"}>
                      {product?.availableSizes.map((size) => (
                        <Button
                          key={size}
                          variant={
                            selectedSize === size ? "contained" : "outlined"
                          }
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
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            {size}
                            <Typography variant="caption" color="grey">
                              {"\u20B9"}
                              {product.gender === "beauty" && product.prices
                                ? product?.prices[parseInt(size)]
                                : product?.price}
                            </Typography>
                          </Box>
                        </Button>
                      ))}
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Grid alignSelf={"flex-start"}>
                  <Typography variant="subtitle"> Size: Free Size</Typography>
                </Grid>
              )}
              <Box
                sx={{
                  width: "100%",
                  p: 1,
                  display: { xs: "none", md: "block" },
                }}
              >
                <Grid display={"flex"} justifyContent={"center"} gap={1} my={1}>
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
                      } else if (!user.address.length) {
                        navigate("/add-address", {
                          state: { path: location.pathname },
                        });
                        return;
                      } else if (product.availableSizes.length > 0) {
                        if (selectedSize) {
                          handleBuyNow();
                          navigate("/bag", { state: { directBuy: true } });
                        } else {
                          setDialog(true);
                        }
                      } else {
                        setBuy(true);
                        navigate("/bag", { state: { directBuy: product } });
                      }
                    }}
                    size="small"
                    sx={{ color: "white", backgroundColor: "black" }}
                  >
                    Buy now
                  </Button>
                </Grid>
              </Box>
              <Box sx={{ mt: 2 }}>
                {terms.map((section, idx) => (
                  <Box key={idx} sx={{ mb: 2 }}>
                    {/* Heading */}
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold", mb: 0.5 }}
                    >
                      {section.heading}
                    </Typography>
                    {/* Points */}
                    {section.points.map((point, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{ ml: 2, color: "grey.800", lineHeight: 1.6 }}
                      >
                        • {point}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              backgroundColor: "white",
              zIndex: 1000, // stays above details
              boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
              p: 1,
              display: { md: "none", xs: "block" },
            }}
          >
            <Grid display={"flex"} justifyContent={"center"} gap={1} px={1}>
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
                  } else if (!user.address.length) {
                    navigate("/add-address", {
                      state: { path: location.pathname },
                    });
                    return;
                  } else if (product.availableSizes.length > 0) {
                    if (selectedSize) {
                      handleBuyNow();
                      navigate("/bag", { state: { directBuy: true } });
                    } else {
                      setDialog(true);
                    }
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
          </Box>
        </>
      )}

      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogContent>
          <Typography>Please select a size to continue.</Typography>
        </DialogContent>
        <DialogActions
          onClick={() => setDialog(false)}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            sx={{ mb: 2, backgroundColor: "black", color: "white" }}
          >
            Ok
          </Button>
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
      {/* <Drawer open={buy} anchor="bottom" onClose={() => setBuy(false)}>
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
      </Drawer> */}
      <Dialog
        open={confirmed}
        keepMounted
        onClose={() => {
          setConfirmed(false), setOrdered(true);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ p: 2, backgroundColor: "whitesmoke" }}>
          <img
            src={orderPlaced}
            style={{ width: "100%", maxHeight: "190px" }}
          />
          <Typography
            variant="subtitle1"
            textAlign={"center"}
            fontWeight={"bold"}
          >
            Order Placed Successfully,thank you
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "whitesmoke",
            height: "50%",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              alignItems: "center",
              border: "1px solid green",
              color: "white",
              backgroundColor: "black",
            }}
            onClick={() => {
              setConfirmed(false), setOrdered(true);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {showSkeleton ? (
        <>
          <Grid>
            
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              sx={{ borderRadius: 5 }}
            />
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="100%" height={30} />
          </Grid>
          <Box
            display={"flex"}
            width="100%"
            position={"fixed"}
            bottom={0}
            left="0"
            height={50}
            justifyContent={"space-evenly"}
          >
            <Skeleton variant="text" width="10%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="40%" />
          </Box>
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
