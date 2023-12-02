import React from 'react'
import "../product/productDetails.css"

const ProductDetails = ({ product }) => {
    return (
      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <button className="btn-buy">Comprar</button>
        </div>
      </div>
    );
  };
  
  export default ProductDetails;