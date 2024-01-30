import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/allCategories');
        const data = await response.json();

        setCategories(prevCategories => {
          // Remove duplicatas antes de adicionar as novas categorias
          const uniqueCategories = data.filter((category, index, self) =>
            index === self.findIndex(c => c.category === category.category)
          );

          return [...prevCategories, ...uniqueCategories];
        });
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.category}>
            <Link to={`/categories/${category.category}`}>
              {category.category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
