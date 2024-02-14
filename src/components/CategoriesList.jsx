import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from "./CategoriesList.module.css"
import CategoriesDesktop from './CategoriesDesktop';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriesHovered, setCategoriesHovered] = useState(false);
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

  const handleMouseEnter = () => {
    if (!modalOpen && !categoriesHovered) {
      setModalOpen(true);
    }
    setCategoriesHovered(true);
  };

  const handleMouseLeaveModal = () => {
    if (modalOpen) {
      setModalOpen(false);
    }
  };

  const handleMouseLeaveCategories = () => {
    setCategoriesHovered(false);
  };

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutsideModal);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [modalOpen]);

  return (
    <div style={{ marginTop: '15rem'}} className={styles.CategoriesList}>
      <ul 
        style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'row', gap: '2.5rem' }}
      >
        <li 
          style={{ textDecoration: 'none', color: "white", fontWeight: "700", whiteSpace: "nowrap", cursor:"pointer" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeaveCategories}
        >
          Categorias
        </li>
        {modalOpen && (
          <div 
            className={styles.modal} 
            ref={modalRef}
          >
            <button className={styles.closeButton} onClick={() => setModalOpen(false)}>X</button>
            <div className={styles.modalContent}>
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
