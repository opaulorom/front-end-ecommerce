import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
const ImageGalleryMobile = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(6); // Defina o número de categorias por página
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://serveradmin-whhj.onrender.com/api/categories');
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
  const indexOfFirstCategory = (currentPage - 1) * categoriesPerPage;

  // Índice final da última categoria a ser exibida na página atual
  let indexOfLastCategory = Math.min(indexOfFirstCategory + categoriesPerPage, categories.length - 1);

  // Verificar se o índice final excede o número total de categorias
  if (indexOfLastCategory >= categories.length - 1) {
    indexOfLastCategory = categories.length - 1;
  }

  // Slice para obter apenas as categorias da página atual
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory + 1);

  // Estilo para as setas de navegação
  const arrowStyle = {
    fontSize: '2.5rem',
    cursor: 'pointer',
    margin: '0 5px', // Espaçamento entre as setas
  };

  // Calcular a largura total das categorias exibidas
  const totalWidth = currentCategories.length * 170; // Supondo que a largura de cada categoria seja de 170px

  // Estilo para o contêiner das setas de navegação
  const arrowsContainerStyle = {
    position: 'absolute',
    bottom: '10px',
    left: `calc(50% - ${totalWidth / 2}px)`,
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <div style={{ position: 'relative' }}>
      <h2>Image Gallery</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
          {currentCategories.map(category => (
            <div key={category._id} style={{ width: '150px', height: '150px', margin: '10px', textAlign: 'center' }}>
              {category.images.map((subcategoryImages, index) => (
                subcategoryImages.map(image => (
                  <div key={image._id}>
                    <Link to={`/categories/${encodeURIComponent(category.name)}`}>
                      <img src={image.imageUrl} alt={`Image ${image._id}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "50%", aspectRatio: "1/1" }} />
                    </Link>
                    <div style={{ marginTop: '5px' }}>{category.name}</div>
                  </div>
                ))
              ))}
            </div>
          ))}
        </div>
        <div style={arrowsContainerStyle}>
          <ArrowBackIosNewRoundedIcon onClick={prevPage} disabled={currentPage === 1} style={arrowStyle} />
          <ArrowForwardIosRoundedIcon onClick={nextPage} disabled={indexOfLastCategory >= categories.length - 1} style={arrowStyle} />
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryMobile;
