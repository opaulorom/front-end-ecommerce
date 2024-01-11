// ProductSizes.jsx
import React from "react";
import "./ProductSizes.css"
const ProductSizes = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className="product-sizes">
      {sizes.map((size, index) => (
        <button
          key={index}
          className={`size-button ${size === selectedSize ? "active" : ""}`}
          onClick={() => onSelectSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default ProductSizes;
