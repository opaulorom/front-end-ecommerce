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

  return (
    <div>
      <div>
        <h2>Single Item</h2>
        <div key={currentImageIndex}>
          <img
            src={product.variations[currentImageIndex].urls[0]}
            alt={product.variations[currentImageIndex].color}
            style={{ width: "50%", margin: "0 auto" }}
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="thumbnail-container">
        {product.variations?.map((variation, index) => (
          <img
            key={index}
            src={variation.urls[0]}
            alt={variation.color}
            className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>

      <h1>{product.name}</h1>
      <p>{product.price}</p>

      <Navbar />
    </div>
  );
};

export default ProductDetails;
