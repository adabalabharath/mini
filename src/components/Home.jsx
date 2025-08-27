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
import activewear from "../assets/activeNd.jpeg";
import loungeWear from "../assets/loungeNd.jpeg";
import workWear from "../assets/workND.jpeg";
import kurtas from "../assets/kurtasNd.jpeg";
import sandals from "../assets/SandalsNd.jpeg";
import shoes from "../assets/sportswear.jpeg"
import handBag from "../assets/handbags.jpeg"
import watches from "../assets/watches.jpeg"
const clothing = [wrogn, Rdstr, Hrx, HN];
const footWear = [puma, skechers, levis, crocs];
const womenClothing = [loungeWear,activewear , workWear,kurtas];
const womenClothingNames = ['Lounge Wear','Active wear' , 'Work Wear','Kurtas'];
const women=[sandals,shoes,handBag,watches]
const womenNames=['Sandals','Shoes','Hand Bags','Watches']
const Home = () => {
  return (
    <div>
      <Box sx={{ xs: "90%",sm:'70%', md: "60%", lg: "40%", margin: "auto", mt: 2 }}>
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
        For Him
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        m={2}
      >
        {clothing.map((el, i) => (
          <Grid item key={i} xs={12} sm={12} md={3}>
            <img
              src={el}
              alt="clothing"
              style={{
                width: "200px",
                border: "5px solid black",
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
      >
        {footWear.map((el, i) => (
          <Grid item key={i} xs={12} sm={12} md={3}>
            <img
              src={el}
              alt="footwear"
              style={{
                width: "200px",
                border: "5px solid black",
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
        For Her
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        m={2}
      >
        {womenClothing.map((el, i) => (
          <Grid item key={i} xs={12} sm={12} md={5}>
            <Box sx={{display:"flex",flexDirection:'column',justifyContent:"center",alignItems:"center"}}>
            <img
              src={el}
              alt="clothing"
              style={{
                 width: "200px",
                height:"250px",
                 border: "5px solid black",
                borderRadius: 10,
                
              }}
            />
            <Typography variant="subtitle1"
        sx={{
          m: 2,
          fontFamily: "cursive",
          fontWeight: "bold",
          alignItems: "center",
          textAlign: "center",
         
        }}>{womenClothingNames[i]}</Typography>
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
      >
        {women.map((el, i) => (
           <Box sx={{display:"flex",flexDirection:'column',justifyContent:"center",alignItems:"center"}}>
          <Grid item key={i} xs={12} sm={12} md={5}>
            <img
              src={el}
              alt="clothing"
              style={{
                width: "200px",
                height:"250px",
                border: "5px solid black",
                borderRadius: 10,
              }}
            />
          </Grid>
          <Typography variant="subtitle1"
        sx={{
          m: 2,
          fontFamily: "cursive",
          fontWeight: "bold",
          alignItems: "center",
          textAlign: "center",}}>{womenNames[i]}</Typography>
          </Box>
        ))}
      </Grid>

    </div>
  );
};

export default Home;
