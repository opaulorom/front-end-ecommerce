import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from "./CategoriesList.module.css"
import CategoriesDesktop from './CategoriesDesktop';
import ClearIcon from '@mui/icons-material/Clear';
import { useConfig } from '../context/ConfigContext';
import { logPageView } from '../../analytics';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriesHovered, setCategoriesHovered] = useState(false);
  const modalRef = useRef(null);
  const { apiUrl } = useConfig();
 const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/allCategories`);
        const data = await response.json();
  
        setCategories(prevCategories => {
          const uniqueCategoriesSet = new Set([...prevCategories.map(c => c.category), ...data.map(c => c.category)]);
          const uniqueCategories = Array.from(uniqueCategoriesSet).map(category => ({ category }));
  
          // Limit the number of categories to 5
          const limitedCategories = uniqueCategories.slice(0, 7);
  
          return limitedCategories;
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
    if (modalRef.current && !modalRef.current.contains(event.target) && !modalRef.current.classList.contains(styles.modalContent)) {
      setModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
    <div style={{ marginTop: '15rem', overflow: 'hidden'}} className={styles.CategoriesList}>
      
      <ul 
        style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'row', gap: '2.5rem' }}
      >
        
        <li 
          style={{ textDecoration: 'none', color: "black", fontWeight: "700", whiteSpace: "nowrap", cursor:"pointer" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeaveCategories}
        >
          Categorias
        </li>

        {modalOpen && (
          <div 
            className={styles.modal} 
            ref={modalRef}
            onMouseLeave={handleMouseLeaveModal} // Adicione esse manipulador de eventos
          >
            <ClearIcon style={{fontSize:"2rem"}} className={styles.closeButton} onClick={handleCloseModal}></ClearIcon>
            <div className={styles.modalContent}>
              <CategoriesDesktop/>
            </div>
          </div>
        )}
        
        {categories.map((category) => (
          <li key={category.category}>
            <Link to={`/categories/${category.category}`} style={{ textDecoration: 'none', color: "black", fontWeight: "700", whiteSpace: "nowrap",  }}>
              {category.category}
            </Link>
          </li>
        ))}
        {/* <li>
          <Link to={"/whatsNew"} style={{ color: 'white', textDecoration: 'none' }}>

          <span style={{fontSize:"1rem"}}>Promoções</span>
          </Link>
        </li> */}
        <li>
        <Link to={"/newArrivals"} style={{ color: 'black', textDecoration: 'none' }}>

          <span style={{fontSize:"1rem"}}>Novidades</span>
        </Link>
        </li>
        
      </ul>
      
    </div>
  );
};

export default CategoriesList;
