import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from "./CategoriesList.module.css"
import CategoriesDesktop from './CategoriesDesktop';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalHovering, setIsModalHovering] = useState(false);
  const [isCloseButtonClicked, setIsCloseButtonClicked] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://serveradmin-whhj.onrender.com/api/allCategories');
        const data = await response.json();

        setCategories(prevCategories => {
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && !isCloseButtonClicked) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen, isCloseButtonClicked]);

  const handleCloseModal = () => {
    setIsCloseButtonClicked(true);
    setModalOpen(false);
  };

  return (
    <div style={{ marginTop: '15rem'}} className={styles.CategoriesList}>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'row', gap: '2.5rem' }}>
        <li 
          style={{ textDecoration: 'none', color: "white", fontWeight: "700", whiteSpace: "nowrap", cursor:"pointer" }}
          onMouseEnter={() => setModalOpen(true)}
          onMouseLeave={() => setIsModalHovering(false)}
        >
          Categorias
        </li>
        {modalOpen && (
          <div 
            className={styles.modal} 
            onMouseEnter={() => setIsModalHovering(true)}
            onMouseLeave={() => setIsModalHovering(false)}
            ref={modalRef}
      
          >
            <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>X</button>

              <CategoriesDesktop/>

            </div>
          </div>
        )}
        {categories.map((category) => (
          <li key={category.category}>
            <Link to={`/categories/${category.category}`} style={{ textDecoration: 'none', color: "white", fontWeight: "700", whiteSpace: "nowrap" }}>
              {category.category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
