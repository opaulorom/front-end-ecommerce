import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./ProductDetails.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ColorThumbnail = ({ color, onClick, isSelected }) => {
  return (
    <div
      className={`color-thumbnail ${isSelected ? 'selected' : ''}`}
      style={{
        backgroundColor: color,
      }}
      onClick={onClick}
    />
  );
};

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
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

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0); // Reset to the first image when changing color
  };

  const getImageSource = () => {
    if (selectedColor !== null) {
      const selectedVariation = product.variations.find(
        (variation) => variation.color === selectedColor
      );

      return selectedVariation?.urls[currentImageIndex];
    }

    return product.variations?.[0]?.urls[currentImageIndex];
  };

  if (!product) {
    return <p>Carregando...</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosIcon />,
    nextArrow: <ArrowForwardIosIcon />,
  };

  return (
    <div>
      <img
        className="product-image"
        style={{ width: "20vw" }}
        src={getImageSource()}
        alt={product.name}
      />

      <h1>{product.name}</h1>
      <p>{product.price}</p>

      <div className="color-dots-container">
        {product.variations?.map((variation, index) => (
          <ColorThumbnail
            key={index}
            color={variation.color}
            isSelected={variation.color === selectedColor}
            onClick={() => handleColorClick(variation.color)}
          />
        ))}
      </div>

      <div>
        <h2>Single Item</h2>
        <Slider {...settings}>
          {product.variations?.map((variation, index) => (
            <div key={index}>
              <img
                src={variation.urls[currentImageIndex]}
                alt={variation.color}
                style={{ width: "50%", margin:"0 auto" }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <Navbar />
    </div>
  );
};

export default ProductDetails;
