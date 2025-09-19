import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import { AuthContext } from "./AuthProvider";
import { useSelector } from "react-redux";
import { filtersHook } from "../customHook/filtersHook";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import emailjs from "emailjs-com";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import orderPlaced from "../../public/images/orderPlaced.jpeg";
import Skeleton from "@mui/material/Skeleton";
const Bag = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const filters = useSelector((store) => store.filters);
  const [ordered, setOrdered] = useState(false);
  const [remove, setRemove] = useState(false);
  const [mrp, setMrp] = useState(0);
  const [discMrp, setDiscMrp] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, localSet } = useContext(AuthContext);
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    let timer;

    if (!products) {
      timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 3000);
    } else {
      setShowSkeleton(false);
    }

    return () => clearTimeout(timer);
  }, [products]);
  useEffect(() => {
    //const prods = filtersHook("", user?.bag, filters);
    setProducts(user.bag);
  }, [user?.bag, filters]);

  useEffect(() => {
    let original = products.reduce(
      (a, b) =>
        b.selected
          ? a +
            (b.prices
              ? b.prices[parseInt(b.selectedSize)] * b.qty
              : b.price * b.qty)
          : a,
      0
    );

    let extra = original > 0 ? original + 3899 : 0;
    setMrp(extra);

    if (original > 0) {
      setDiscMrp(extra - original);
      setTax(100);

      if (original > 1200) {
        setShipping(0);
      } else if (original < 1200 && original > 0) {
        setShipping(50);
      }
    } else if (original === 0) {
      setShipping(0);
      setTax(0);
      setDiscMrp(0);
    }
  }, [products]);

  useEffect(() => {
    if (ordered) {
      const remaining = {
        ...user,
        bag: user.bag.filter((x) => !x.selected),
        orders: [
          ...user.orders,
          ...user.bag
            .filter((x) => x.selected)
            .map((x) => ({ ...x, orderedTime: Date.now() })),
        ],
      };
      console.log(remaining);
      localSet(remaining);
    }
  }, [ordered]);

  const sendEmail = () => {
    const orderTotal = mrp - 3899;
    const selected = products.filter((x) => x.selected);
    const ordersHtml = selected
      .map(
        (item) => `
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          <tr style="vertical-align: top;">
            <td style="padding: 24px 8px 0 4px; display: inline-block; width: max-content;">
              <img style="height: 64px;" src="${item.imageUrl}" alt="${
          item.productName
        }" height="64px">
            </td>
            <td style="padding: 24px 8px 0 8px; width: 100%;">
              <div>${item.productName}</div>
              <div style="font-size: 14px; color: #888; padding-top: 4px;">
                QTY: ${item.qty} &nbsp; SIZE: ${
          item.selectedSize || "Free Size"
        }
              </div>
            </td>
            <td style="padding: 24px 4px 0 0; white-space: nowrap;">
              <strong>₹${
                item.prices
                  ? item.prices[parseInt(item.selectedSize)] * item.qty
                  : item.price * item.qty
              }</strong>
            </td>
          </tr>
        </tbody>
      </table>
    `
      )
      .join("");
    const templateParams = {
      userName: user?.name,
      email: user?.email,
      order_id: Date.now(),
      orders: ordersHtml,
      shipping,
      tax,
      total: orderTotal + shipping + tax,
      logo: "https://localhost:5173/images/logo.jpeg",
    };
    setLoading(true);
    emailjs
      .send(
        "service_z8t1myy", // from EmailJS dashboard
        "template_54rmibg", // from EmailJS dashboard
        templateParams,
        "RlzD4i2llX_Q8d6TV" // from EmailJS dashboard
      )
      .then(() => {
        setDialog(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send email.");
      });
  };

  const handleChange = (event, product) => {
    const updated = {
      ...user,
      bag: user.bag.map((x) =>
        x.id == product.id ? { ...x, selectedSize: event.target.value } : x
      ),
    };
    localSet(updated);
  };

  const handleQty = (event, product) => {
    const updated = {
      ...user,
      bag: user.bag.map((x) =>
        x.id == product.id && x.selectedSize == product.selectedSize
          ? { ...x, qty: event.target.value }
          : x
      ),
    };
    localSet(updated);
  };

  const handleRemove = (product) => {
    const updatedUser = {
      ...user,
      bag: user.bag.filter((x) => {
        if (!product.availableSizes.length) {
          return x.id !== product.id;
        }
        return !(x.id == product.id && x.selectedSize == product.selectedSize);
      }),
    };
    localSet(updatedUser);
    setRemove(false);
  };

  const handleMove = (product) => {
    const updatedUser = {
      ...user,
      bag: user.bag.filter((x) => {
        if (!product.availableSizes.length) {
          return x.id !== product.id;
        }
        return !(x.id == product.id && x.selectedSize == product.selectedSize);
      }),
      wishlist: user.wishlist.some((x) => x.id === product.id)
        ? user.wishlist
        : [...user.wishlist, product],
    };
    localSet(updatedUser);
    setRemove(false);
  };

  const handleCheckOut = (p) => {
    const updatedUser = {
      ...user,
      bag: user.bag.map((x) =>
        x.id == p.id && x.selectedSize == p.selectedSize
          ? { ...x, selected: !x.selected }
          : x
      ),
    };
    localSet(updatedUser);
    setRemove(false);
  };

  return products.length ? (
    <Box display="flex" flexDirection="column" height="90vh" mt={10}>
      <Box overflow="auto">
        <Typography sx={{ p: 1, fontWeight: "bold" }}>
          {products.reduce((x, y) => (y.selected ? x + 1 : x), 0) +
            "/" +
            products.length +
            " items selected"}
        </Typography>
        {products.map((x, i) => {
          return (
            <>
              <Grid
                sx={{ display: "flex", p: 2, position: "relative" }}
                size={{ xs: 12, md: 3 }}
                key={i}
              >
                <Checkbox
                  checked={x.selected}
                  sx={{ position: "absolute", left: 10, top: 10 }}
                  color="black"
                  onChange={() => handleCheckOut(x)}
                />
                <Link to={`/productId/${x.id}`}>
                  <img
                    src={x.imageUrl}
                    style={{ width: "100%", borderRadius: 10, height: "225px" }}
                  />
                </Link>
                <Box px={2}>
                  <Typography sx={{ fontWeight: "bold" }}>{x.brand}</Typography>
                  <Typography>
                    {x.productName.split(" ").slice(0, 4).join(" ") + "..."}
                  </Typography>
                  {x.availableSizes.length ? (
                    <Box display={"flex"} gap={2}>
                      <FormControl
                        sx={{
                          fontWeight: "bold",
                          width: 70,
                          height: 10,
                          my: 2,
                        }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Size
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={x.selectedSize}
                          label="Age"
                          color="black"
                          sx={{ fontSize: 14, height: 36, paddingY: 0.5 }}
                          onChange={(e) => handleChange(e, x)}
                        >
                          {x.availableSizes.map((size, i) => {
                            return (
                              <MenuItem key={i} value={size}>
                                {size}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <FormControl
                        sx={{
                          fontWeight: "bold",
                          width: 70,
                          height: 10,
                          my: 2,
                        }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Qty
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={x.qty}
                          label="Age"
                          color="black"
                          sx={{ fontSize: 14, height: 36, paddingY: 0.5 }}
                          onChange={(e) => handleQty(e, x)}
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (size) => {
                              return (
                                <MenuItem value={size} key={i}>
                                  {size}
                                </MenuItem>
                              );
                            }
                          )}
                        </Select>
                      </FormControl>
                    </Box>
                  ) : (
                    <Typography sx={{ my: 3 }}>Free Size</Typography>
                  )}
                  <Typography sx={{ my: 3, fontWeight: "bold" }}>
                    {" "}
                    {"\u20B9"}
                    {x.gender === "beauty" && x.prices
                      ? x?.prices[parseInt(x.selectedSize)] * x.qty
                      : x.price * x.qty}
                  </Typography>
                  <Button
                    sx={{
                      textTransform: "none",
                      border: 1,
                      color: "black",
                    }}
                    fullWidth
                    onClick={() => {
                      setSelectedProduct(x), setRemove(true);
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
              <Drawer
                open={remove}
                onClose={() => setRemove(false)}
                anchor="bottom"
                sx={{ position: "relative" }}
              >
                <Grid
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  m={1}
                >
                  <img
                    src={selectedProduct?.imageUrl}
                    style={{ height: 100 }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      m: 1,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", m: 1 }}>
                      Move From Bag
                    </Typography>
                    <Typography m={1} variant="caption">
                      Are you sure,you want to move this item from bag?
                    </Typography>
                  </Box>
                </Grid>
                <Box display="flex" flexDirection={"row"} mb={2}>
                  <Button
                    color="black"
                    onClick={() => handleRemove(selectedProduct)}
                    sx={{ textTransform: "none" }}
                    fullWidth
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "black",
                      color: "white",
                    }}
                    onClick={() => handleMove(selectedProduct)}
                    fullWidth
                  >
                    Move to wishlist
                  </Button>
                </Box>
                <IconButton
                  onClick={() => setRemove(false)}
                  sx={{ position: "absolute", top: 10, right: 10 }}
                >
                  <CloseIcon />
                </IconButton>
              </Drawer>
            </>
          );
        })}
      </Box>
      <Grid container direction={"column"} p={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {`Price Details (${products.reduce(
              (a, b) => (b.selected ? a + 1 : a),
              0
            )} items) `}
          </Typography>
          <Divider sx={{ my: 1 }} />

          {/* Price Details */}
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography variant="caption">Total MRP</Typography>
            <Typography variant="caption">₹{mrp}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography variant="caption">Discount on MRP</Typography>
            <Typography variant="caption" color="green">
              -₹{discMrp}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography variant="caption">Shipping</Typography>
            <Typography variant="caption">
              {shipping === 0 ? "₹0" : `₹${shipping}`}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography variant="caption">GST</Typography>
            <Typography variant="caption">₹{tax}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography variant="caption">Total</Typography>
            <Typography variant="caption">
              ₹{mrp > 0 ? mrp - discMrp + tax + shipping : 0}
            </Typography>
          </Box>
        </Grid>

        {/* Place Order Button */}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          {products.length > 0 && (
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "black",
                color: "white",
                my: 1,
              }}
              onClick={sendEmail}
              fullWidth
              disabled={
                products.reduce((a, b) => (b.selected ? a + 1 : a), 0) < 1
              }
              loading={loading}
            >
              Place Order
            </Button>
          )}
        </Grid>
        <Dialog
          open={dialog}
          keepMounted
          onClose={() => {
            setDialog(false), setOrdered(true);
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent sx={{ p: 1 }}>
            <img
              src={orderPlaced}
              style={{ width: "100%", height: "300px", py: 0 }}
            />
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
              variant="contained"
              sx={{
                alignItems: "center",
                backgroundColor: "black",
                border: "1px solid green",
                color: "white",
              }}
              onClick={() => {
                setDialog(false), setOrdered(true);
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  ) : !products.length && showSkeleton ? (
    <>
      <Grid container size={12} rowSpacing={5} columnSpacing={3}>
        {/* Skeleton loaders for when data is loading */}
        {[...Array(18)].map((_, index) => (
          <Grid key={index} size={{ xs: 6, sm: 6, md: 2 }}>
            <Box sx={{ p: 2, border: "1px solid white", position: "relative" }}>
              <Skeleton variant="rectangular" width="100%" height={220} />
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="text" width="40%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  ) : (
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
  );
};

export default Bag;
