import React, { Fragment, useEffect } from "react";
import "../components/Home.css";
import MetaData from "../components/Layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";

import Product  from "../components/product/Product"

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? <h1>Carregando... </h1> : (
        <Fragment>
          <MetaData title={"Melhores variedades de Roupas"}></MetaData>
        {products &&
          products.map((product) => (
           <Product key={product._id} product={product}></Product>
          ))}
        </Fragment>
      )}
      
    </Fragment>
  );
};

export default Home;
