import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/product/${productId}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error("Erro ao obter detalhes do produto:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Carregando...</p>;
  }

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleArrowClick = (direction) => {
    if (direction === "prev") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : product.variations.length - 1
      );
    } else {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < product.variations.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  return (
    <div>
      <div>
        <h2>Single Item</h2>
        <div key={currentImageIndex} className="image-container">
          <img
            src={product.variations[currentImageIndex].urls[0]}
            alt={product.variations[currentImageIndex].color}
            style={{ width: "20%" }}
          />
          <div className="navigation-arrows">
            <div className="arrow" onClick={() => handleArrowClick("prev")}>
              &lt;
            </div>
            <div className="arrow" onClick={() => handleArrowClick("next")}>
              &gt;
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="dot-container">
        {product.variations?.map((variation, index) => (
          <span
            key={index}
            className={`dot ${index === currentImageIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      <h1>{product.name}</h1>
      <p>{product.price}</p>

      <div className="thumbnail-container">
        {product.variations.reduce((acc, variation, index, array) => {
          // Verifica se é a primeira variação ou se a cor é diferente da anterior
          if (index === 0 || variation.color !== array[index - 1].color) {
            // Adiciona o nome da cor
            acc.push(
              <div key={`color-name-${index}`} className="color-name">
                {`Cor: ${variation.color}`}
              </div>
            );
          }

          // Adiciona a miniatura
          acc.push(
            <div key={`thumbnail-${index}`} className="thumbnail-wrapper">
              <img
                src={variation.urls[0]}
                alt={variation.color}
                className={`thumbnail ${
                  index === currentImageIndex ? "active" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
              {variation.urls.slice(1, 4).map((url, i) => (
                <img
                  key={`preview-${index}-${i}`}
                  src={url}
                  alt={variation.color}
                  className="preview-thumbnail"
                  onClick={() => handleThumbnailClick(i + 1)}
                />
              ))}
            </div>
          );

          return acc;
        }, [])}
      </div>

      <Navbar />
    </div>
  );
};

export default ProductDetails;
