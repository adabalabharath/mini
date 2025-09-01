import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TuneIcon from "@mui/icons-material/Tune";
const ShopMen = () => {
  const [products, setProducts] = useState([]);
  const [drawerFilters, setDrawerFilters] = useState(false);
  const data = useSelector((store) => store.products);
  const filters = useSelector((store) => store.filters);
  console.log(filters.gender);

  useEffect(() => {
    let filtered = data.filter((x) => x.gender === "male");
    if (filters.gender.length > 0) {
      filtered = data.filter((x) => filters.gender.includes(x.gender));
    }

    if (filters.price?.start && filters.price?.end) {
      filtered = filtered.filter(
        (x) => x.price >= filters.price.start && x.price <= filters.price.end
      );
    }

    if (filters.rating) {
      filtered = filtered.filter((x) => x.rating >= filters.rating);
    }

    if (filters.size?.length > 0) {
      filtered = filtered.filter((x) =>
        filters.size.some((y) => x.availableSizes.includes(y.toUpperCase()))
      );
    }
    setProducts(filtered);
  }, [data, filters?.gender, filters?.size, filters?.rating, filters?.price]);

  return (
    <Grid container sx={{ mt: 2, justifyContent: "space-between" }}>
      <Grid size={2} sx={{ display: { xs: "none", md: "block" } }}>
        <Filters />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 12, md: 10 }}
        sx={{
          display: "flex",
          flexWrap: "wrap",

          justifyContent: "space-between",
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
          <Button
            variant="filled"
            fullWidth
            sx={{ textTransform: "none" }}
            onClick={() => setDrawerFilters(true)}
          >
            <TuneIcon /> Apply Filters
          </Button>
          <Drawer
            anchor="left"
            open={drawerFilters}
            onClose={() => setDrawerFilters(false)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <Filters />
          </Drawer>
        </Grid>
        {products?.map((product) => (
          <Grid
            size={{ xs: 5.4, sm: 5.4, md: 2 }}
            key={product.id}
            sx={{ textAlign: "center", border: "1px solid black", m: 1 }}
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
