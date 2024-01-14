import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/allCategories');
        setCategories(response.data); // Presumindo que o servidor retorna um array de categorias
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Categorias</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.category}>
            <h2>{category.category}</h2>
            {category.subcategories && (
              <ul>
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.subcategory}>
                    <h3>{subcategory.subcategory}</h3>
                    {subcategory.products && (
                      <ul>
                        {subcategory.products.map((product) => (
                          <li key={product._id}>
                            <p>R${product.price}</p>
                            <Link     key={product._id}
                to={`/products/${product._id}`}>
                            <img
                              src={product.variations[0].urls[0]}
                              alt="Capa do Produto"
                              style={{ maxWidth: '100%', maxHeight: '100px' }}
                            />
                            </Link>
                            <h4>{product.name}</h4>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
