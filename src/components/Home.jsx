import React from "react";
import home from "../assets/e-commerce-online-shopping-doodle-hand-drawn-icon-set-outline-drawing-e-commerce-online-shopping-line-clipart-symbol-collection-395304571.webp";
import Typography from "@mui/material/Typography";
import wrogn from "../assets/Wrogn.jpeg";
import Rdstr from "../assets/Rdstr.jpeg";
import Hrx from "../assets/hrx.jpeg";
import HN from "../assets/H&N.jpeg";
import puma from "../assets/puma.jpeg";
import skechers from "../assets/skechers.jpeg";
import levis from "../assets/levis.jpeg";
import crocs from "../assets/crocs.jpeg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import activewear from "../assets/ActiveNd.jpeg";
import loungeWear from "../assets/loungeNd.jpeg";
import workWear from "../assets/WorkND.jpeg";
import kurtas from "../assets/kurtasND.jpeg";
import sandals from "../assets/sandals.jpeg";
import shoes from "../assets/sportswear.jpeg";
import handBag from "../assets/handbags.jpeg";
import watches from "../assets/watches.jpeg";
import forHim from "../assets/forHim.png";
import forHer from "../assets/forher.png";
import kids from "../assets/kids.png";
import beauty from "../assets/beauty.png";
import us from "../assets/home.png";
import frock from "../assets/frock.jpeg";
import set from "../assets/set.jpeg";
import boyShoes from "../assets/boyShoes.jpeg";
import addidasKid from "../assets/addidasKid.jpeg";
import tv from "../assets/tv.jpeg";
import fridge from "../assets/fridge.jpeg";
import washingMachine from "../assets/wm.jpeg";
import oven from "../assets/oven.jpeg";
import mascara from "../assets/mascara.jpeg";
import foundation from "../assets/foundation.jpeg";
import blush from "../assets/blush.jpeg";
import lipstick from "../assets/lipstick.jpeg";
import { Link } from "react-router-dom";


const clothing = [wrogn, Rdstr, Hrx, HN];
const footWear = [puma, skechers, levis, crocs];
const womenClothing = [loungeWear, activewear, workWear, kurtas];
const kidsClothing = [addidasKid, boyShoes, frock, set];
const homeAppliances = [tv, fridge, washingMachine, oven];
const beautyProducts = [lipstick, foundation, mascara, blush];
const women = [sandals, shoes, handBag, watches];

const Home = () => {
  return (
    <div>
      <Box
        sx={{
          xs: "90%",
          sm: "70%",
          md: "60%",
          lg: "40%",
          margin: "auto",
          mt: 2,
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
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mt: 2, fontFamily: "cursive" }}
      >
        Your one-stop shop for fashion and lifestyle products
      </Typography>
      <Typography
        variant="h6"
        sx={{
          m: 2,
          fontFamily: "cursive",
          fontWeight: "bold",
          alignItems: "center",
          textAlign: "center",
          textDecoration: "underline",
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
        <Grid item>
          <Link to={"/shop-men"}>
            {" "}
            <img
              src={forHim}
              alt="for him"
              style={{
                width: "100%",
                border: "2px solid black",
                height: "300px",
              }}
            />
          </Link>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        m={2}
        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      >
        {clothing.map((el, i) => (
          <Grid item key={i} xs={12} sm={12} md={3}>
            <img
              src={el}
              alt="clothing"
              style={{
                width: "200px",
                border: "2px solid black",
                borderRadius: 10,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        m={2}
        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      >
        {footWear.map((el, i) => (
          <Grid item key={i} xs={12} sm={12} md={3}>
            <img
              src={el}
              alt="footwear"
              style={{
                width: "200px",
                border: "2px solid black",
                borderRadius: 10,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h6"
        sx={{
          m: 2,
          fontFamily: "cursive",
          fontWeight: "bold",
          alignItems: "center",
          textAlign: "center",
          textDecoration: "underline",
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
        <Grid item>
          <Link to={"/shop-women"}>
            {" "}
            <img
              src={forHer}
              alt="for her"
              style={{
                width: "100%",
                height: "300px",
                border: "2px solid black",
              }}
            />
          </Link>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        m={2}
        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      >
        {womenClothing.map((el, i) => (
          <Grid item key={i} xs={12} sm={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={el}
                alt="clothing"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "2px solid black",
                  borderRadius: 10,
                }}
              />
              {/* <Typography
                variant="subtitle1"
                sx={{
                  m: 2,
                  fontFamily: "cursive",
                  fontWeight: "bold",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {womenClothingNames[i]}
              </Typography> */}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        m={2}
        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      >
        {women.map((el, i) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item key={i} xs={12} sm={12} md={5}>
              <img
                src={el}
                alt="clothing"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "2px solid black",
                  borderRadius: 10,
                }}
              />
            </Grid>
          </Box>
        ))}
      </Grid>

      <Typography
        variant="h6"
        sx={{
          m: 2,
          fontFamily: "cursive",
          fontWeight: "bold",
          alignItems: "center",
          textAlign: "center",
          textDecoration: "underline",
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
        <Grid item>
          <Link to={"/shop-kids"}>
            {" "}
            <img
              src={kids}
              alt="for kids"
              style={{
                width: "100%",
                border: "2px solid black",
                height: "300px",
              }}
            />
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        m={2}
        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      >
        {kidsClothing.map((el, i) => (
          <Grid item key={i} xs={12} sm={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={el}
                alt="clothing"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "2px solid black",
                  borderRadius: 10,
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="h6"
        sx={{
          m: 2,
          fontFamily: "cursive",
          fontWeight: "bold",
          alignItems: "center",
          textAlign: "center",
          textDecoration: "underline",
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
        <Grid item>
          <Link to={"/shop-home"}>
            {" "}
            <img
              src={us}
              alt="for home"
              style={{
                width: "100%",
                border: "2px solid black",
                height: "300px",
              }}
            />{" "}
          </Link>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        m={2}
        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      >
        {homeAppliances.map((el, i) => (
          <Grid item key={i} xs={12} sm={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={el}
                alt="clothing"
                style={{
                  width: "200px",

                  height: "200px",
                  border: "2px solid black",
                  borderRadius: 10,
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h6"
        sx={{
          m: 2,
          fontFamily: "cursive",
          fontWeight: "bold",
          alignItems: "center",
          textAlign: "center",
          textDecoration: "underline",
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
        <Grid item>
          <Link to={"/shop-beauty"}>
            {" "}
            <img
              src={beauty}
              alt="for beauty"
              style={{
                width: "100%",
                border: "2px solid black",
                height: "300px",
              }}
            />
          </Link>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        m={2}
        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      >
        {beautyProducts.map((el, i) => (
          <Grid item key={i} xs={12} sm={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={el}
                alt="clothing"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "2px solid black",
                  borderRadius: 10,
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
