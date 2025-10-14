import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { filtersHook } from "../customHook/filtersHook";
import Page from "./Page";

const ShopHomeLiving = () => {
  const [products, setProducts] = useState([]);
  const data = useSelector((store) => store.products);
  const [highestPrice, setHighestPrice] = useState();
  const filters = useSelector((store) => store.filters);
  useEffect(() => {
    const prods = filtersHook("home", data, filters);
    setProducts(prods);
    const maxPriceProducts = filtersHook("home", data, filters, true);
    const maxPrice = maxPriceProducts.length
      ? Math.max(...maxPriceProducts.map((p) => p.price))
      : 0;
    setHighestPrice(maxPrice);
  }, [data, filters]);

  return (
    <>
      <Page products={products} highestPrice={highestPrice}/>
    </>
  );
};

export default ShopHomeLiving;
