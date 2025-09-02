import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import Drawer from "@mui/material/Drawer";
import { filtersHook } from "../customHook/filtersHook";
import { Link, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
const ShopWomen = () => {
  const [femaleProducts, setFemaleProducts] = useState([]);
  const [drawerFilters, setDrawerFilters] = useState(false);
  const data = useSelector((store) => store.products);
  const filters = useSelector((store) => store.filters);
  const navigate=useNavigate()
  useEffect(() => {
    const women = filtersHook("female", data, filters);
    console.log(women)
    setFemaleProducts(women);
  }, [data, filters]);

    const handleCart=()=>{
     if(!localStorage.getItem('loggedInUser')){
        navigate('/profile')
    }
  }

  const handleFavourite=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    
  }
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
        {femaleProducts?.map((product) => (
          <Grid
            size={{ xs: 6, sm: 6, md: 2 }}
            key={product.id}
            sx={{
              border: "1px solid white",
              mb: 2,

              p: 2,
              height: "100%",
              maxHeight: "400px",
            }}
          >
            <Link
              to={`/productId/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box sx={{ position: "relative", width: "100%", height: 200 }}>
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  style={{
                    width: "100%",
                    height: "100%",
                    // objectFit: "contain", // keeps proportions without overflow
                    borderRadius: 8,
                  }}
                />
                <Button
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    minWidth: "auto", // removes extra padding
                    padding: "4px",
                    backgroundColor: "white",
                    borderRadius: "50%",

                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={handleFavourite}
                >
                  <FavoriteBorderIcon sx={{ color: "black" }} />
                </Button>
              </Box>

              <Typography variant="h6">{product.brand}</Typography>

              <Typography variant="subtitle2">
                {product.productName.split(" ").length >= 5
                  ? product.productName.split(" ").slice(0, 4).join(" ") + "..."
                  : product.productName}
              </Typography>
              <Typography variant="caption">
                {product.rating}
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
              <Typography variant="h6">
                {"\u20B9"}
                {product.price} <sup>00</sup>
              </Typography>
            </Link>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "black",
                color: "white",
                my: 1,
              }}
              onClick={handleCart}
            >
              Add to cart
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ShopWomen;
