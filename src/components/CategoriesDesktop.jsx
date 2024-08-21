import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageGalleryDesktop from './ImageGalleryDesktop';
import styles from "./CategoriesMobile.module.css"
import Navbar from './Navbar';
import { useConfig } from '../context/ConfigContext';

const CategoriesDesktop = () => {
  const [categories, setCategories] = useState([]);
  const { apiUrl } = useConfig();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/allCategories`);
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
      marginTop:"2rem",
      marginBottom:"10rem",
    

    }} className={styles.ImageGalleryDesktop}>
            <ImageGalleryDesktop />
          

    <Navbar/>

    </div>
  );
};

export default CategoriesDesktop;
