import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ShopMen from "./components/ShopMen";
import ShopWomen from "./components/ShopWomen";
import ShopKids from "./components/ShopKids";
import ShopHomeLiving from "./components/ShopHomeLiving";
import ShopBeauty from "./components/ShopBeauty";
import Profile from "./components/Profile";
import WishList from "./components/WishList";
import Bag from "./components/Bag";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { setProducts } from "./redux/action";
import ProductDetail from "./components/ProductDetail";
import Orders from "./components/Orders";
import { AuthContext } from "./components/AuthProvider";

function App() {
  const {user,logout}=useContext(AuthContext)
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    dispatch(setProducts);
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

useEffect(() => {
  const checkLogin = () => {
    console.log("checking login")
    const now = Date.now();
    const loggedTime = localStorage.getItem("loginTime");

    if (loggedTime) {
      const elapsed = now - parseInt(loggedTime, 10);
      if (elapsed >= 30 * 60 * 1000) { 
        console.log("useeffect logging out")
        logout();
      }
      console.log()
    }
  };
  checkLogin();

  const interval = user && setInterval(checkLogin, 60000);

  return () => clearInterval(interval); 
}, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/men" element={<ShopMen />} />
          <Route path="/shop/women" element={<ShopWomen />} />
          <Route path="/shop/kids" element={<ShopKids />} />
          <Route path="/shop/home" element={<ShopHomeLiving />} />
          <Route path="/shop/beauty" element={<ShopBeauty />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route path="/product/:name" element={<ProductDetail />} />
          <Route path="/productId/:id" element={<ProductDetail />} />
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <WishList />
              </PrivateRoute>
            }
          />
          <Route
            path="/bag"
            element={
              <PrivateRoute>
                <Bag />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
