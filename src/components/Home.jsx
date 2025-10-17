import React, { useEffect, useRef, useState } from "react";
import home from "../../public/images/e-commerce-online-shopping-doodle-hand-drawn-icon-set-outline-drawing-e-commerce-online-shopping-line-clipart-symbol-collection-395304571.webp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import forHim from "../../public/images/forHim.png";
import forHer from "../../public/images/forHer.png";
import forThem from "../../public/images/kids.png";
import forHome from "../../public/images/home.png";
import forBeauty from "../../public/images/beauty.png";
import homePage from "../../public/images/MiniMall.png";
import { clearFilters } from "../redux/action";
import { useDispatch } from "react-redux";

import { Button } from "@mui/material";
import Categories from "./Categories";

const Home = () => {
  const [shopNow, setShopNow] = useState(localStorage.getItem('welcome')||'true');
  const dispatch = useDispatch();
  console.log(shopNow)
  useEffect(() => {
    dispatch(clearFilters);
    return ()=> localStorage.setItem('welcome',false)
  }, []);
  return (
    <div>
      {shopNow=='true' ? (
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
            style={{ width: "100%", maxHeight: "90vh", borderRadius: 5 }}
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
              }}
            >
              Welcome to Mini
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", mt: 2, color: "black" }}
            >
              Your one-stop shop for fashion and lifestyle products
            </Typography>
            <Button
              variant="contained"
              sx={{ px: 4, py: 1, m: 3, backgroundColor: "black" }}
              onClick={() => setShopNow(false)}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
      ) : (
        <Categories />
      )}
      {
        <Box
          display={{ md: "none", xs: "flex" }}
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
              style={{ width: "100%", maxHeight: "300px" }}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mt: 2, fontFamily: "fantasy" }}
          >
            Welcome to Mini
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
            Your one-stop shop for fashion and lifestyle products
          </Typography>
          <Typography
            variant="h6"
            sx={{
              m: 2,
              fontWeight: "bold",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Men
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            m={2}
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <Grid item border={3} borderRadius={4}>
              <Link to={"/shop/men"}>
                {" "}
                <img
                  src={forHim}
                  alt="for him"
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius:'20px'
                  }}
                />
              </Link>
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            sx={{
              m: 2,
              fontWeight: "bold",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Women
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            m={2}
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <Grid item border={3} borderRadius={4}>
              <Link to={"/shop/women"}>
                {" "}
                <img
                  src={forHer}
                  alt="for her"
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius:'20px'
                  }}
                />
              </Link>
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            sx={{
              m: 2,
              fontWeight: "bold",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Kids
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            m={2}
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <Grid item border={3} borderRadius={4}>
              <Link to={"/shop/kids"}>
                {" "}
                <img
                  src={forThem}
                  alt="for kids"
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius:'20px'
                  }}
                />
              </Link>
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            sx={{
              m: 2,
              fontWeight: "bold",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Home
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            m={2}
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <Grid item border={3} borderRadius={4}>
              <Link to={"/shop/home"}>
                {" "}
                <img
                  src={forHome}
                  alt="for home"
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius:'20px'
                  }}
                />{" "}
              </Link>
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            sx={{
              m: 2,

              fontWeight: "bold",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Beauty
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            m={2}
            sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
          >
            <Grid item border={3} borderRadius={4}>
              <Link to={"/shop/beauty"}>
                {" "}
                <img
                  src={forBeauty}
                  alt="for beauty"
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius:'20px'
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
