import React, { useEffect, useRef, useState } from "react";
import home from "../../public/images/e-commerce-online-shopping-doodle-hand-drawn-icon-set-outline-drawing-e-commerce-online-shopping-line-clipart-symbol-collection-395304571.webp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import mens from "../../public/images/mens.jpg";
import mens2 from "../../public/images/mens2.jpg";
import mens3 from "../../public/images/mens3.jpg";
import mens4 from "../../public/images/mens4.jpg";
import women from "../../public/images/women.jpg";
import women2 from "../../public/images/women2.jpg";
import women3 from "../../public/images/women3.jpg";
import women4 from "../../public/images/women4.jpg";
import kidsSection from "../../public/images/kidsSection.webp";
import kidsSection2 from "../../public/images/kidSection2.jpg";
import kidsSection3 from "../../public/images/kidSection3.jpg";
import homeSection from "../../public/images/homeSection.png";
import beautySection from "../../public/images/beautySection.png";
import forHim from "../../public/images/forHim.png";
import forHer from "../../public/images/forHer.png";
import forThem from "../../public/images/kids.png";
import forHome from "../../public/images/home.png";
import forBeauty from "../../public/images/beauty.png";
import { clearFilters } from "../redux/action";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const menImages = [mens, mens2, mens3, mens4];
const womenImages = [women, women2, women3, women4];
const kidImages = [kidsSection, kidsSection2, kidsSection3];
const Home = () => {
  const [Hover, setHover] = useState("");
  const menSwipeRef = useRef(null);
  const womenSwipeRef = useRef(null);
  const kidSwipeRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearFilters);
  }, []);
  return (
    <div>
      <Box
        sx={{
          margin: "auto",
          mt: 10,
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
        <Grid item border={3} borderRadius={1}>
          <Link to={"/shop/men"}>
            {" "}
            <img
              src={forHim}
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
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          onSwiper={(swiper) => (menSwipeRef.current = swiper)}
          autoplay={false}
          style={{ width: "100%", maxWidth: "1100px", borderRadius: 10 }}
          loop={true}
        >
          {menImages.map((x, i) => (
            <SwiperSlide key={i}>
              <Link to={"/shop/men"}>
                <img
                  src={x}
                  alt="clothing"
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    borderRadius: 10,
                    // boxShadow: Hover === "men" ? "50px" : 0,
                    // border: Hover === "men" ? "5px solid black" : 0,
                  }}
                  onMouseEnter={() => menSwipeRef.current?.autoplay.start()}
                  onMouseLeave={() => menSwipeRef.current?.autoplay.stop()}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
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
        <Grid item border={3} borderRadius={1}>
          <Link to={"/shop/women"}>
            {" "}
            <img
              src={forHer}
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
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          //   reverseDirection:true
          // }}
          modules={[Pagination, Autoplay]}
          onSwiper={(swiper) => (womenSwipeRef.current = swiper)}
          autoplay={false}
          style={{ width: "100%", maxWidth: "1100px", borderRadius: 10 }}
          loop={true}
        >
          {womenImages.map((x, i) => (
            <SwiperSlide key={i}>
              <Link to={"/shop/women"}>
                <img
                  src={x}
                  alt="clothing"
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    borderRadius: 10,
                    // boxShadow: Hover === "women" ? "50px" : 0,
                    // border: Hover === "women" ? "5px solid black" : 0,
                  }}
                  onMouseEnter={() => womenSwipeRef.current?.autoplay.start()}
                  onMouseLeave={() => womenSwipeRef.current?.autoplay.stop()}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
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
        <Grid item border={3} borderRadius={1}>
          <Link to={"/shop/kids"}>
            {" "}
            <img
              src={forThem}
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
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          //   reverseDirection:true
          // }}
          modules={[Pagination, Autoplay]}
          onSwiper={(swiper) => (kidSwipeRef.current = swiper)}
          autoplay={false}
          style={{ width: "100%", maxWidth: "1100px", borderRadius: 10 }}
          loop={true}
        >
          {kidImages.map((x, i) => (
            <SwiperSlide key={i}>
              <Link to={"/shop/kids"}>
                <img
                  src={x}
                  alt="clothing"
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    borderRadius: 10,
                    // boxShadow: Hover === "women" ? "50px" : 0,
                    // border: Hover === "women" ? "5px solid black" : 0,
                  }}
                  onMouseEnter={() => kidSwipeRef.current?.autoplay.start()}
                  onMouseLeave={() => kidSwipeRef.current?.autoplay.stop()}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
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
        <Grid item border={3} borderRadius={1}>
          <Link to={"/shop/home"}>
            {" "}
            <img
              src={forHome}
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
             
              width:'100%',
              maxWidth:'1100px',
              maxHeight: "400px",
              borderRadius: 10,
              transition: "all 0.1s ease",
              border:"2px solid black",
              boxShadow: Hover === "home" ? "50px" : 0,
              
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
        <Grid item border={3} borderRadius={1}>
          <Link to={"/shop/beauty"}>
            {" "}
            <img
              src={forBeauty}
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
              width: "100%",
              maxWidth:'1100px',
              maxHeight: "400px",
              borderRadius: 10,
               objectFit: "cover", 
              transition: "all 0.1s ease",
              // boxShadow: Hover === "beauty" ? "50px" : 0,
              // border: Hover === "beauty" ? "5px solid black" : 0,
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
