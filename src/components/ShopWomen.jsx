import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { filtersHook } from "../customHook/filtersHook";
import Page from "./Page";
const ShopWomen = () => {
  const [femaleProducts, setFemaleProducts] = useState([]);
  const data = useSelector((store) => store.products);
  const filters = useSelector((store) => store.filters);
  useEffect(() => {
    const women = filtersHook("female", data, filters);

    setFemaleProducts(women);
  }, [data, filters]);


  return (
    <>
    <Page products={femaleProducts}/>
    </>
  );
};

export default ShopWomen;
