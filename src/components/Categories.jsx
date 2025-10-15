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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
];

const CategoryCard = () => {
  const [checked, setChecked] = useState(false);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => setChecked(true), 300); // delay animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      sx={{
        mt: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundColor: "whitesmoke",
        borderRadius: 5,
      }}
    >
      <Slide
        direction="up"
        in={checked}
        mountOnEnter
        unmountOnExit
        timeout={1200}
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

          <Typography
            sx={{
              mx: 1,
              color: "#000",
              fontSize: "15px",
              fontWeight: 500,
              
            }}
          >
            Click on the sections below to start shopping.
          </Typography>

          <CardActions sx={{ mt: 2 }}>
            <Grid
              container
              sx={{ height: "100%", flexWrap: "wrap" }}
              spacing={5}
            >
              {images.map((x, i) => (
                <Grid item xs={3}>
                  <Button
                    onClick={() => navigate(x.nav)}
                    onMouseEnter={() => setHover(i)}
                    sx={{
                      "&:hover img": {
                        transform: "scale(1.08)", // zoom in slightly
                      },
                      transition: "0.3s",
                    }}
                  >
                    <Tooltip
                      title={x.tooltip}
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
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <img
                        key={i}
                        src={x.url}
                        alt={`image-${i}`}
                        style={{
                          width: "400px",
                          height: 200,
                          borderRadius: 10,
                          transition: "transform 0.5s ease-in-out",
                        }}
                      />
                    </Tooltip>
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
