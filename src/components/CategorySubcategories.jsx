import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import CustomPagination from "./CustomPagination";

import Header from "./Header";
import IconToggle from "./IconToggle";
import styles from "./CategorySubcategories.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import CircularIndeterminate from "./CircularIndeterminate";
import colorMap from "./colorMap";
import Navbar from "./Navbar";

const CategorySubcategories = () => {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [mixedProducts, setMixedProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState({});
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [uniqueSizes, setUniqueSizes] = useState(new Set());
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(originalProducts);

  useEffect(() => {
    setColors(Object.keys(colorMap)); // Lista de todas as cores do colorMap
  }, []);

// Função para obter tamanhos disponíveis de uma cor específica
// Função para obter tamanhos disponíveis de uma cor específica
const getSizesForColor = (products, color) => {
  const sizesMap = new Map();
  products.forEach((product) => {
    if (!color || product.variations.some(variation => variation.color === color)) {
      product.variations.forEach((variation) => {
        variation.sizes.forEach((sizeObj) => {
          if (!sizesMap.has(sizeObj.size)) {
            sizesMap.set(sizeObj.size, true);
          }
        });
      });
    }
  });
  return Array.from(sizesMap.keys());
};






  // Função para obter o preço de um tamanho específico
  const getPriceForSize = (product, color, size) => {
    const variation = product.variations.find(variation => variation.color === color);
    if (variation) {
      const sizeObj = variation.sizes.find(sizeObj => sizeObj.size === size);
      if (sizeObj) {
        return sizeObj.price;
      }
    }
    // Retornar um valor padrão caso o preço não seja encontrado
    return 0;
  };

  // UseEffect para inicializar os tamanhos disponíveis com base na primeira cor
  useEffect(() => {
    if (originalProducts.length > 0) {
      const firstColor = originalProducts[0].variations[0].color;
      setAvailableSizes(getSizesForColor(originalProducts, firstColor));
    }
    setFilteredProducts(originalProducts);
  }, [originalProducts]);

  useEffect(() => {
    filterProducts();
  }, [selectedColor, selectedSize]);

  const filterProducts = () => {
    let filtered = originalProducts;

    if (selectedColor) {
      filtered = filtered.filter(product =>
        product.variations.some(variation => variation.color === selectedColor)
      );
      setAvailableSizes(getSizesForColor(originalProducts, selectedColor));
    } else {
      if (originalProducts.length > 0) {
        const firstColor = originalProducts[0].variations[0].color;
        setAvailableSizes(getSizesForColor(originalProducts, firstColor));
      }
    }

    if (selectedSize) {
      filtered = filtered.filter(product =>
        product.variations.some(variation =>
          variation.sizes.some(sizeObj => sizeObj.size === selectedSize)
        )
      );
    }

    setFilteredProducts(filtered);
  };

  const handleColorClick = (color) => {
    if (color === selectedColor) {
      setSelectedColor(null);
      setFilteredProducts(originalProducts);
      if (originalProducts.length > 0) {
        const firstColor = originalProducts[0].variations[0].color;
        setAvailableSizes(getSizesForColor(originalProducts, firstColor));
      }
    } else {
      setSelectedColor(color);
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };




  const fetchMixedProducts = async (page, filters) => {
    setLoading(true); // Define o estado de carregamento como true antes de fazer a chamada à API

    try {
      const queryString = Object.entries(filters)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const response = await fetch(
        `http://localhost:3001/api/categories/${category}/mixedProducts?page=${page}&${queryString}`
      );
      const data = await response.json();
      setMixedProducts(data.mixedProducts);
      setTotalPages(data.totalPages);
      setLoading(false); // Define o estado de carregamento como true antes de fazer a chamada à API
    } catch (error) {
      console.error("Erro ao obter produtos misturados:", error);
    }
  };

  useEffect(() => {
    setLoading(true); // Define o estado de carregamento como true antes de fazer a chamada à API

    const fetchSubcategories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/subcategories/${category}`
        );
        const data = await response.json();
        setSubcategories(data);
        setLoading(false); // Define o estado de carregamento como true antes de fazer a chamada à API
      } catch (error) {
        console.error("Erro ao obter subcategorias:", error);
      }
    };

    const fetchFilters = async () => {
      setLoading(true);

      try {
        const colorsResponse = await fetch(
          `http://localhost:3001/api/categories/${category}/colors`
        );
        const sizesResponse = await fetch(
          `http://localhost:3001/api/categories/${category}/sizes`
        );
        const priceResponse = await fetch(
          `http://localhost:3001/api/categories/${category}/priceRanges`
        );
        const colorsData = await colorsResponse.json();
        const sizesData = await sizesResponse.json();
        const priceData = await priceResponse.json();

        setColors(colorsData);
        setSizes(sizesData);
        setPriceRanges(priceData);
        setLoading(false);

        // Atualizar o conjunto único de tamanhos com base nos dados filtrados
        const allSizes = sizesData.reduce((acc, size) => {
          size.split(",").forEach((s) => acc.add(s.trim()));
          return acc;
        }, new Set());
        setUniqueSizes(allSizes);
      } catch (error) {
        console.error("Erro ao obter opções de filtros:", error);
      }
    };

    const fetchOriginalProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Alteração na chamada de API para obter produtos misturados específicos
        const response = await fetch(
          `http://localhost:3001/api/categories/${category}/mixedProducts`
        );
        const data = await response.json();
        setOriginalProducts(data.mixedProducts);
        setLoading(false); // Define o estado de carregamento como true antes de fazer a chamada à API
      } catch (error) {
        console.error("Erro ao obter produtos misturados:", error);
      }
    };

    const initialFavorites = {};
    originalProducts.forEach((product) => {
      initialFavorites[product._id] = product.isFavorite || false;
    });
    setFavorites(initialFavorites);

    fetchSubcategories();
    fetchMixedProducts(currentPage, {});
    fetchFilters();
    fetchOriginalProducts();
  }, [category, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterClick = async (filterType, value) => {
    let filteredProducts = originalProducts;
  
    if (filterType === "size") {
      filteredProducts = originalProducts.filter((product) =>
        product.variations.some((variation) =>
          variation.sizes.some((sizeObj) => sizeObj.size === value)
        )
      );
      setSelectedSize(value); // Atualiza o tamanho selecionado no estado
    } else if (filterType === "color") {
      filteredProducts = originalProducts.filter((product) =>
        product.variations.some((variation) => variation.color === value)
      );
      setSelectedColor(value); // Atualiza a cor selecionada no estado
    } else if (filterType === "price") {
      // Aqui, filtre os produtos com base no intervalo de preços selecionado
      const [minPrice, maxPrice] = value.split("-").map(Number);
      filteredProducts = originalProducts.filter((product) => {
        const productPrice = Number(product.variations[0].sizes[0].price);
        return productPrice >= minPrice && productPrice <= maxPrice;
      });
    }
  
    setFilteredProducts(filteredProducts);
    setTotalPages(1); // Atualiza o número total de páginas para 1, uma vez que os produtos filtrados serão exibidos em uma única página
  };
  
  
  const handleFavoriteClick = (productId) => {
    setMixedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        openFilterModal
      ) {
        setOpenFilterModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilterModal]);

  const handleOpenModal = () => {
    handleClickOpenModal();
  };

  const handleClickOpenModal = () => {
    setOpenFilterModal(true);
  };

  const handleClickCloseModal = () => {
    setOpenFilterModal(false);
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "14rem",
      }}
    >
      <div style={{ zIndex: "999999999999" }}>
        <Header />
      </div>

      {loading ? (
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            marginTop: "10rem",
          }}
        >
          <CircularIndeterminate />;
        </div>
      ) : (
        <>
          <div
            style={{
              marginLeft: "5rem",
              marginRight: "2rem",
              marginTop: "-2rem",
            }}
          >
            <div className={styles.DesktopFilter}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginBottom: "2rem",
                  fontFamily: "Montserrat, arial, sans-serif",
                  fontWeight: "400",
                  fontSize: "1.3rem",
                  color: "rgb(52, 52, 54)",
                }}
              >
                Filtros
              </div>
            </div>
            <div className={styles.Filter}>
              <div
                style={{
                  width: "90vw",
                  borderBottom: "1px solid gray",
                  top: "7rem",
                  position: "absolute",
                  left: "10px",
                }}
                className={styles.FilterContainer}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyItems: "center",
                    fontFamily: "Montserrat, arial, sans-serif",
                    fontWeight: "400",
                    fontSize: "1.3rem",
                    color: "rgb(52, 52, 54)",
                    cursor: "pointer",
                    marginLeft: "2rem",
                  }}
                  onClick={handleOpenModal}
                >
                  <TuneIcon />
                  Filtros
                </div>
              </div>

              <div className={styles.MobileFilter}></div>
              <div>
                {openFilterModal && (
                  <div className={styles.FilterModal}>
                    <div ref={modalRef} className={styles.FilterModalContent}>
                      <span
                        className={styles.FilterClose}
                        onClick={handleClickCloseModal}
                      >
                        &times;
                      </span>
                      <p
                        style={{
                          fontFamily: "Montserrat, arial, sans-serif",
                          fontWeight: "600",
                          fontSize: "1.2rem",
                          color: "rgb(52, 52, 54)",
                        }}
                      >
                        Categorias
                      </p>
                      <div onClick={handleClickCloseModal}>
                        <ul style={{ listStyle: "none", marginBottom: "3rem" }}>
                          {subcategories.map((subcategory, index) => (
                            <li
                              key={index}
                              style={{ marginLeft: "-2.5rem" }}
                              className={styles.myLinks}
                            >
                              <Link
                                to={`/categories/${category}/${subcategory}`}
                              >
                                {subcategory}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ marginBottom: "3rem" }}>
                        <h3
                          style={{
                            fontFamily: "Montserrat, arial, sans-serif",
                            fontWeight: "600",
                            fontSize: "1.2rem",
                            color: "rgb(52, 52, 54)",
                          }}
                        >
                          Cores
                        </h3>
                        <div onClick={handleClickCloseModal}>
                          {colors.map((color, index) => (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyItems: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  backgroundColor: colorMap[color],
                                  marginRight: "10px",
                                  border: "1px solid gray",
                                }}
                              ></div>
                              <div
                                key={index}
                                onClick={() => {
                                  handleColorClick(color),
                                    handleFilterClick("color", color);
                                }}
                                style={{
                                  cursor: "pointer",
                                  fontWeight:
                                    selectedColor === color ? "600" : "400",
                                  fontSize:
                                    selectedColor === color ? "1.1rem" : "1rem",
                                  fontFamily: "Montserrat, arial, sans-serif",
                                }}
                              >
                                {color}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                        }}
                        className={styles.repeat}
                      >
                        {Array.from(uniqueSizes).map((size, index) => (
                          <div
                            key={index}
                            onClick={() => handleFilterClick("size", size)}
                          >
                            <button
                              style={{
                                borderRadius: "20px",
                                width: "40px",
                                height: "40px",
                                border: "1px solid rgb(114, 114, 114)",
                                backgroundColor:
                                  selectedSize === size
                                    ? "#333"
                                    : "rgb(255, 255, 255)",
                                color:
                                  selectedSize === size ? "white" : "black",
                                marginLeft: "8px",
                                marginTop: "8px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleSizeClick(size)}
                            >
                              <span style={{ fontSize: ".8rem" }}> {size}</span>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: "3rem" }}>
                        <h3
                          style={{
                            fontFamily: "Montserrat, arial, sans-serif",
                            fontWeight: "600",
                            fontSize: "1.2rem",
                            color: "rgb(52, 52, 54)",
                          }}
                        >
                          Faixas de Preços
                        </h3>
                        <div onClick={handleClickCloseModal}>
                          {priceRanges.map((range, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                handlePriceClick(range),
                                  handleFilterClick("priceRange", range);
                              }}
                              style={{
                                cursor: "pointer",
                                fontFamily: "Montserrat, arial, sans-serif",
                                fontWeight:
                                  selectedPrice === range ? "600" : "400",
                                fontSize:
                                  selectedPrice === range ? "1.1rem" : "1rem",
                                color:
                                  selectedPrice === range
                                    ? "rgb(52, 52, 54)"
                                    : "rgb(52, 52, 54)",
                              }}
                            >
                              {range}
                            </div>
                          ))}
                   
                        </div>
                        
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            desktop
            <div className={styles.DesktopFilter}>
              <p
                style={{
                  fontFamily: "Montserrat, arial, sans-serif",
                  fontWeight: "600",
                  fontSize: "1.2rem",
                  color: "rgb(52, 52, 54)",
                }}
              >
                Categorias
              </p>

              <ul style={{ listStyle: "none", marginBottom: "3rem" }}>
                {subcategories.map((subcategory, index) => (
                  <li
                    key={index}
                    style={{ marginLeft: "-2.5rem" }}
                    className={styles.myLinks}
                  >
                    <Link to={`/categories/${category}/${subcategory}`}>
                      {subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
              <div style={{ marginBottom: "3rem" }}>
      <h3
        style={{
          fontFamily: "Montserrat, arial, sans-serif",
          fontWeight: "600",
          fontSize: "1.2rem",
          color: "rgb(52, 52, 54)",
        }}
      >
        Cores
      </h3>

      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: colorMap[color],
              marginRight: "10px",
              border: "1px solid gray",
            }}
          ></div>
          <div
            onClick={() => handleColorClick(color)}
            style={{
              cursor: "pointer",
              fontWeight: selectedColor === color ? "600" : "400",
              fontSize: selectedColor === color ? "1.1rem" : "1rem",
              fontFamily: "Montserrat, arial, sans-serif",
            }}
          >
            {color}
          </div>
        </div>
      ))}

      <h3
        style={{
          fontFamily: "Montserrat, arial, sans-serif",
          fontWeight: "600",
          fontSize: "1.2rem",
          color: "rgb(52, 52, 54)",
        }}
      >
        Tamanhos
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {availableSizes.map((size, index) => (
          <div key={index} >
            <button
              style={{
                borderRadius: "20px",
                width: "40px",
                height: "40px",
                border: "1px solid rgb(114, 114, 114)",
                backgroundColor:
                  selectedSize === size ? "#333" : "rgb(255, 255, 255)",
                color: selectedSize === size ? "white" : "black",
                marginLeft: "8px",
                marginTop: "8px",
                cursor: "pointer",
              }}
              onClick={() => handleSizeClick(size)}
            >
              <span style={{ fontSize: ".8rem" }}>{size}</span>
            </button>
          </div>
        ))}
      </div>

     
    
      </div>


              <div style={{ marginTop: "3rem" }}>
                <h3
                  style={{
                    fontFamily: "Montserrat, arial, sans-serif",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                    color: "rgb(52, 52, 54)",
                  }}
                >
                  Faixas de Preços
                </h3>
                {priceRanges.map((range, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handlePriceClick(range),
                        handleFilterClick("priceRange", range);
                    }}
                    style={{
                      cursor: "pointer",
                      fontFamily: "Montserrat, arial, sans-serif",
                      fontWeight: selectedPrice === range ? "600" : "400",
                      fontSize: selectedPrice === range ? "1.1rem" : "1rem",
                      color:
                        selectedPrice === range
                          ? "rgb(52, 52, 54)"
                          : "rgb(52, 52, 54)",
                    }}
                  >
                    {range}
                  </div>
                ))}
              </div>
        <div>
  <div
    onClick={() => handleFilterClick("price", "")}
    style={{
      cursor: "pointer",
      fontFamily: "Montserrat, arial, sans-serif",
      fontWeight: selectedPrice === "" ? "600" : "400",
      fontSize: selectedPrice === "" ? "1.1rem" : "1rem",
      color: selectedPrice === "" ? "rgb(52, 52, 54)" : "rgb(52, 52, 54)",
      margin: "0.5rem",
    }}
  >
    Selecione uma faixa de preço
  </div>
  <div
    onClick={() => handleFilterClick("price", "0-50")}
    style={{
      cursor: "pointer",
      fontFamily: "Montserrat, arial, sans-serif",
      fontWeight: selectedPrice === "0-50" ? "600" : "400",
      fontSize: selectedPrice === "0-50" ? "1.1rem" : "1rem",
      color: selectedPrice === "0-50" ? "rgb(52, 52, 54)" : "rgb(52, 52, 54)",
      margin: "0.5rem",
    }}
  >
    R$0 - R$50
  </div>
  <div
    onClick={() => handleFilterClick("price", "50-100")}
    style={{
      cursor: "pointer",
      fontFamily: "Montserrat, arial, sans-serif",
      fontWeight: selectedPrice === "50-100" ? "600" : "400",
      fontSize: selectedPrice === "50-100" ? "1.1rem" : "1rem",
      color: selectedPrice === "50-100" ? "rgb(52, 52, 54)" : "rgb(52, 52, 54)",
      margin: "0.5rem",
    }}
  >
    R$50 - R$100
  </div>
  <div
    onClick={() => handleFilterClick("price", "100-200")}
    style={{
      cursor: "pointer",
      fontFamily: "Montserrat, arial, sans-serif",
      fontWeight: selectedPrice === "100-200" ? "600" : "400",
      fontSize: selectedPrice === "100-200" ? "1.1rem" : "1rem",
      color: selectedPrice === "100-200" ? "rgb(52, 52, 54)" : "rgb(52, 52, 54)",
      margin: "0.5rem",
    }}
  >
    R$100 - R$200
  </div>
  <div
    onClick={() => handleFilterClick("price", "200-")}
    style={{
      cursor: "pointer",
      fontFamily: "Montserrat, arial, sans-serif",
      fontWeight: selectedPrice === "200-" ? "600" : "400",
      fontSize: selectedPrice === "200-" ? "1.1rem" : "1rem",
      color: selectedPrice === "200-" ? "rgb(52, 52, 54)" : "rgb(52, 52, 54)",
      margin: "0.5rem",
    }}
  >
    R$200 ou mais
  </div>
</div>


            </div>
          </div>

          <div className={styles.ProductsDesktopContainer}>
            {mixedProducts.length === 0 && (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  top: "15rem",
                  left: "35rem",
                }}
              >
                <img
                  src="https://i.ibb.co/hVLGSpN/commerce-and-shopping-1.png"
                  alt=""
                />
                <span>
                  O Produto que Você Procura Não Está Disponível no momento.
                </span>
              </div>
            )}
    <ul>
  {filteredProducts.map((product) => {
    const selectedColorVariation = selectedColor
      ? product.variations.find(
          (variation) => variation.color === selectedColor
        )
      : product.variations[0]; // Padrão para a primeira variação se nenhuma cor estiver selecionada

    // Verifique se há uma foto disponível
    const hasPhoto =
      selectedColorVariation &&
      selectedColorVariation.urls &&
      selectedColorVariation.urls.length > 0;

    // Se não houver foto disponível, não renderize o produto
    if (!hasPhoto) {
      return null;
    }

    // Encontre o preço correto para exibição
    const displayedPrice = selectedSize
      ? getPriceForSize(product, selectedColor, selectedSize)
      : selectedColorVariation
      ? selectedColorVariation.sizes[0].price // Se nenhum tamanho estiver selecionado, use o preço do primeiro tamanho disponível para a variação selecionada
      : product.variations[0].sizes[0].price; // Se nenhum tamanho ou variação estiver selecionado, use o preço do primeiro tamanho disponível no primeiro produto

    return (
      <li
        key={product._id || "undefined"}
        style={{ position: "relative" }}
      >
        <Link
          to={`/products/${product._id}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          <img
            src={selectedColorVariation.urls[0]}
            alt={product.name}
            style={{
              width: "30vw",
              marginTop: "-2rem",
              zIndex: "-1",
              marginLeft: "1rem",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "4rem",
              marginLeft: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                fontFamily: "poppins, sans-serif",
              }}
            >
              R${" "}
              {Number(displayedPrice || product.price || product.variations[0].sizes[0].price)
                .toFixed(2)
                .padStart(5, "0")}
            </span>
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "15vw",
                color: "rgb(114, 114, 114)",
                fontSize: ".8rem",
              }}
            >
              {product.name}
            </span>
          </div>
        </Link>
        <div
          style={{
            position: "absolute",
            top: "-5%",
            right: "0",
            zIndex: 9999,
            marginBottom: "5rem",
            width: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconToggle
            productId={product._id}
            isFavorite={favorites[product._id]}
          />
        </div>
      </li>
    );
  })}
</ul>


            {mixedProducts.length > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "2rem",
                  }}
                  className={styles.DestopCustomPagination}
                >
                  <CustomPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onChangePage={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>

          <div>
            <div className={styles.TabletContainerProducts}>
              {mixedProducts.length === 0 && (
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    top: "15rem",
                    left: "35rem",
                    backgroundColor: "red",
                  }}
                >
                  <img
                    src="https://i.ibb.co/hVLGSpN/commerce-and-shopping-1.png"
                    alt=""
                  />
                  <span>
                    O Produto que Você Procura Não Está Disponível no momento.
                  </span>
                </div>
              )}
              <ul
                style={{
                  listStyleType: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                  marginRight: "8rem",
                }}
              >
                {mixedProducts &&
                  mixedProducts.map((product) => (
                    <>
                      <li
                        key={product._id || "undefined"}
                        style={{ position: "relative" }}
                      >
                        <Link
                          to={`/products/${product._id}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {product.variations &&
                          product.variations.length > 0 &&
                          product.variations[0].urls &&
                          product.variations[0].urls.length > 0 ? (
                            <img
                              src={product.variations[0].urls[0]}
                              alt={product.name}
                              style={{
                                width: "30vw",
                                marginTop: "-2rem",
                                zIndex: "-1",
                                marginLeft: "1rem",
                              }}
                            />
                          ) : null}

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: "4rem",
                              marginLeft: "1rem",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "1rem",
                                fontWeight: "700",
                                fontFamily: "poppins, sans-serif",
                              }}
                            >
                              R${" "}
                              {Number(product.variations[0].sizes[0].price)
                                .toFixed(2)
                                .padStart(5, "0")}
                            </span>
                            <span
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: "15vw",
                                color: "rgb(114, 114, 114)",
                                fontSize: ".8rem",
                              }}
                            >
                              {product.name}
                            </span>
                          </div>
                        </Link>
                        <div
                          style={{
                            position: "absolute",
                            top: "-5%",
                            right: "0",
                            zIndex: 9999,
                            marginBottom: "5rem",
                            width: "3rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconToggle
                            productId={product._id}
                            isFavorite={favorites[product._id]}
                          />
                        </div>
                      </li>
                    </>
                  ))}
              </ul>
              {mixedProducts.length > 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "2rem",
                    }}
                  >
                    dddddddd{" "}
                    <CustomPagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onChangePage={handlePageChange}
                    />
                  </div>
                </>
              )}{" "}
            </div>
          </div>
        </>
      )}
      <Navbar />
    </div>
  );
};

export default CategorySubcategories;