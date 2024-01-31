// CategoryProducts.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryProducts = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/subcategoriesAndProductsByName/${category}/${subcategory}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter produtos da subcategoria:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);


  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div>
      <h1>{subcategory} Products</h1>
      <ul>
        {products.map(product => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <li>
              {product.name} - {product.price}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;
