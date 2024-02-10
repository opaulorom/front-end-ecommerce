import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
const ImageGallery = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(6); // Defina o número de categorias por página
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');
        console.log('Categories Response:', response.data);

        if (response.data.categories && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        setError(`Error fetching categories: ${error.message}`);
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  // Função para avançar para a próxima página
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Função para retroceder para a página anterior
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Índices das categorias a serem exibidas na página atual
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  return (
    <div style={{ position:"relative"}}>
      <h2>Image Gallery</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {currentCategories.map(category => (
            <div key={category._id} style={{ width: '150px', height: '150px', margin: '10px', textAlign: 'center' }}>
              {category.images.map((subcategoryImages, index) => (
                subcategoryImages.map(image => (
                  <div key={image._id}>
                    <Link to={`/categories/${encodeURIComponent(category.name)}`}>
                      <img src={image.imageUrl} alt={`Image ${image._id}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius:"50%", aspectRatio:"1/1" }} />
                    </Link>
                    <div style={{ marginTop: '5px' }}>{category.name}</div>
                  </div>
                ))
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ArrowBackIosNewRoundedIcon onClick={prevPage} disabled={currentPage === 1} style={{fontSize:"2.5rem", position:"absolute", top:"50%", left:"8%", cursor:"pointer" }}></ArrowBackIosNewRoundedIcon>
            <ArrowForwardIosRoundedIcon onClick={nextPage} disabled={indexOfLastCategory >= categories.length} style={{fontSize:"2.5rem", position:"absolute", top:"50%", right:"8%", cursor:"pointer"}}></ArrowForwardIosRoundedIcon>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
