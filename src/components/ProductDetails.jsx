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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizesFromDatabase, setSizesFromDatabase] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const { isSignedIn, user, isLoaded } = useUser();
  const [openCartModal, setOpenCartModal] = useState(false);
  const modalRef = useRef(null);
  const [isColorAndSizeSelected, setIsColorAndSizeSelected] = useState(false);

  const { cartItemCount, addToCart } = useCart();

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

  const handleAddToCart = async () => {
    const clerkUserId = user.id;

    try {
      const response = await axios.post(
        `http://localhost:3001/api/add-to-cart/${clerkUserId}`,
        {
          productId: product._id,
          size: selectedSize,
          color: product.variations[currentImageIndex].color,
          quantity: 1,
        }
      );

      addToCart(); // Incrementa o número de itens no carrinho
      toast.success("Produto adicionado ao carrinho!");
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
    if (selectedSize && product.variations[currentImageIndex].color) {
      handleAddToCart();
      handleClickOpenModal();
    } else {
      // Se a cor ou o tamanho não foram selecionados, exiba um alerta
      toast.error("Por favor, selecione uma cor e um tamanho.");
    }
  };

  return (
    <>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Header />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "10rem" 
          }}
        >
          <div >
            
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
            <div className="dot-container">
              {product.variations?.map((variation, index) => (
                <span
                  key={index}
                  className={`dot ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>

          <div style={{}}>
            <h1>{product.name}</h1>
            <p>R$: ${product.price}</p>
            <p>${product.description}</p>

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
                      onClick={() =>
                        handleThumbnailClick(variation.color, index)
                      }
                    />
                  </div>
                ))}
            </div>
            <ProductSizes
              sizes={sizesFromDatabase}
              selectedSize={selectedSize}
              onSelectSize={(size) => {
                setSelectedSize(size);
                setIsColorAndSizeSelected(true);
              }}
            />
            <button onClick={handleAddToCartAndOpenModal}>
              Adicionar ao Carrinho
            </button>
            {openCartModal && (
              <div className={styles.modal}>
                <div ref={modalRef} className={styles.modalContent}>
                  <span
                    className={styles.close}
                    onClick={handleClickCloseModal}
                  >
                    &times;
                  </span>
                  <p>
                    This is the content of the modal. You can put anything here.
                  </p>
                </div>
              </div>
            )}
            <FreteComponent />
          </div>
        </div>

        <Navbar />
      </div>
    </>
  );
};

export default ProductDetails;
