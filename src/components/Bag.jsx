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
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import orderPlaced from "../../public/images/orderPlaced.jpeg";
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
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    const prods = filtersHook("", user?.bag, filters);
    setProducts(prods);
  }, [user?.bag, filters]);

  console.log(shipping);

  useEffect(() => {
    console.log(products.filter((x) => x.selected));

    let original = products.reduce(
      (a, b) => (b.selected ? a + b.price * b.qty : a),
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
        orders: [...user.orders, ...user.bag.filter((x) => x.selected)],
      };
      setUser(remaining);
      localStorage.setItem("loggedInUser", JSON.stringify(remaining));
    }
  }, [ordered]);

  console.log(user);

  const sendEmail = () => {
    const orderTotal = mrp - 3899;
    const selected = products.filter((x) => x.selected);
    const orders = selected.map((item) => ({
      name: item.productName,
      units: item.qty,
      price: item.price * item.qty,
      image: item.imageUrl,
      selectedSize: item.selectedSize,
    }));
    const templateParams = {
      userName: user?.name,
      email: user?.email,
      order_id: Date.now(),
      orders,
      shipping,
      tax,
      total: orderTotal + shipping + tax,
    };
   
    emailjs
      .send(
        "service_z8t1myy", // from EmailJS dashboard
        "template_54rmibg", // from EmailJS dashboard
        templateParams,
        "RlzD4i2llX_Q8d6TV" // from EmailJS dashboard
      )
      .then(() => {
        setDialog(true);
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
    setUser(updated);
    localStorage.setItem("loggedInUser", JSON.stringify(updated));
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
    setUser(updated);
    localStorage.setItem("loggedInUser", JSON.stringify(updated));
  };

  const handleRemove = (product) => {
    console.log(product);
    const updatedUser = {
      ...user,
      bag: user.bag.filter((x) => {
        if (!product.availableSizes.length) {
          return x.id !== product.id;
        }
        return !(x.id == product.id && x.selectedSize == product.selectedSize);
      }),
    };
    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setRemove(false);
  };

  const handleMove = (product) => {
    console.log(product);
    const updatedUser = {
      ...user,
      bag: user.bag.filter((x) => {
        if (!product.availableSizes.length) {
          return x.id !== product.id;
        }
        return !(x.id == product.id && x.selectedSize == product.selectedSize);
      }),
      wishlist: user.wishlist.some((x) => x.id === product.id)
        ? x
        : [...user.wishlist, product],
    };
    console.log(updatedUser);
    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
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
    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setRemove(false);
  };

  return products.length ? (
    <>
      <Typography sx={{ p: 2, fontWeight: "bold" }}>
        {products.reduce((x, y) => (y.selected ? x + 1 : x), 0) +
          "/" +
          products.length +
          " items selected"}
      </Typography>
      <Grid container>
        {products.map((x) => {
          return (
            <>
              <Grid
                sx={{ display: "flex", p: 2, position: "relative" }}
                size={{ xs: 12, md: 3 }}
              >
                <Checkbox
                  checked={x.selected}
                  sx={{ position: "absolute", left: 10, top: 10 }}
                  color="black"
                  onChange={() => handleCheckOut(x)}
                />
                <img
                  src={x.imageUrl}
                  style={{ width: "40%", borderRadius: 10 }}
                />
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
                          {x.availableSizes.map((size) => {
                            return <MenuItem value={size}>{size}</MenuItem>;
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
                              return <MenuItem value={size}>{size}</MenuItem>;
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
                    {x.price * x.qty}
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
                <Box
                  display="flex"
                  flexDirection={"row"}
                  justifyContent={"space-evenly"}
                >
                  <Button
                    color="black"
                    onClick={() => handleRemove(selectedProduct)}
                  >
                    remove
                  </Button>
                  <Button
                    color="black"
                    sx={{ textTransform: "none" }}
                    onClick={() => handleMove(selectedProduct)}
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
      </Grid>
      <Grid>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold" }}
        >{`Price Details (${products.reduce(
          (a, b) => (b.selected ? a + 1 : a),
          0
        )} items) `}</Typography>
        <Divider sx={{ px: 2 }} />
        <Box display={"flex"} justifyContent={"space-between"} py={2}>
          <Typography variant="caption">Total MRP</Typography>
          <Typography variant="caption">
            {" "}
            {"\u20B9"}
            {mrp}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} py={2}>
          <Typography variant="caption">Discount on MRP</Typography>
          <Typography variant="caption" color="green">
            {" "}
            {"\u20B9"}
            {discMrp}
          </Typography>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} py={2}>
          <Typography variant="caption">Shipping</Typography>
          <Typography variant="caption">
            {" "}
            {shipping == 0 ? "\u20B9" + 0 : "\u20B9" + shipping}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} py={2}>
          <Typography variant="caption">GST</Typography>
          <Typography variant="caption">
            {" "}
            {"\u20B9"}
            {tax}
          </Typography>
        </Box>
        <Divider sx={{ px: 2 }} />

        <Box display={"flex"} justifyContent={"space-between"} py={2}>
          <Typography variant="caption">Total</Typography>
          <Typography variant="caption">
            {" "}
            {"\u20B9"}
            {mrp > 0 ? mrp - discMrp + tax + shipping : 0}
          </Typography>
        </Box>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        {products.length > 0 && (
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "black",
              color: "white",
              mt: 2,
            }}
            onClick={sendEmail}
            fullWidth
            disabled={
              products.reduce((a, b) => (b.selected ? a + 1 : a), 0) < 1
            }
          >
            Place Order
          </Button>
        )}
        <Dialog
          open={dialog}
          keepMounted
          onClose={() => {
            setDialog(false), setOrdered(true);
          }}
          aria-describedby="alert-dialog-slide-description"
          sx={{ height: "100%" }}
        >
          <DialogContent>
            <img src={orderPlaced} style={{ width: "100%", py: 0 }} />
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
                setDialog(false), setOrdered(true);
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
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
