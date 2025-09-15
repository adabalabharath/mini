import React, { useState } from "react";
import home from "../../public/images/e-commerce-online-shopping-doodle-hand-drawn-icon-set-outline-drawing-e-commerce-online-shopping-line-clipart-symbol-collection-395304571.webp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import mens from "../../public/images/mens.jpg";
import women from "../../public/images/women.jpg";
import kidsSection from "../../public/images/kidsSection.webp";
import homeSection from "../../public/images/homeSection.png";
import beautySection from "../../public/images/beautySection.jpg";

const Home = () => {
  const [Hover, setHover] = useState("");
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
              src={mens}
              alt="for him"
              style={{
                width: "100%",
               
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
       
          <Link to={"/shop/men"}>
            <img
              src={mens}
              alt="clothing"
              style={{
                width:"1200px",
                height: "400px",
                borderRadius: 10,
                transition: "all 0.1s ease",
                 boxShadow:Hover==="men"? '50px':0,
                border:Hover==="men"?'5px solid black':0
              }}
              onMouseEnter={() => setHover("men")}
              onMouseLeave={() => setHover("menLeave")}
            />
          </Link>
        
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
              src={women}
              alt="for her"
              style={{
                width: "100%",
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
       
          <Link to={"/shop/women"}>
            <img
              src={women}
              alt="clothing"
              style={{
                width:"1200px",
                height: "400px",
                borderRadius: 10,
                transition: "all 0.1s ease",
                 boxShadow:Hover==="women"? '50px':0,
                border:Hover==="women"?'5px solid black':0
              }}
              onMouseEnter={() => setHover("women")}
              onMouseLeave={() => setHover("womenLeave")}
            />
          </Link>
      
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
              src={kidsSection}
              alt="for kids"
              style={{
                width: "100%",
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
        
          <Link to={"/shop/kids"}>
            <img
              src={kidsSection}
              alt="clothing"
              style={{
                width:"1200px",
                height: "400px",
                borderRadius: 10,
                transition: "all 0.1s ease",
                 boxShadow:Hover==="kids"? '50px':0,
                border:Hover==="kids"?'5px solid black':0
              }}
              onMouseEnter={() => setHover("kids")}
              onMouseLeave={() => setHover("kidsLeave")}
            />
          </Link>
       
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
              src={homeSection}
              alt="for home"
              style={{
                width: "100%",
               
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
       
          <Link to={"/shop/home"}>
            <img
              src={homeSection}
              alt="clothing"
              style={{
                width:"1200px",
                height: "400px",
                borderRadius: 10,
                transition: "all 0.1s ease",
                boxShadow:Hover==="home"? '50px':0,
                border:Hover==="home"?'5px solid black':0
              }}
              onMouseEnter={() => setHover("home")}
              onMouseLeave={() => setHover("homeLeave")}
            />
          </Link>
        
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
              src={beautySection}
              alt="for beauty"
              style={{
                width: "100%",
               
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
       
          <Link to={"/shop/beauty"}>
            <img
              src={beautySection}
              alt="clothing"
              style={{
                width:"1200px",
                height: "400px",
                borderRadius: 10,
                transition: "all 0.1s ease",
                boxShadow:Hover==="beauty"? '50px':0,
                border:Hover==="beauty"?'5px solid black':0
              }}
              onMouseEnter={() => setHover("beauty")}
              onMouseLeave={() => setHover("beautyLeave")}
            />
          </Link>
       
      </Grid>
    </div>
  );
};

export default Home;
