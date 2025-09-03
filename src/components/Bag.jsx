import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import { AuthContext } from "./AuthProvider";
import { useSelector } from "react-redux";
import { filtersHook } from "../customHook/filtersHook";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

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
    <Grid container direction={'column'} justifyContent={'space-between'} gap={3}>
      <Grid >
      <Page products={products} />
     </Grid>
     <Grid >
      {products.length>0 && <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          border:1,
          color: "black",
          
        }}
        fullWidth
      >
        Proceed to Buy items
      </Button>}
      </Grid>
      </Grid>
    </>
  );
};

export default Bag;
