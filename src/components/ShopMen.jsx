import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { filtersHook } from "../customHook/filtersHook";
import Page from "./Page";
const ShopMen = () => {
  const [products, setProducts] = useState([]);
  const [highestPrice, setHighestPrice] = useState();
  const data = useSelector((store) => store.products);
  const filters = useSelector((store) => store.filters);

  const filteredProducts = useMemo(() => {
    return filtersHook("male", data, filters);
  }, [data, filters]);

  const maxPrice = useMemo(() => {
    if (!filteredProducts.length) return 0;
    return Math.max(...filteredProducts.map((p) => p.price));
  }, [filteredProducts]);

  useEffect(() => {
    setProducts(filteredProducts)
    setHighestPrice(maxPrice)
  }, [filteredProducts]);

  return (
    <>
      <Page products={products} highestPrice={highestPrice} />
    </>
  );
};

export default ShopMen;
