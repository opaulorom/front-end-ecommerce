import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Slider from "./Slider";
import "./ProductDetails.css";


const ColorDot = ({ color, onClick, selected, thumbnails }) => {
  return (
    <div
      className={`color-dot ${selected ? "selected" : ""}`}
      style={{
        backgroundColor: color,
      }}
      onClick={() => onClick(color, thumbnails)}
    >
      {thumbnails.map((thumbnail, index) => (
        <img
          key={index}
          src={thumbnail}
          alt={`Thumbnail for ${color}`}
          className="thumbnail-image"
        />
      ))}
    </div>
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

  const getImagesByColor = (color) => {
    const variationsWithColor = product.variations.filter(
      (variation) => variation.color === color
    );

    const images = variationsWithColor.reduce((accumulator, variation) => {
      return accumulator.concat(variation.urls);
    }, []);

    return images;
  };

  const handleColorSelection = (color, thumbnails) => {
    setCurrentImage(0);
    setSelectedColor(color);
    setImages(getImagesByColor(color));
  };

  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <div className="color-dots-container">
        {product.variations?.map((variation, index) => (
          <ColorDot
            key={index}
            color={variation.color}
            selected={variation.color === selectedColor}
            onClick={handleColorSelection}
            thumbnails={variation.urls}
          />
        ))}
      </div>

      {selectedColor && <Slider imageUrls={images} />}

      <h1>{product.name}</h1>
      <p>{product.price}</p>

      <Navbar />
    </div>
  );
};

export default ProductDetails;