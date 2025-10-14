import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { filtersHook } from "../customHook/filtersHook";
import Page from "./Page";
const ShopWomen = () => {
  const [femaleProducts, setFemaleProducts] = useState([]);
  const data = useSelector((store) => store.products);
  const [highestPrice, setHighestPrice] = useState();
  const filters = useSelector((store) => store.filters);
  useEffect(() => {
    const prods = filtersHook("female", data, filters);
    setFemaleProducts(prods);
    const maxPriceProducts = filtersHook("female", data, filters, true);
    const maxPrice = maxPriceProducts.length
      ? Math.max(...maxPriceProducts.map((p) => p.price))
      : 0;
    setHighestPrice(maxPrice);
  }, [data, filters]);

  return (
    <>
      <Page products={femaleProducts} highestPrice={highestPrice}/>
    </>
  );
};

export default ShopWomen;
