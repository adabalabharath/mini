import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";

const ShopMen = () => {
  const [products, setProducts] = useState([]);

  const data =useSelector((store)=>store.products)
  useEffect(() => {
    const men=data.filter(x=>x.gender=='male')
    setProducts(men);
  }, [data]);

  return (
    <Grid container sx={{ mt: 2, justifyContent: "space-around" }}>
      <Grid size={2.5}>
        <Filters />
      </Grid>
      <Grid
        size={9}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        {products?.map((product) => (
          <Grid
            size={2}
            key={product.id}
            sx={{ textAlign: "center", border: "1px solid black",m:1 }}
          >
            <img
              src={product.imageUrl}
              alt={product.productName}
              style={{ maxWidth: "100%" }}
            />
            <Typography variant="subtitle2">{product.productName}</Typography>
            <Typography variant="subtitle2">
              Price: {product.price}/-
            </Typography>
            <Typography variant="subtitle2">
              Rating:{" "}
              <Rating
                value={product.rating}
                readOnly
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "black",
                  },
                }}
              />
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ShopMen;
