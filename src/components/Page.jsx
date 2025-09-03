import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Filters from "./Filters";
import TuneIcon from "@mui/icons-material/Tune";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";

const Page = ({ products }) => {
  const [drawerFilters, setDrawerFilters] = useState(false);
  const navigate = useNavigate();
  const handleCart = () => {
    if (!localStorage.getItem("loggedInUser")) {
      navigate("/profile");
    }
  };

  const handleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Grid container sx={{ mt: 2, justifyContent: "space-between" }}>
      <Grid size={2.5} sx={{ display: { xs: "none", md: "block" } }}>
        <Filters />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 12, md: 9.5 }}
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
       <Grid container rowSpacing={5} columnSpacing={3}>
        {products?.map((product) => (
          <Grid
            size={{ xs: 6, sm: 6, md: 2 }}
            key={product.id}
            sx={{
              border: "1px solid white",           
              p: 2,
              height: 500,
              flexWrap:'wrap',
            }}
            
          >
            <Link
              to={`/productId/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box sx={{ position: "relative", width: "100%"}} >
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  style={{
                    width: "100%",
                    height:220,
                    
                    borderRadius: 8,
                    
                  }}
                />
                <Button
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    minWidth: "auto", 
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
              <Grid container height={220} direction={'column'}  justifyContent={'space-evenly'} flexWrap={'wrap'}>
              <Grid >
              <Typography variant="h6" fontWeight={'fantasy'}>{product.brand}</Typography>
             </Grid>
             <Grid >
              <Typography variant="subtitle2">
                {product.productName.split(" ").length >= 3
                  ? product.productName.split(" ").slice(0,4).join(" ") + "..."
                  : product.productName}
              </Typography>
              </Grid>
              <Grid >
              <Typography variant="caption">
                
                <Rating
                  value={product.rating}
                  precision={0.1} 
                  readOnly
                  size="small"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "black",
                    },
                  }}

                />
                {`(${product.rating})`}
              </Typography>
              </Grid>
              <Grid>
              <Typography variant="subtitle1">
                {"\u20B9"} 
                 {product.price} <sup style={{color:'light-black'}}>00</sup>
              </Typography>
              </Grid>
              </Grid>
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
    </Grid>
  );
};

export default Page;
