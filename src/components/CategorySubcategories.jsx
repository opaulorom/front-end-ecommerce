import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategorySubcategories = () => {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState([]);

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

    fetchSubcategories();
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
    </div>
  );
};

export default CategorySubcategories;
