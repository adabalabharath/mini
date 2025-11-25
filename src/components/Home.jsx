import React, { useEffect, useRef, useState } from "react";
import home from "../../public/images/e-commerce-online-shopping-doodle-hand-drawn-icon-set-outline-drawing-e-commerce-online-shopping-line-clipart-symbol-collection-395304571.webp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import homePage from "../../public/images/MiniMall.png";
import { clearFilters } from "../redux/action";
import { useDispatch } from "react-redux";
import men from '/images/mens.jpg';
import women from '/images/women.jpg';
import kids from '/images/kids.jpg';
import homeSection from '/images/homeSection.jpg';
import beauty from '/images/beautySection.jpg';
import { Button } from "@mui/material";
import Categories from "./Categories";
import { useInView, useSlideUp } from './../customHook/useInView';

const after = (content, top, left, color,visible) => {
  let afterContent = {
    content: `"${content}"`,
    color,
    position: 'absolute',
    textShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
    fontSize: '22px',
    fontWeight: 800,
    top,
    left,
    opacity:0,
    animation:visible && 'textAnime 4s ease forwards'
  }
  return afterContent
}

const slideUp = {

}

const Home = () => {
  const [shopNow, setShopNow] = useState(localStorage.getItem('welcome') || 'true');
  const dispatch = useDispatch();
  const [menRef, menVisible] = useInView()
  const [womenRef, womenVisible] = useInView()
  const [kidRef, kidVisible] = useInView()
  const [homeRef, homeVisible] = useInView()
  const [beautyRef, beautyVisible] = useInView()
  useEffect(() => {
    dispatch(clearFilters);
    return () => localStorage.setItem('welcome', false)
  }, []);

  return (
    <div>
      {shopNow == 'true' ? (
        <Box
          sx={{
            margin: "auto",
            mt: 10,
            display: { md: "block", xs: "none" },
            position: "relative",
          }}
        >
          <img
            src={homePage}
            alt="myntra"
            style={{
              width: "100%",
              maxHeight: "90vh", borderRadius: 5
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mt: 2,
                fontFamily: "fantasy",
                color: "black",
                animation: 'animeDown 3s ease-out',
                "@keyframes animeDown": {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(-50px)'
                  },

                  '100%': {
                    opacity: 1,
                    transform: 'translate(0)'
                  }
                }
              }}
            >
              Welcome to Mini
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", mt: 2, color: "black", animation: 'animeDown 3s ease-out' }}
            >
              Your one-stop shop for fashion and lifestyle products!
            </Typography>
            <Button
              variant="contained"
              sx={{
                px: 4, py: 1, m: 3, backgroundColor: "black", animation: 'anime 3s ease-out',
                "@keyframes anime": {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(80px)'
                  },

                  '100%': {
                    opacity: 1,
                    transform: 'translate(0)'
                  }
                }
              }}
              onClick={() => setShopNow(false)}
            >
              Shop Now
            </Button>

          </Box>
        </Box>
      ) : (
        <Categories/>
      )}
      {
        <Box
          display={{ md: "none", xs: "flex", sm: 'none' }}
          sx={{ flexDirection: "column" }}
        >
          {" "}
          <Box
            sx={{
              margin: "auto",
              mt: 10,
              display: { md: "none", xs: "block" },
            }}
          >
            <img
              src={home}
              alt="myntra"
              style={{
                width: "100%",
                maxHeight: "300px"
              }}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mt: 2, fontFamily: "fantasy" }}
          >
            Welcome to Mini
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
            Your one-stop shop for fashion and lifestyle products!
          </Typography>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            m={3}
            sx={{ display: { xs: "flex", sm: "flex", md: "none" }, }}

          >
            <Grid size={12} borderRadius={4} ref={menRef} sx={{
              position: "relative",
              ...(useSlideUp(menVisible)),
              '&::after': after("Men's wear", 65, 20, 'white',menVisible),
              '@keyframes textAnime': {
                '0%': {
                  transform: 'translateY(100px)'
                },
                // '80%': {
                //   transform: 'translateY(-15px)'
                // },
                '100%': {
                  opacity: 1,
                  transform: 'translate(0)'
                }
              }

            }}>
              <Link to={"/shop/men"}>
                {" "}
                <img
                  src={men}
                  alt="for him"
                  style={{
                    width: "100%",
                    maxWidth: '370px',
                    height: "200px",
                    borderRadius: '10px',
                  }}
                />
              </Link>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            m={2}
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <Grid size={12} borderRadius={4} ref={womenRef} sx={{
              ...(useSlideUp(womenVisible)),
              position: "relative",
              '&::after': after("Women's wear", 67, 20, 'white',womenVisible)
            }}>
              <Link to={"/shop/women"}>
                {" "}
                <img
                  src={women}
                  alt="for her"
                  style={{
                    width: "100%",
                    maxWidth: '370px',
                    height: "200px",
                    borderRadius: '10px'
                  }}
                />
              </Link>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            m={2}
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <Grid size={12} borderRadius={4} ref={kidRef} sx={{
              ...(useSlideUp(kidVisible)),
              position: "relative",
              '&::after': after("Kids wear", 67, 20, 'white',kidVisible)
            }}>
              <Link to={"/shop/kids"}>
                {" "}
                <img
                  src={kids}
                  alt="for kids"
                  style={{
                    width: "100%",
                    maxWidth: '370px',
                    height: "200px",
                    borderRadius: '10px'
                  }}
                />
              </Link>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            m={2}
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <Grid size={12} borderRadius={4} ref={homeRef}
              sx={{
                ...(useSlideUp(homeVisible)),
                position: "relative",
                '&::after': after("Home Appliances", 65, 20, 'white',homeVisible)
              }}
            >
              <Link to={"/shop/home"}>
                {" "}
                <img
                  src={homeSection}
                  alt="for home"
                  style={{
                    width: "100%",
                    maxWidth: '370px',
                    height: "200px",
                    borderRadius: '10px'
                  }}
                />{" "}
              </Link>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            m={2}
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <Grid size={12} borderRadius={4} ref={beautyRef} sx={{
              ...(useSlideUp(beautyVisible)),
              position: "relative",
              '&::after': after("Beauty Products", 65, 20, 'white',beautyVisible)
            }}>
              <Link to={"/shop/beauty"}>
                {" "}
                <img
                  src={beauty}
                  alt="for beauty"
                  style={{
                    width: "100%",
                    maxWidth: '370px',
                    height: "200px",
                    borderRadius: '10px'
                  }}
                />
              </Link>
            </Grid>
          </Grid>
        </Box>
      }
    </div>
  );
};

export default Home;
