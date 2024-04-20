import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./ProductDetails.css";
import ProductSizes from "./ProductSizes";
import Header from "./Header";
import FreteComponent from "./FreteComponent";
import { useCart } from "../context/CartContext";
import styles from "./ProductDetails.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import CartB from "./CartB";
import CircularIndeterminate from "./CircularIndeterminate";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sizesFromDatabase, setSizesFromDatabase] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [openCartModal, setOpenCartModal] = useState(false);
  const modalRef = useRef(null);
  const [isColorAndSizeSelected, setIsColorAndSizeSelected] = useState(false);
  const [customer, setCustomer] = useState([]);
  const { cartItemCount, addToCart } = useCart();
  const userId = Cookies.get("userId"); // Obtenha o token do cookie
  const [openSecondCartModal, setOpenSecondCartModal] = useState(false);
  const credentials = Cookies.get('role'); // Obtenha as credenciais do cookie
  const [selectedColorImage, setSelectedColorImage] = useState("");
  const [showCartButton, setShowCartButton] = useState(false)
  const token = Cookies.get('token'); // Obtenha o token do cookie
  
 
  useEffect(() => {
    const userId = Cookies.get("userId");

    axios
      .get(`http://localhost:3001/api/customer/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCustomer(response.data);
        if (!response.data || response.data.length === 0 ) {
          setShowCartButton(false);
          handleClickOpenModal();
        } else {
          setShowCartButton(true);
          handleClickOpenCartModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 

const handleClickOpenButton = () => {
  setShowCartButton(true)

}
const handleClickCloseButton = () => {
  setShowCartButton(false)
}
  
const handleOpenButton = async () => {

    handleClickOpenButton()

 
}

  useEffect(() => {
    const fetchProduct = async () => {
      const userId = Cookies.get("userId"); // Obtenha o token do cookie

      try {

        const response = await axios.get(
          `http://localhost:3001/api/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
          
            },
          }
        );
        setProduct(response.data.product);
        const sizesArray = response.data.product.size
          .split(",")
          .map((size) => size.trim());
        setSizesFromDatabase(sizesArray);
        if (response.data.product.variations.length > 0) {
          setSelectedColorImage(response.data.product.variations[0].urls[0]);
        }

 
      } catch (error) {
        console.error("Erro ao obter detalhes do produto:", error);
      }
    };

    fetchProduct();
  }, [productId]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (modalRef.current && !modalRef.current.contains(event.target)) &&
        (openCartModal || openSecondCartModal)
      ) {
        setOpenCartModal(false);
        setOpenSecondCartModal(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCartModal, openSecondCartModal]);
  

  if (!product) {
    return
    <div style={{
      display:"flex",
      justifyContent:"center",
      marginTop:"15rem"

    }}>
    <CircularIndeterminate/>;
    </div>
  }
  

  const handleThumbnailClick = (color, index) => {
    const colorVariations = product.variations.filter(
      (variation) => variation.color === color
    );
  
    const firstIndexInColor = product.variations.findIndex(
      (variation) => variation.color === colorVariations[0].color
    );

    setCurrentImageIndex(firstIndexInColor);
  
    // Log das URLs de imagem para a cor selecionada
  
    // Atualize o estado com a URL da imagem correspondente à cor selecionada
    setSelectedColorImage(product.variations[firstIndexInColor].urls[0]);
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

    try {
      const userId = Cookies.get("userId"); // Obtenha o token do cookie

      const response = await axios.post(
        `http://localhost:3001/api/add-to-cart/${userId}`,
      
        {
          productId: product._id,
          size: selectedSize, // Aqui está sendo enviado o tamanho selecionado
          color: product.variations[currentImageIndex].color,
          quantity: 1,
          image: selectedColorImage, // Envie a URL da imagem selecionada
       
        },
       
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

//  modal do carrinho 

  const handleClickOpenCartModal = () => {
    setOpenSecondCartModal(true);
  };

  const handleClickCloseCartModal  = () => {
    setOpenSecondCartModal(false);
  };
  
  const handleAddToCartAndOpenModal = async () => {
    if (selectedSize && product.variations[currentImageIndex].color) {
      // Verifica se o tamanho e a cor estão selecionados
  
  
      try {
        const response = await axios.post(
          `http://localhost:3001/api/add-to-cart/${userId}`,
          {
            productId: product._id,
            size: selectedSize,
            color: product.variations[currentImageIndex].color,
            quantity: 1,
            image: selectedColorImage,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
    
            },
          },
        );
     
       
        addToCart(); // Atualiza o contexto do carrinho para refletir a adição do novo item
        toast.success("Produto adicionado ao carrinho!");
      } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
      }
    } else {
      // Se a cor ou o tamanho não foram selecionados, exiba um alerta
      toast.error("Por favor, selecione uma cor e um tamanho.");
    }

    if (cartItemCount < 3) {
      handleAddToCart();
  
    } else {
      // Se o número de itens exceder três, exiba um alerta
      toast.error("Você só pode adicionar até 4 produtos por vez ao carrinho.");
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
          style={{marginTop:"8rem"}}
        />
        <div style={{ position: "absolute", zIndex: "9999999" }}>
          <Header />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "10rem",
          }}
        >


          <div>
            <div key={currentImageIndex} className="image-container">
              {product.variations[currentImageIndex] && (
                <img
                  src={product.variations[currentImageIndex].urls[0]}
                  alt={product.variations[currentImageIndex].color}
                  style={{ width: "25vw" }}
                />
              )}

              <div className="navigation-arrows">
                <div className="arrow" onClick={() => handleArrowClick("prev")}>
                  <img
                    src="https://i.ibb.co/8MqhvFq/left-arrow.png"
                    style={{ fontSize: "2rem", zIndex: "-1", color: "white" }}
                  />
                </div>

                <div className="arrow" onClick={() => handleArrowClick("next")}>
                  <img
                    src="https://i.ibb.co/vDty4Gc/right-arrow-1.png"
                    style={{ fontSize: "2rem", zIndex: "-1", color: "white" }}
                  />
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
            <h1
              style={{
                fontSize: "1.1rem",
                color: "black",
                fontWeight: "400",
                fontFamily: "poppins",
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                fontFamily: "poppins, sans-serif",
              }}
            >
              R$ {product.price}
            </p>
            <p>{product.description}</p>

            <div className="thumbnail-container">
              {product.variations
                ?.filter(
                  (variation, index, self) =>
                    self.findIndex((v) => v.color === variation.color) === index
                )
                .map((variation, index) => (
                  <div key={index} className="thumbnail-wrapper">
                    <span className="color-name">{`${variation.color}`}</span>
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
             <button
              onClick={handleAddToCartAndOpenModal}
              style={{
                backgroundColor: "#5070E3",
                color: "white",
                border: "none",
                padding: ".8rem",
                borderRadius: "5px",
                fontWeight: "500",
                fontFamily: "poppins, sans-serif",
                cursor:"pointer"
              }}
            >
              Adicionar ao Carrinho
            </button>
            {showCartButton && <button
              onClick={handleClickOpenModal}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: ".8rem",
                borderRadius: "5px",
                fontWeight: "500",
                fontFamily: "poppins, sans-serif",
                cursor:"pointer",
                
              }}
            >
              Adicionar ao Carrinho
            </button>}
           
           

            {openCartModal && (
              <div className={styles.cartModal}>
                <div ref={modalRef} className={styles.cartModalContent}>
                  <span
                    className={styles.cartClose}
                    onClick={handleClickCloseModal}
                  >
                    &times;
                  </span>
                  <p>
                    vc nao ainda nao  cadastrou os dados necessarios pra compra se cadastre 
                  </p>
                  <Link to={"/signUp"}>
                  <button >cadastre-se</button>

                  </Link>
                </div>
              </div>
            )}
             {openSecondCartModal  && (
              <div className={styles.secondCartModal}>
                <div ref={modalRef} className={styles.secondCartModalContent}>
                  <span
                    className={styles.secondCartClose}
                    onClick={handleClickCloseCartModal}
                  >
                    &times;
                  </span>
                  <CartB/>
                 
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
