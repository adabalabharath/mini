import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { filtersHook } from '../customHook/filtersHook';
import Page from './Page';

const ShopHomeLiving = () => {
  const [products, setProducts] = useState([]);
    const data = useSelector((store) => store.products);
    const filters = useSelector((store) => store.filters);
    useEffect(() => {
      const prods = filtersHook("home", data, filters);
      setProducts(prods);
    }, [data, filters]);
  
    return (
      <>
        <Page products={products} />
      </>
    );
}

export default ShopHomeLiving