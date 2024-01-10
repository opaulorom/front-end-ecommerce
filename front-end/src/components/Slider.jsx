import React, { useState } from "react";
import './Slider.css';  // Importe o arquivo de estilo para o slider (crie um arquivo Slider.css)

const Slider = ({ imageUrls, currentIndex, onChange }) => {
  const handleNext = () => {
    onChange((currentIndex + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    onChange((currentIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div className="slider">
      <button className="slider-button" onClick={handlePrev}>
        {"<"}
      </button>
      <img
        className="slider-image"
        src={imageUrls[currentIndex]}
        alt={`Slider ${currentIndex + 1}`}
      />
      <button className="slider-button" onClick={handleNext}>
        {">"}
      </button>
    </div>
  );
};

export default Slider