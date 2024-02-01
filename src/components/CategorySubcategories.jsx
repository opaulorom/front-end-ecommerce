import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategorySubcategories = () => {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [mixedProducts, setMixedProducts] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/subcategories/${category}`);
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error('Erro ao obter subcategorias:', error);
      }
    };

    const fetchMixedProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/categories/${category}/mixedProducts`);
        const data = await response.json();
        setMixedProducts(data.mixedProducts);
      } catch (error) {
        console.error('Erro ao obter produtos misturados:', error);
      }
    };

    fetchSubcategories();
    fetchMixedProducts();
  }, [category]);
  
  return (
    <div>
      <h1>Subcategories of {category}</h1>
      <ul>
        {subcategories.map(subcategory => (
          <li key={subcategory}>
            <Link to={`/categories/${category}/${subcategory}`}>
              {subcategory}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Mixed Products of {category}</h2>
      <ul>
        {mixedProducts.map(product => (
          <li key={product._id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySubcategories;
