import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import { AuthContext } from "./AuthProvider";
import { useSelector } from "react-redux";
import { filtersHook } from "../customHook/filtersHook";
import Button from "@mui/material/Button";

const Bag = () => {
  const [products, setProducts] = useState([]);
  const filters = useSelector((store) => store.filters);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const prods = filtersHook("", user.bag, filters);
    setProducts(prods);
  }, [user.bag, filters]);

  return (
    <>
      <Page products={products} />
      {products.length && <Button
        variant="contained"
        sx={{
          textTransform: "none",
          backgroundColor: "black",
          color: "white",
          my: 1,
        }}
        fullWidth
      >
        Proceed to Buy items
      </Button>}
    </>
  );
};

export default Bag;
