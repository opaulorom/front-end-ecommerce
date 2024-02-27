import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./ProductDetails.css";
import ProductSizes from "./ProductSizes";
import Header from "./Header";
import FreteComponent from "./FreteComponent";
import { useUser } from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizesFromDatabase, setSizesFromDatabase] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const { isSignedIn, user, isLoaded } = useUser();
  const [openCartModal, setOpenCartModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/product/${productId}`
        );
        setProduct(response.data.product);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenCartModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    const clerkUserId = user.id;

    try {
      addToCart();

      const response = await axios.post(
        `http://localhost:3001/api/add-to-cart/${clerkUserId}`,
        {
          productId: product._id,
          size: selectedSize,
          color: product.variations[currentImageIndex].color,
          quantity: 1,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
    }
  };

  const handleClickOpenModal = () => {
    setOpenCartModal(true);
  };

  const handleClickCloseModal = () => {
    setOpenCartModal(false);
  };

  const handleAddToCartAndOpenModal = () => {
    handleAddToCart();
    handleClickOpenModal();
  };

  return (
    <div>
      <Header />

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

      <div className="dot-container">
        {product.variations?.map((variation, index) => (
          <span
            key={index}
            className={`dot ${index === currentImageIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

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
        selectedSize={selectedSize}
        onSelectSize={(size) => setSelectedSize(size)}
      />

      <FreteComponent />

      <button onClick={handleAddToCartAndOpenModal}>
        Adicionar ao Carrinho
      </button>
      {openCartModal && (
        <div className={styles.cartModal}>
          <div ref={modalRef} className={styles.cartModalContent}>
            <span className={styles.cartClose} onClick={handleClickCloseModal}>
              &times;
            </span>
            <p>This is the content of the modal. You can put anything here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
