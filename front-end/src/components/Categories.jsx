import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Categories = () => {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getAllCategories');
        setCategoriesWithProducts(response.data.categoriesWithProducts);
      } catch (error) {
        console.error('Erro ao obter categorias e produtos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      {categoriesWithProducts.map((category) => (
        <div key={category.category}>
          <h2>{category.category}</h2>
          <ul>
            {category.subcategories.map((subcategory) => (
              <li key={subcategory}>
                <h3>{subcategory}</h3>
                <ul>
                  {category.products
                    .filter((product) => product.subcategory === subcategory)
                    .map((product) => (
                      <li key={product._id}>
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        {/* Aqui você pode adicionar mais detalhes do produto conforme necessário */}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Categories;
