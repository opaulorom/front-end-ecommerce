import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DiscountImageCarousel = ({ alt, imageWidth, imageHeight }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response50 = await axios.get('http://localhost:3001/api/sliderByDiscount/50');
        const response15 = await axios.get('http://localhost:3001/api/sliderByDiscount/15');
        const response70 = await axios.get('http://localhost:3001/api/sliderByDiscount/70');

        setImageUrls([
          response50.data.sliders[0].image,
          response15.data.sliders[0].image,
          response70.data.sliders[0].image,
        ]);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
        // Handle error gracefully, e.g., display a placeholder image or error message
      }
    };

    fetchImageUrls();
  }, []);

  // Função para avançar para a próxima imagem no carrossel
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  // Estilos CSS
  const carouselContainerStyle = {
    position: 'relative',
    textAlign: 'center',
  };

  const imageStyle = {
    width: imageWidth || '100vw', // Tamanho fixo da largura da imagem
    height: imageHeight || '80vh', // Tamanho fixo da altura da imagem
    objectFit: 'cover', // Mantém a proporção da imagem sem distorção
    borderRadius: '8px', // Borda arredondada (opcional)
  };589

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '24px',
  };

  return (
    <div style={carouselContainerStyle}>
      <Link to={`/products/discount/${[50, 15, 70][currentIndex]}/category/Feminina`}>
        <img src={imageUrls[currentIndex]} alt={alt} style={imageStyle} />
      </Link>
      <div style={{ ...arrowStyle, left: 0 }} onClick={nextImage}>
        &#10094;
      </div>
      <div style={{ ...arrowStyle, right: 0 }} onClick={nextImage}>
        &#10095;
      </div>
    </div>
  );
};

export default DiscountImageCarousel;
