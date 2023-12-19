import React from "react";
import "../product/product.css";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
        <div className="cardContainer r">
          <div className="clothes-card">
            <i className="imageContainer">
              {" "}
              <img src={product.images[0].url} alt="" className="card-image" />
            </i>
            <div className="card-details">
              <Link to={`/product/${product._id}`} className="card-title">
                {product.name}
              </Link>
              <p className="card-price">Preço: R${product.price}</p>
              <Link  to={`/product/${product._id}`} className="btn-saiba-mais">
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>

  );
};

export default Product;
