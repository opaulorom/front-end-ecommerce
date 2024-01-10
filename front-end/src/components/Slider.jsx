import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = ({ imageUrls }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  const autoChangeImage = () => {
    const nextImage = (currentImage + 1) % imageUrls.length;
    setCurrentImage(nextImage);
  };

  useEffect(() => {
    const timer = setInterval(autoChangeImage, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [currentImage]);

  // Variáveis para rastrear o movimento de toque
  let touchStartX = 0;
  let touchEndX = 0;

  // Função para lidar com o deslize
  const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const minSwipeDistance = 50; // Distância mínima de deslize para ativar a mudança de imagem

    if (touchStartX - touchEndX > minSwipeDistance) {
      // Deslizar para a esquerda (avançar para a próxima imagem)
      const nextImage = (currentImage + 1) % imageUrls.length;
      setCurrentImage(nextImage);
    } else if (touchEndX - touchStartX > minSwipeDistance) {
      // Deslizar para a direita (retroceder para a imagem anterior)
      const prevImage = currentImage === 0 ? imageUrls.length - 1 : currentImage - 1;
      setCurrentImage(prevImage);
    }
  };

  const prevSlide = () => {
    const prevImage = currentImage === 0 ? imageUrls.length - 1 : currentImage - 1;
    setCurrentImage(prevImage);
  };

  const nextSlide = () => {
    const nextImage = (currentImage + 1) % imageUrls.length;
    setCurrentImage(nextImage);
  };

  return (
    <div className="slider" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="image-container">
        <img
          src={imageUrls[currentImage]}
          alt={`Image ${currentImage}`}
          style={{ maxWidth: '30%' }}
        />
        <div className="arrows">
          <button className="arrow left" onClick={prevSlide}>{'<'}</button>
          <button className="arrow right" onClick={nextSlide}>{'>'}</button>
        </div>
        <div className="dots">
          {imageUrls.map((image, index) => (
            <span
              key={index}
              className={`dot ${index === currentImage ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
