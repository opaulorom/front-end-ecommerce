import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useNavigate } from 'react-router-dom';
const Slider = ({ alt, imageWidth, imageHeight, autoPlayInterval }) => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');
        console.log('Categories Response:', response.data);

        if (response.data.categories && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories.slice(0, 3)); // Mostrar apenas as primeiras três categorias
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    const autoPlayTimer = setInterval(nextImage, autoPlayInterval || 4000);

    return () => clearInterval(autoPlayTimer);
  }, [currentIndex, categories, autoPlayInterval]);
  const imageStyle = {

    objectFit: 'contain',
    borderRadius: '8px',
    marginTop:"8rem",
    width: "100%",
    height: "100%",
    maxWidth:"calc(100% - 24px)",
    maxHeight: "none",
    boxSizing: "border-box"
    
  };

  

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '24px',
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      {categories.map((category, index) => (
        <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
          {category.images.map((subcategoryImages, subIndex) => (
            <div key={subIndex}>
              {subcategoryImages.map((image, imageIndex) => (
                <div key={imageIndex} style={{ display: 'inline-block', margin: '10px' }}>
                  <Link to={`/categories/${encodeURIComponent(category.name)}`}>
                    <img src={image.imageUrl} alt={`Image ${image._id}`}  style={imageStyle} />
                  </Link>
                  <div style={{ marginTop: '5px' }}>{category.name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, cursor: 'pointer', fontSize: '24px' }} onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length)}>
        <ArrowBackIosIcon style={{ fontSize: '2rem' }} />
      </div>
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 0, cursor: 'pointer', fontSize: '24px' }} onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length)}>
        <ArrowForwardIosIcon style={{ fontSize: '2rem' }} />
      </div>
    </div>
  );
};

export default Slider;
