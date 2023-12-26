import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data.products);
      } catch (error) {
        console.log('Erro ao obter produtos', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <Link key={product._id} to={`/products/${product._id}`} className='product-link'>
          <div className='product-card'>
            <img className='image' src={product.images[0].url} alt="" />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <div
              style={{
                backgroundColor: product.color,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
              }}
            ></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
