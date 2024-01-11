import React, { useState } from "react";

const ProductSizes = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div>
      <h3>Escolha o tamanho:</h3>
      <div className="size-buttons">
        {sizes.map((size, index) => (
          <button
            key={index}
            className={`size-button ${size === selectedSize ? "selected" : ""}`}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizes;
