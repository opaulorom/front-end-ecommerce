import React, { Fragment } from 'react'
import "../product/productDetails.css"
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { productDetails } from '../../actions/productActions';
import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
const ProductDetails = ({match ,}) => {
    const dispatch = useDispatch();


    const { loading, product } = useSelector((state) => state.productDetails);


    useEffect(() => {
      if(match){
        dispatch(productDetails(match.params.id))

      }
    }, [dispatch, match])

    if(!product){
        return "nenhum produto encontrado"
    }
    return (
      <Fragment>
      {loading ? <Loader/> : (
        <Fragment>
          <MetaData title={product.name}></MetaData>

        <div className="product-details">
        <div className="product-image">
          <img src={product.images} alt={product.name} />
        </div>
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <button className="btn-buy">Comprar</button>
        </div>
      </div>
        </Fragment>
      )}
      </Fragment>
      
    );
  };
  
  export default ProductDetails;