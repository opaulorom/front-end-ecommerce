import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DiscountProducts = () => {
  const [products, setProducts] = useState(null);
  const { discount } = useParams();
  const { apiUrl } = useConfig();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/productsByDiscountPercentage/${discount}`,
        );
        setProducts(response.data.productsWithDiscount);
      } catch (error) {
        console.error('Erro ao obter produtos:', error);
      }
    };

    fetchData();
  }, [discount]); 
   const formatPrice = (price) => {
    // Formatar o preço para adicionar o traço sobre ele
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div>
      {Array.isArray(products) && products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Desconto: {product.discountPercentage}%</p>
          <p>Preço: R${product.price.toFixed(2)}</p>
          <p>Preço anterior: <span style={{ textDecoration: 'line-through', color: '#8c8c8c' }}>{formatPrice(product.previousPrice)}</span></p>
          <img src={product.variations[0].urls[0]} alt={product.name} />
        </div>
      ))}
    </div>
  );
};

export default DiscountProducts;
