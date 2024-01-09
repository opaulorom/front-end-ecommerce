import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data.products);
        console.log("data", response.data.products);

      } catch (error) {
        console.log('Erro ao obter produtos', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Link key={product._id} to={`/products/${product._id}`} className="product-link">
          <div className="product-card">
            {/* Verifica se 'variations' existe e tem pelo menos uma variação e uma URL */}
            {product.variations && product.variations.length > 0 && product.variations[0].urls && product.variations[0].urls.length > 0 && (
              <img className="image" src={product.variations[0].urls[0]} alt="" />
            )}
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            {/* Certifica-se de que 'product.variations[0].color' está definido antes de acessá-lo */}
            {product.variations && product.variations.length > 0 && (
              <div
                style={{
                  backgroundColor: product.variations[0].color,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                }}
              ></div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
