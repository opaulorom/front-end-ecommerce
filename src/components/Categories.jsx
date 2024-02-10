import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from './ImageGallery';

const Categories = () => {
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
    <div style={{
      marginTop:"15rem",
      marginBottom:"10rem"

    }}>
            <ImageGallery />
    

    </div>
  );
};

export default Categories;
