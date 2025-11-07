import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { filtersHook } from "../customHook/filtersHook";
import Page from "./Page";
const ShopWomen = () => {
  const [femaleProducts, setFemaleProducts] = useState([]);
  const data = useSelector((store) => store.products);
  const [highestPrice, setHighestPrice] = useState();
  const filters = useSelector((store) => store.filters);
  const filteredProducts = useMemo(() => {
    return filtersHook("female", data, filters);
  }, [data, filters]);

  const maxPrice = useMemo(() => {
    if (!filteredProducts.length) return 0;
    return Math.max(...filteredProducts.map((p) => p.price));
  }, [filteredProducts]);

  useEffect(() => {
    setFemaleProducts(filteredProducts)
    setHighestPrice(maxPrice)
  }, [filteredProducts]);

  return (
    <>
      <Page products={femaleProducts} highestPrice={highestPrice} />
    </>
  );
};

export default ShopWomen;
