import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./ProductDetails.css";
import ProductSizes from "./ProductSizes";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizesFromDatabase, setSizesFromDatabase] = useState([]);
  const [selectedSize, setSelectedSize] = useState(""); // Adiciona este estado

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/product/${productId}`
        );
        setProduct(response.data.product);
        // Supondo que os tamanhos estejam em uma string no formato "M, H, SS"
        const sizesArray = response.data.product.size
          .split(",")
          .map((size) => size.trim());
        setSizesFromDatabase(sizesArray);
      } catch (error) {
        console.error("Erro ao obter detalhes do produto:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Carregando...</p>;
  }

  const handleThumbnailClick = (color, index) => {
    const colorVariations = product.variations.filter(
      (variation) => variation.color === color
    );

    const firstIndexInColor = product.variations.findIndex(
      (variation) => variation.color === colorVariations[0].color
    );

    setCurrentImageIndex(firstIndexInColor);
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
            style={{ width: "30%" }}
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

      {/* Thumbnails */}
      <div className="thumbnail-container">
        {product.variations
          ?.filter(
            (variation, index, self) =>
              self.findIndex((v) => v.color === variation.color) === index
          )
          .map((variation, index) => (
            <div key={index} className="thumbnail-wrapper">
              <span className="color-name">{`Cor: ${variation.color}`}</span>
              <img
                src={variation.urls[0]}
                alt={variation.color}
                className={`thumbnail ${
                  variation.color ===
                  product.variations[currentImageIndex].color
                    ? "active"
                    : ""
                }`}
                onClick={() => handleThumbnailClick(variation.color, index)}
              />
            </div>
          ))}
      </div>

     

      <h1>{product.name}</h1>
      <p>R$: ${product.price}</p>
      <p>${product.description}</p>

      <Navbar />
      <ProductSizes
        sizes={sizesFromDatabase}
        selectedSize={selectedSize} // Passa o tamanho selecionado como propriedade
        onSelectSize={(size) => setSelectedSize(size)} // Função para atualizar o tamanho selecionado
      />    </div>
  );
};

export default ProductDetails;
