import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DiscountProducts = () => {
  const [products, setProducts] = useState(null);
  const { discount } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/productsByDiscountPercentage/${discount}`,
        );
        setProducts(response.data.productsWithDiscount);
      } catch (error) {
        console.error('Erro ao obter produtos:', error);
      }
    };

    fetchData();
  }, [discount]);

  return (
    <div>
      {Array.isArray(products) && products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Desconto: {product.discountPercentage}%</p>
          <p>Preço: R${product.price.toFixed(2)}</p>
          <p>Preço anterior: R${product.previousPrice.toFixed(2)}</p>
          <img src={product.variations[0].urls[0]} alt={product.name} />
        </div>
      ))}
    </div>
  );
};

export default DiscountProducts;
