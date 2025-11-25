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
import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import homePage from "../../public/images/MiniMall.png";
const images = [
  { url: "/images/mens.jpg", nav: "/shop/men", tooltip: "Men's wear" },
  { url: "/images/women.jpg", nav: "/shop/women", tooltip: "Women's wear" },
  { url: "/images/kids.jpg", nav: "/shop/kids", tooltip: "Kids wear" },
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
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        mt: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        borderRadius: 5,
        display: { md: "block", xs: "none", sm: 'block' },
      }}

    >
      <CardContent
      sx={{ 
        animation:'slideUp 2s ease',
        '@keyframes slideUp': {
          '0%': {
            opacity:0,
            transform: 'translateY(100%)'
          },
          '100%': {
            opacity:1,
            transform: 'translateY(0)'
          }
        },
      }}>
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
              <Grid size={3} m={2} key={i}>
                <Button
                  onClick={() => navigate(x.tooltip == 'Login to shop' && user ? '/bag' : x.nav)}
                  sx={{
                    "&:hover img": {
                      transform: "scale(1.08)",
                      boxShadow: 3,
                    },
                    transition: "0.3s",

                  }}
                >
                  <Box sx={{
                    position: 'relative',
                    display: 'inline-block',
                    '&::before': {
                      content: `"${x.tooltip == 'Login to shop' && user ? 'Go to Bag' : x.tooltip}"`,
                      opacity: 0,
                      position: 'absolute',
                      bottom: 10,
                      left: 0,
                      color: 'white',
                      transition: '1s',
                      textShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
                      fontWeight: 800,
                      zIndex: 3,
                      m: 2
                    },
                    '&::after': {
                      content: '""',
                      backgroundColor: 'white',
                      height: '2px',
                      width: '0%',
                      position: 'absolute',
                      bottom: 10,
                      left: 0,
                      transition: '1s',
                      borderRadius: 20,
                      m: 2
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
    </Card>
  );
};

export default CategoryCard;
