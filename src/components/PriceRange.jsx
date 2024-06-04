import React, { useState, useEffect } from 'react';

const PriceRange = ({ filteredProducts }) => {
  return (
    <div>
      {filteredProducts.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          {/* Adicione mais informações do produto conforme necessário */}
        </div>
      ))}
    </div>
  );
};

export default PriceRange;
