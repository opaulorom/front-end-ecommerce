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
// import CartB from "./CartB";
import CircularIndeterminate from "./CircularIndeterminate";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({ variations: [] });
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
  const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie
  const [selectedColorImage, setSelectedColorImage] = useState("");
  const [showCartButton, setShowCartButton] = useState(false);
  const token = Cookies.get("token"); // Obtenha o token do cookie
  const [showBorder, setShowBorder] = useState(false); // Estado para controlar a borda
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");
const [selectedSizeId, setSelectedSizeId] = useState("");
  const handleShowBorder = () => {
    setShowBorder(!showBorder);
  };

  const handleClickOpenButton = () => {
    setShowCartButton(true);
  };

  const handleClickCloseButton = () => {
    setShowCartButton(false);
  };

  const handleOpenButton = async () => {
    handleClickOpenButton();
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

  const handleClickCloseCartModal = () => {
    setOpenSecondCartModal(false);
  };

  useEffect(() => {
    const userId = Cookies.get("userId");

    axios
      .get(`http://localhost:3001/api/custumer/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCustomer(response.data);
        if (!response.data || response.data.length === 0) {
          setShowCartButton(true);
          handleClickOpenModal();
        } else {
          setShowCartButton(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.product) {
          const productData = response.data.product;

          // Defina a imagem da cor selecionada como a primeira imagem da primeira variação
          setSelectedColorImage(productData.variations[0]?.urls[0] || "");

          // Atualize o estado do produto com os dados recebidos
          setProduct(productData);

          // Verifique se há variações disponíveis
          if (productData.variations.length > 0) {
            // Atualize o estado com os tamanhos disponíveis para cada cor
            setSizesFromDatabase(
              productData.variations.map((variation) => ({
                color: variation.color,
                sizes: variation.sizes,
              }))
            );

            // Defina o primeiro tamanho como padrão
            setSelectedSize(productData.variations[0]?.sizes[0]?.size || "");
            setIsColorAndSizeSelected(true); // Marque como selecionado automaticamente

            // Defina o preço do primeiro tamanho como padrão
            setSelectedPrice(productData.variations[0]?.sizes[0]?.price || "");
          }
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
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
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

  // Função para lidar com o clique em miniaturas de cores
  // Função para lidar com o clique em miniaturas de cores
  const handleThumbnailClick = (colorIndex) => {
    // Definir o índice da cor selecionada
    setSelectedColorIndex(colorIndex);
    setCurrentImageIndex(colorIndex);
    setSelectedColorId(product.variations[colorIndex]._id); // Armazena o ID da cor selecionada

    // Verificar se a cor selecionada tem uma imagem associada
    const selectedVariation = product.variations[colorIndex];
    if (selectedVariation && selectedVariation.urls.length > 0) {
      // Atualizar a foto grande com a primeira imagem da cor selecionada
      setSelectedColorImage(selectedVariation.urls[0]);
    } else {
      // Se não houver imagem disponível para a cor selecionada, exibir uma mensagem de erro ou imagem padrão
      console.error(
        "Nenhuma imagem encontrada para a cor selecionada:",
        selectedVariation.color
      );
      // Definir uma imagem padrão ou exibir uma mensagem de erro
    }
  };

  const updateSizesForColor = (selectedColorIndex) => {
    const selectedVariation = product.variations[selectedColorIndex]; // Obtém a variação correspondente à cor selecionada

    if (selectedVariation) {
      // Atualiza o estado sizesFromDatabase com os tamanhos disponíveis para a cor selecionada
      setSizesFromDatabase(selectedVariation.sizes);
    } else {
      setSizesFromDatabase([]); // Se não houver variação correspondente, define os tamanhos como vazio
    }
    console.log("Sizes from database:", sizesFromDatabase);
    console.log("Selected color index:", selectedColorIndex);
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



  const handleAddToCartAndOpenModal = async () => {
    const productId = product._id;
    const selectedColor = product.variations[selectedColorIndex]?.color; // Obtém a cor selecionada, se existir
    const selectedSize = selectedSizeId;
    
    if (productId && selectedColor && selectedSize) {
      try {
        console.log("Dados do produto:", productId, selectedColor, selectedSize);
       
          // Se o produto não existir no carrinho, adiciona um novo produto
          console.log("Adicionando novo produto ao carrinho.");
          const response = await axios.post(
            `http://localhost:3001/api/add-to-cart/${userId}`,
            {
              productId: product._id,
              size: selectedSizeId,
              quantity: 1,
              image: selectedColorImage,
              price: selectedPrice,
              color: selectedColor,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        
          console.log("Resposta ao adicionar novo produto:", response.data);
        
          // Adiciona ao carrinho apenas se for um novo produto
          addToCart();
          toast.success("Produto adicionado ao carrinho!");
      
        
        handleClickOpenCartModal();
      } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        toast.error("Erro ao adicionar produto ao carrinho.");
      }
    } else {
      toast.error("Por favor, selecione uma cor e um tamanho.");
    }
  };
  
  
  
// Atualize a função handleSizeSelection para atualizar o estado do tamanho selecionado
const handleSizeSelection = (sizeId, price) => {
  setSelectedSize(sizeId); // Atualize o estado do tamanho selecionado
  setSelectedSizeId(sizeId); // Atualize o ID do tamanho selecionado
  setSelectedPrice(price); // Atualize o preço selecionado
};

  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const handlePrevColor = () => {
    setCurrentColorIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.variations.length - 1
    );
  };

  const handleNextColor = () => {
    setCurrentColorIndex((prevIndex) =>
      prevIndex < product.variations.length - 1 ? prevIndex + 1 : 0
    );
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
          style={{ marginTop: "8rem" }}
        />
        <div style={{ position: "absolute", zIndex: "2" }}>
          <Header />
          {openSecondCartModal && (
            <div className={styles.secondCartModal}>
              <div ref={modalRef} className={styles.secondCartModalContent}>
                <div className={styles.secondCartCloseContainer}>
                  <div className={styles.IMGContent}>
                    <span>Pre visualização</span>
                  </div>
                  <span
                    className={styles.secondCartClose}
                    onClick={handleClickCloseCartModal}
                  >
                    &times;
                  </span>
                </div>

                {/* <div className={styles.CartB}><CartB /></div> */}
              </div>
            </div>
          )}
        </div>

        <div></div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: "50rem",
          }}
        >
          <div key={currentImageIndex} className="image-container">
            {product.variations[currentImageIndex] && (
              <img
                src={product.variations[currentImageIndex]?.urls[0]} // Use currentImageIndex para selecionar a imagem correspondente
                alt={product.variations[currentImageIndex]?.color}
                style={{ width: "25vw" }}
              />
            )}

            <div className="navigation-arrows">
              <div className="arrow" onClick={() => handleArrowClick("prev")}>
                <img
                  src="https://i.ibb.co/8MqhvFq/left-arrow.png"
                  style={{ fontSize: "2rem", zIndex: "-8", color: "white" }}
                />
              </div>

              <div className="arrow" onClick={() => handleArrowClick("next")}>
                <img
                  src="https://i.ibb.co/vDty4Gc/right-arrow-1.png"
                  style={{ fontSize: "2rem", zIndex: "-7", color: "white" }}
                />
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

          <div>
            <div>
              <div style={{ marginTop: "-35rem" }}>
                <div className="thumbnail-container">
                  {product.variations
                    ?.filter(
                      (variation, index, self) =>
                        self.findIndex((v) => v.color === variation.color) ===
                        index
                    )
                    .map((variation, index) => (
                      <div key={index} className="thumbnail-wrapper">
                        <span className="color-name">{`${variation.color}`}</span>

                        <img
                          src={variation.urls[0]}
                          alt={variation.color}
                          className={
                            index === showBorder
                              ? "thumbnail selected"
                              : "thumbnail"
                          }
                          onClick={() => {
                            setShowBorder(index);
                            handleThumbnailClick(index);
                          }}
                        />
                      </div>
                    ))}
                </div>
                Preço: R$ {selectedPrice}
                <div>
                  <h3>
                    Tamanhos disponíveis para{" "}
                    {product.variations[selectedColorIndex]?.color}:
                  </h3>
                  <div>
                    {sizesFromDatabase[selectedColorIndex]?.sizes &&
                      sizesFromDatabase[selectedColorIndex].sizes.map(
                        (size, sizeIndex) => (
                          <div key={sizeIndex} style={{ marginLeft: "3rem" }}>
                            <span
                              className={`size-button ${
                                size.size === selectedSize ? "active" : ""
                              }`}
                              onClick={() =>
                                handleSizeSelection(size.size, size.price)
                              }
                            >
                              {size.size}
                            </span>
                            Quantidade Disponível: {size.quantityAvailable}
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>

            {!showCartButton && (
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
                  cursor: "pointer",
                }}
              >
                Adicionar ao Carrinho
              </button>
            )}

            {showCartButton && (
              <button
                onClick={handleClickOpenModal}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: ".8rem",
                  borderRadius: "5px",
                  fontWeight: "500",
                  fontFamily: "poppins, sans-serif",
                  cursor: "pointer",
                }}
              >
                Adicionar ao Carrinho
              </button>
            )}

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
                    vc nao ainda nao cadastrou os dados necessarios pra compra
                    se cadastre
                  </p>
                  <Link to={"/signUp"}>
                    <button>cadastre-se</button>
                  </Link>
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
