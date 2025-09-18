import Grid from "@mui/material/Grid";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const Orders = () => {
  const [products, setProducts] = useState([]);
  const { user, localSet } = useContext(AuthContext);
  const [remove, setRemove] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    setProducts(user?.orders);
  }, [user]);

  const handleRemove = (item) => {
    setRemove(false);
    const remove = {
      ...user,
      orders: user.orders.filter((x) =>
        x.selectedSize
          ? !(
              x.id === item.id &&
              x.selectedSize == item.selectedSize &&
              x.orderedTime === item.orderedTime
            )
          : !(x.id === item.id && x.orderedTime === item.orderedTime)
      ),
    };
    localSet(remove);
  };
  console.log(products);
  return products.length ? (
    <Box mt={10}>
      <Typography sx={{ fontWeight: "bold", m: 1 }}>Your Orders</Typography>
      <Grid container>
        {products.map((x) => {
          return (
            <>
              <Grid
                sx={{ display: "flex", p: 2, position: "relative" }}
                size={{ xs: 12, md: 3 }}
                key={x.id}
              >
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
                  {x.selectedSize ? (
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
                          disabled
                          sx={{ fontSize: 14, height: 36, paddingY: 0.5 }}
                        >
                          <MenuItem value={x.selectedSize}>
                            {x.selectedSize}
                          </MenuItem>
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
                          disabled
                        >
                          <MenuItem value={x.qty}>{x.qty}</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  ) : (
                    <Typography sx={{ my: 3 }}>Free Size</Typography>
                  )}
                  <Typography sx={{ my: 3, fontWeight: "bold" }}>
                    {" "}
                    {"\u20B9"}
                    {x.qty ? x.price * x.qty : x.price * 1}
                  </Typography>
                  <Button
                    sx={{
                      textTransform: "none",
                      border: 1,
                      color: "black",
                    }}
                    fullWidth
                    onClick={() => {
                      setSelectedProduct(x);
                      setRemove(true);
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
                      Remove From Orders
                    </Typography>
                    <Typography m={1} variant="caption">
                      Are you sure,you want to remove this item from orders?
                    </Typography>
                  </Box>
                </Grid>
                <Box
                  display="flex"
                  flexDirection={"row"}
                  justifyContent={"space-evenly"}
                  mb={2}
                >
                  <Button
                    color="black"
                    onClick={() => handleRemove(selectedProduct)}
                    sx={{ textTransform: "none" }}
                    fullWidth
                  >
                    Yes
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "black",
                      color: "white",
                    }}
                    onClick={() => setRemove(false)}
                    fullWidth
                  >
                    No
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
    </Box>
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

export default Orders;
