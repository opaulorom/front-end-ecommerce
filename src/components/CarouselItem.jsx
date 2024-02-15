import React, { useState } from 'react';

const CarouselItem = ({ imageUrl }) => {
  return (
    <div className="carousel-item">
      <img src={imageUrl} alt="carousel" />
    </div>
  );
};

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button onClick={goToPrevSlide}>Anterior</button>
      <div className="carousel-wrapper">
        {images.map((image, index) => (
          <CarouselItem key={index} imageUrl={image} />
        ))}
      </div>
      <button onClick={goToNextSlide}>Próximo</button>
    </div>
  );
};

export default Carousel;
