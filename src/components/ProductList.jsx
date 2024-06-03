import React from 'react';

export default function ProductList({ products }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id} style={{
            border: "2px solid gray"
        }}>
          {product.name} - Tamanho: {product.size}

        </li>
      ))}
    </ul>
  );
}
