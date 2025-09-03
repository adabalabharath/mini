import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { filtersHook } from '../customHook/filtersHook';
import { AuthContext } from './AuthProvider';
import Page from './Page';

const WishList = () => {
  const [products, setProducts] = useState([]);
  const filters = useSelector((store) => store.filters);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const prods = filtersHook("", user.wishlist, filters);
    setProducts(prods);
  }, [user.wishlist, filters]);

  return <Page products={products} />;
}

export default WishList