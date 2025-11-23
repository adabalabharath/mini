import {
  Card,
  CardContent,
  Typography,
  Slide,
  CardActions,
  Box,
  Grid,
  Button,
  Tooltip,
  Zoom,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const images = [
  { url: "/images/mens.jpg", nav: "/shop/men", tooltip: "Men" },
  { url: "/images/women.jpg", nav: "/shop/women", tooltip: "Women" },
  { url: "/images/kids.jpg", nav: "/shop/kids", tooltip: "Kids" },
  {
    url: "/images/homeSection.jpg",
    nav: "/shop/home",
    tooltip: "Home Appliances",
  },
  {
    url: "/images/beautySection.jpg",
    nav: "/shop/beauty",
    tooltip: "Beauty Products",
  },
  { url: "/images/mini.gif", nav: "/profile", tooltip: "Login to shop" },
];

const CategoryCard = () => {
  const [checked, setChecked] = useState(false);
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    // const timer = setTimeout(() => setChecked(true), 300); // delay animation
    // return () => clearTimeout(timer);
    setChecked(true)
  }, []);

  return (
    <Card
      sx={{
        mt: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        borderRadius: 5,
        display: { md: "block", xs: "none" },
      }}
    >
      <Slide
        direction="up"
        in={checked}
        mountOnEnter
        unmountOnExit
        timeout={2000}
      >
        <CardContent sx={{ p: 2, color: "white", textAlign: "left" }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "fantasy",
              color: "#222",

              textAlign: "center",
            }}
          >
            Shop Based on Categories
          </Typography>

          <Typography
            sx={{
              mt: 1.5,
              color: "#555",
              fontSize: "16px",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Discover the latest trends in fashion and lifestyle, all in one
            place!
          </Typography>

          <CardActions>
            <Grid
              container
              sx={{ height: "100%" }}
              justifyContent={"center"}
              alignItems={"center"}

            >
              {images.map((x, i) => (
                <Grid size={3} m={2}>
                    <Button
                      onClick={() => navigate(x.tooltip == 'Login to shop' && user ? '/bag' : x.nav)}
                      sx={{
                        "&:hover img": {
                          transform: "scale(1.08)",
                          boxShadow:3,
                        },
                        transition: "0.3s",

                      }}
                    >
                      <Box sx={{
                        position: 'relative',
                        display:'inline-block',
                        '&::before':{
                           content: `"${x.tooltip == 'Login to shop' && user ? 'Go to Bag' : x.tooltip}"`,
                           opacity:0,
                           position: 'absolute',
                           bottom: 10,
                           left: 0,
                           color:'black',
                           transition:'1s',
                           fontWeight:600,
                           textShadow:10,
                           zIndex:3,
                           m:2
                        },
                        '&::after': {
                          content: '""',
                          backgroundColor: 'black',
                          height: '1px',
                          width: '0%',
                          position: 'absolute',
                          bottom: 10,
                          left: 0,
                          transition: '1s',
                          borderRadius: 20,
                          m:2
                        },
                        '&:hover::before': {
                          opacity: 1
                        },
                        '&:hover::after': {
                          width: '90%'
                        },

                      }}>
                        <img
                          src={x.url}
                          alt={x.tooltip}
                          style={{
                            width: "100%",
                            height: "200px",
                            borderRadius: 10,
                            transition: "transform 0.5s ease-in-out",
                          }}
                        />
                      </Box>
                    </Button>
                </Grid>
              ))}
            </Grid>
          </CardActions>
        </CardContent>
      </Slide>
    </Card>
  );
};

export default CategoryCard;
