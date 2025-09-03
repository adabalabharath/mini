import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import { AuthContext } from "./AuthProvider";
import { useSelector } from "react-redux";
import { filtersHook } from "../customHook/filtersHook";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import emailjs from "emailjs-com";
//import { EmailJSResponseStatus } from "emailjs-com";

const Bag = () => {
  const [products, setProducts] = useState([]);
  const filters = useSelector((store) => store.filters);
  const { user } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    const prods = filtersHook("", user?.bag, filters);
    setProducts(prods);
  }, [user?.bag, filters]);

  console.log(user?.email);

  const sendEmail = () => {
    const orderTotal = user?.bag.reduce((a, b) => a + b.price, 0);
    const shipping = 50;
    const tax = 100;

    const orders = user?.bag.map((item) => ({
      name: item.productName,
      units: 1,
      price: item.price,
      image: item.imageUrl,
      
    }));

    const templateParams = {
      name: user?.name,
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
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send email.");
      });
  };

  return (
    <>
      <Grid container direction={"column"}>
        <Grid sx={{ flexGrow: 1 }}>
          <Page products={products} />
        </Grid>
        <Grid>
          {products.length > 0 && (
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                border: 1,
                color: "black",
                my: 2,
              }}
              fullWidth
              onClick={sendEmail}
            >
              Proceed to Buy items
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Bag;
