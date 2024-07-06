import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./FooterList.module.css"

const FooterList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/allCategories');
        const data = await response.json();
  
        // Extrair categorias únicas
        const uniqueCategoriesSet = new Set([...categories.map(c => c.category), ...data.map(c => c.category)]);
        const uniqueCategories = Array.from(uniqueCategoriesSet).map(category => ({ category }));
  
        // Limitar o número de categorias a 5
        const limitedCategories = uniqueCategories.slice(0, 2);
  
        setCategories(limitedCategories);
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div>
      <ul style={{ listStyleType: 'none' }}>
        <div className={styles.FooterList}>
          {categories.map((category) => (
            <li key={category.category}>
              <Link to={`/categories/${category.category}`} style={{ textDecoration: 'none', color: "black", fontWeight: "700", whiteSpace: "nowrap" }}>
                {category.category}
              </Link>
            </li>
          ))}
          
          <li>
            <Link to={"/newArrivals"} style={{ color: 'black', textDecoration: 'none' }}>
              <span>Novidades</span>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default FooterList;
