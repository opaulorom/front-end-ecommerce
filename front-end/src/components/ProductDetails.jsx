import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Slider from "./Slider";
import './ProductDetails.css';

const ColorDot = ({ color, onClick, selected }) => {
  return (
    <div
      className={`color-dot ${selected ? 'selected' : ''}`}
      style={{
        backgroundColor: color,
      }}
      onClick={() => onClick(color)}
    />
  );
};

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
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
  const getImagesByColor = (color) => {
    const variationsWithColor = product.variations.filter(
      (variation) => variation.color === color
    );
  
    const images = variationsWithColor.reduce((accumulator, variation) => {
      return accumulator.concat(variation.urls);
    }, []);
  
    return images;
  };
  
  
  console.log("Selected Color (before):", selectedColor);
  console.log("Images (before):", getImagesByColor(selectedColor, product.variations));

  const handleColorSelection = (color) => {
    setCurrentImage(0); // Reinicia para a primeira imagem ao selecionar uma nova cor
    setSelectedColor(color);
    setImages(getImagesByColor(color));
  };
  
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <div className="color-dots-container">
        {product.variations?.map((variation, index) => (
          <ColorDot
            key={index}
            color={variation.color}
            selected={variation.color === selectedColor}
            onClick={() => setSelectedColor(variation.color)}
          />
        ))}
      </div>

      {/* Exibe o slide de imagens para a cor selecionada */}
      {selectedColor && (
        <Slider imageUrls={getImagesByColor(selectedColor)} />
      )}
{product.variations.map((variation) => (
  <button key={variation._id} onClick={() => handleColorSelection(variation.color)}>
    {variation.color}
  </button>
))}

      <Navbar />
    </div>
  );
};

export default ProductDetails;
