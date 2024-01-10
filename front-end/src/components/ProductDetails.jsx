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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosIcon />,
    nextArrow: <ArrowForwardIosIcon />,
  };
  const handleThumbnailClick = (color) => {
    const index = product.variations.findIndex(
      (variation) => variation.color === color
    );

    if (index !== -1) {
      setCurrentImageIndex(index);
    }
  };

  console.log("Current Image Index:", currentImageIndex);

  return (
    <div>
      {/* Main Image Slider */}
      <div>
        <h2>Single Item</h2>
        <Slider {...settings}>
          {product.variations?.map((variation, index) => (
            <div key={index}>
              <img
                src={variation.urls[0]}
                alt={variation.color}
                style={{ width: "50%", margin: "0 auto" }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Thumbnails */}
      <div className="thumbnail-container">
        {product.variations?.map((variation, index) => (
          <img
            key={index}
            src={variation.urls[0]}
            alt={variation.color}
            className={`thumbnail ${
              index === currentImageIndex ? "active" : ""
            }`}
            onClick={() => handleThumbnailClick(variation.color)}
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
