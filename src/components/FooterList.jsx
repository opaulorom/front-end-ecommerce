import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from "./FooterList.module.css"
import ClearIcon from '@mui/icons-material/Clear';

const FooterList = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriesHovered, setCategoriesHovered] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/allCategories');
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
    <div  >
      
      <ul 
        style={{ listStyleType: 'none',  }}
      >
        
       
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
        
        <div className={styles.FooterList}>
        {categories.map((category) => (
          <li key={category.category}>
            <Link to={`/categories/${category.category}`} style={{ textDecoration: 'none', color: "black", fontWeight: "700", whiteSpace: "nowrap",  }}>
              {category.category}
            </Link>
          </li>
        ))}
          
          <li>
        <Link to={"/newArrivals"} style={{ color: 'black', textDecoration: 'none' }}>

          <span style={{fontSize:"1rem"}}>Novidades</span>
        </Link>
        </li>
        </div>
       
     
        
      </ul>
      
    </div>
  );
};

export default FooterList;
