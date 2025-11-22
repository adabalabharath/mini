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
  { url: "/images/kidsSection.webp", nav: "/shop/kids", tooltip: "Kids" },
  {
    url: "/images/homeSection.png",
    nav: "/shop/home",
    tooltip: "Home Appliances",
  },
  {
    url: "/images/beautySection.png",
    nav: "/shop/beauty",
    tooltip: "Beauty Products",
  },
  { url: "/images/mini.gif", nav: "/profile", tooltip: "Login to shop" },
];

const CategoryCard = () => {
  const [checked, setChecked] = useState(false);
  const [hover, setHover] = useState(null);
  const {user}=useContext(AuthContext)
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

          <CardActions sx={{ mt: 2 }}>
            <Grid
              container
              sx={{ height: "100%" }}
              gap={6}
              justifyContent={"center"}
              alignItems={"center"}
             
            >
              {images.map((x, i) => (
                <Grid size={3}>
                  <Tooltip
                    title={x.tooltip=='Login to shop' && user?'Go to Bag':x.tooltip}
                    arrow
                    slots={{
                      transition: Zoom,
                    }}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "#fff",
                          color: "black",
                          fontSize: "14px",
                          fontWeight: 500,
                          padding: "8px 12px",
                          borderRadius: "8px",
                          boxShadow: "0px 2px 8px rgba(0,0,0,0.3)",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "#dfdfdf",
                        },
                      },
                    }}
                  >
                    <Button
                      onClick={() => navigate(x.tooltip=='Login to shop' && user?'/bag':x.nav)}
                      onMouseEnter={() => setHover(i)}
                      sx={{
                        "&:hover img": {
                          transform: "scale(1.08)", 
                        },
                        transition: "0.3s",
                      }}
                    >
                      <img
                        src={x.url}
                        alt={x.tooltip}
                        style={{
                          width: "380px",
                          height: "200px",
                          borderRadius: 10,
                          transition: "transform 0.5s ease-in-out",
                          border: `1px solid ${
                            x.tooltip === "Home Appliances" ? "#555" : "white"
                          }`,
                        }}
                      />
                    </Button>
                  </Tooltip>
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
