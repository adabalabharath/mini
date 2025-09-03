import React, { useEffect, useState } from "react";
import home from "../../public/images/e-commerce-online-shopping-doodle-hand-drawn-icon-set-outline-drawing-e-commerce-online-shopping-line-clipart-symbol-collection-395304571.webp";
import Typography from "@mui/material/Typography";
import wrogn from "../../public/images/Wrogn.jpeg";
import Rdstr from "../../public/images/Rdstr.jpeg";
import Hrx from "../../public/images/hrx.jpeg";
import HN from "../../public/images/H&N.jpeg";
import puma from "../../public/images/puma.jpeg";
import skechers from "../../public/images/skechers.jpeg";
import levis from "../../public/images/levis.jpeg";
import crocs from "../../public/images/crocs.jpeg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import activewear from "../../public/images/ActiveNd.jpeg";
import loungeWear from "../../public/images/loungeNd.jpeg";
import workWear from "../../public/images/WorkND.jpeg";
import kurtas from "../../public/images/kurtasND.jpeg";
import sandals from "../../public/images/sandals.jpeg";
import shoes from "../../public/images/sportswear.jpeg";
import handBag from "../../public/images/handbags.jpeg";
import watches from "../../public/images/watches.jpeg";
import forHim from "../../public/images/forHim.png";
import forHer from "../../public/images/forHer.png";
import kids from "../../public/images/kids.png";
import beauty from "../../public/images/beauty.png";
import us from "../../public/images/home.png";
import frock from "../../public/images/frock.jpeg";
import set from "../../public/images/set.jpeg";
import boyShoes from "../../public/images/boyShoes.jpeg";
import addidasKid from "../../public/images/addidasKid.jpeg";
import tv from "../../public/images/Tv.jpeg";
import fridge from "../../public/images/fridge.jpeg";
import washingMachine from "../../public/images/wm.jpeg";
import oven from "../../public/images/oven.jpeg";
import mascara from "../../public/images/mascara.jpeg";
import foundation from "../../public/images/foundation.jpeg";
import blush from "../../public/images/blush.jpeg";
import lipstick from "../../public/images/lipstick.jpeg";
import { Link } from "react-router-dom";


const clothing = [wrogn, Rdstr, Hrx, HN];
const footWear = [puma, skechers, levis, crocs];
const womenClothing = [loungeWear, activewear, workWear, kurtas];
const kidsClothing = [addidasKid, boyShoes, frock, set];
const homeAppliances = [tv, fridge, washingMachine, oven];
const beautyProducts = [lipstick, foundation, mascara, blush];
const women = [sandals, shoes, handBag, watches];

const Home = () => {
  const [MenClothingHover, setMenClothingHover] = useState(null);
  const [womenClothingHover, setWomenClothingHover] = useState(null);
  const [womenHover, setWomenHover] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [kidsHover,setKidsHover]=useState(null)
  const [homeHover,setHomeHover]=useState(null)
  const [beautyHover,setBeautyHover]=useState(null)
  
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
        sx={{ textAlign: "center", mt: 2,}}
      >
        Your one-stop shop for fashion and lifestyle products
      </Typography>
      <Typography
        variant="h6"
        sx={{
          m: 2,
           
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
          <Link to={"/shop/men"}>
            {" "}
            <img
              src={forHim}
              alt="for him"
              style={{
                width: "100%",
                border: "3px solid black",
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
                border:
                  MenClothingHover === i
                    ? "3px solid white"
                    : "3px solid black",
                borderRadius: 10,
                boxShadow:
                  MenClothingHover === i
                    ? "0px 4px 20px rgba(0,0,0,0.5)"
                    : "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setMenClothingHover(i)}
              onMouseLeave={() => setMenClothingHover(null)}
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
              key={i}
              style={{
                width: "200px",
                border: isHovered === i ? "3px solid white" : "3px solid black",
                borderRadius: 10,
                boxShadow:
                  isHovered === i ? "0px 4px 20px rgba(0,0,0,0.5)" : "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setIsHovered(i)}
              onMouseLeave={() => setIsHovered(null)}
            />
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h6"
        sx={{
          m: 2,
           
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
          <Link to={"/shop/women"}>
            {" "}
            <img
              src={forHer}
              alt="for her"
              style={{
                width: "100%",
                height: "300px",
                border: "3px solid black",
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
                  border:
                    womenClothingHover === i
                      ? "3px solid white"
                      : "3px solid black",
                  borderRadius: 10,
                  boxShadow:
                    womenClothingHover === i
                      ? "0px 4px 20px rgba(0,0,0,0.5)"
                      : "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={() => setWomenClothingHover(i)}
                onMouseLeave={() => setWomenClothingHover(null)}
              />
              {/* <Typography
                variant="subtitle1"
                sx={{
                  m: 2,
                   
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
                  border:
                    womenHover === i ? "3px solid white" : "3px solid black",
                  borderRadius: 10,
                  boxShadow:
                    womenHover === i ? "0px 4px 20px rgba(0,0,0,0.5)" : "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={() => setWomenHover(i)}
                onMouseLeave={() => setWomenHover(null)}
              />
            </Grid>
          </Box>
        ))}
      </Grid>

      <Typography
        variant="h6"
        sx={{
          m: 2,
           
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
          <Link to={"/shop/kids"}>
            {" "}
            <img
              src={kids}
              alt="for kids"
              style={{
                width: "100%",
                border: "3px solid black",
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
                 border:
                    kidsHover === i
                      ? "3px solid white"
                      : "3px solid black",
                  borderRadius: 10,
                  boxShadow:
                    kidsHover === i
                      ? "0px 4px 20px rgba(0,0,0,0.5)"
                      : "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={() => setKidsHover(i)}
                onMouseLeave={() => setKidsHover(null)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="h6"
        sx={{
          m: 2,
           
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
          <Link to={"/shop/home"}>
            {" "}
            <img
              src={us}
              alt="for home"
              style={{
                width: "100%",
                border: "3px solid black",
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
                 border:
                    homeHover === i
                      ? "3px solid white"
                      : "3px solid black",
                  borderRadius: 10,
                  boxShadow:
                    homeHover === i
                      ? "0px 4px 20px rgba(0,0,0,0.5)"
                      : "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={() => setHomeHover(i)}
                onMouseLeave={() => setHomeHover(null)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h6"
        sx={{
          m: 2,
           
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
          <Link to={"/shop/beauty"}>
            {" "}
            <img
              src={beauty}
              alt="for beauty"
              style={{
                width: "100%",
                border: "3px solid black",
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
                 border:
                    beautyHover === i
                      ? "3px solid white"
                      : "3px solid black",
                  borderRadius: 10,
                  boxShadow:
                    beautyHover === i
                      ? "0px 4px 20px rgba(0,0,0,0.5)"
                      : "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={() => setBeautyHover(i)}
                onMouseLeave={() => setBeautyHover(null)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
