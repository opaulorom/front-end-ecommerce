import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./CategoriesList.module.css"
const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://serveradmin-whhj.onrender.com/api/allCategories');
        const data = await response.json();

        setCategories(prevCategories => {
          // Use um conjunto temporário para armazenar categorias únicas
          const uniqueCategoriesSet = new Set([...prevCategories.map(c => c.category), ...data.map(c => c.category)]);
          const uniqueCategories = Array.from(uniqueCategoriesSet).map(category => ({ category }));

          return uniqueCategories;
        });
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: '15rem'}} className={styles.CategoriesList}>
    <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'row', gap: '2.5rem' }}>
      {categories.map((category) => (
        <li key={category.category}>
          <Link to={`/categories/${category.category}`} style={{ textDecoration: 'none', color:"white", fontWeight:"700" }}>
            {category.category}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default CategoriesList;
