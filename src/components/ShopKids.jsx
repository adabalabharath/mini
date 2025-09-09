import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { filtersHook } from '../customHook/filtersHook';
import Page from './Page';

const ShopKids = () => {
   const [products, setProducts] = useState([]);
   const data = useSelector((store) => store.products);
   const filters = useSelector((store) => store.filters);
   useEffect(() => {
     const prods = filtersHook("others", data, filters);
     setProducts(prods);
   }, [data, filters]);
 
   return (
     <>
       <Page products={products} />
     </>
   );
}

export default ShopKids