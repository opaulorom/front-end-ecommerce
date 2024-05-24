import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Header from "./Header";
import IconToggle from "./IconToggle";
import CustomPagination from "./CustomPagination";

import styles from "./CategorySubcategories.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import CircularIndeterminate from "./CircularIndeterminate";
import colorMap from "./colorMap";
import Navbar from "./Navbar";
const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    color: "",
    size: "",
    priceRange: "",
  });
  const [showCategory, setShowCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [mixedProducts, setMixedProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

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
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    setColors(Object.keys(colorMap)); // Lista de todas as cores do colorMap
  }, []);

  const getSizesForColor = (products, color) => {
    const sizesSet = new Set();
    products.forEach((product) => {
      if (
        !color ||
        product.variations.some((variation) => variation.color === color)
      ) {
        product.variations.forEach((variation) => {
          variation.sizes.forEach((sizeObj) => {
            sizesSet.add(sizeObj.size);
          });
        });
      }
    });
    return Array.from(sizesSet);
  };

  // Função para obter o preço de um tamanho específico
  const getPriceForSize = (product, color, size) => {
    const variation = product.variations.find(
      (variation) => variation.color === color
    );
    if (variation) {
      const sizeObj = variation.sizes.find((item) => item.size === size);
      return sizeObj ? sizeObj.price : 0;
    }
    return 0;
  };

  // UseEffect para inicializar os tamanhos disponíveis com base na primeira cor

  useEffect(() => {
    if (originalProducts.length > 0) {
      const firstColor = originalProducts[0].variations[0].color;
      const sizesArray = getSizesForColor(originalProducts, firstColor);
      setAvailableSizes(sizesArray);
    }
    setFilteredProducts(originalProducts);
  }, [originalProducts]);

  useEffect(() => {
    filterProducts();
  }, [selectedColor, selectedSize, selectedSubcategory]);

  const filterProducts = () => {
    let filtered = originalProducts;

    if (selectedColor) {
      filtered = filtered.filter((product) =>
        product.variations.some(
          (variation) => variation.color === selectedColor
        )
      );
    }

    if (selectedSize) {
      filtered = filtered.filter((product) =>
        product.variations.some((variation) =>
          variation.sizes.some((sizeObj) => sizeObj.size === selectedSize)
        )
      );
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(
        (product) => product.subcategory === selectedSubcategory
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSubcategoryClick = (subcategory) => {
    if (subcategory === selectedSubcategory) {
      setSelectedSubcategory(null);
      setFilteredProducts(originalProducts);
    } else {
      setSelectedSubcategory(subcategory);
    }
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
        `http://localhost:3001/api/categories/${showCategory}/mixedProducts?page=${page}&${queryString}`
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
          `http://localhost:3001/api/subcategories/${showCategory}`
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
          `http://localhost:3001/api/categories/${showCategory}/colors`
        );
        const sizesResponse = await fetch(
          `http://localhost:3001/api/categories/${showCategory}/sizes`
        );
        const priceResponse = await fetch(
          `http://localhost:3001/api/categories/${showCategory}/priceRanges`
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
          `http://localhost:3001/api/categories/${showCategory}/mixedProducts`
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
  }, [showCategory, currentPage]);

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

  const [switchContent, setSwitchContent] = useState(true);
  const handleChangeContent = () => {
    setSwitchContent(!switchContent);
  };
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/search/product?searchQuery=${query}&page=${currentPage}&color=${selectedFilters.color}&size=${selectedFilters.size}&priceRange=${selectedFilters.priceRange}`
        );
        const data = await response.json();
        console.log("category from server:", data.products[0].category);
        setSearchResults(data.products);
        setTotalProducts(data.totalProducts);
        setShowCategory(data.products[0].category);
      } catch (error) {
        console.error("Erro ao buscar resultados de pesquisa:", error);
      }
    };

    fetchSearchResults();
  }, [
    query,
    currentPage,
    selectedFilters.color,
    selectedFilters.size,
    selectedFilters.priceRange,
  ]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between"
    }}>
      <Header />



      <div
        style={{
          marginTop: "15rem",
        }}
      >

        <div>

          
        </div>
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
          <ul
            style={{
              listStyle: "none",
              marginBottom: "3rem",
            }}
          >
            {subcategories.map((subcategory, index) => (
              <li
                key={index}
                style={{ marginLeft: "-2.5rem" }}
                className={styles.myLinks}
                onClick={() => {
                  handleSubcategoryClick(subcategory);
                  handleChangeContent();
                }}
              >
                {subcategory}
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
                onClick={() => {
                  handleColorClick(color);
                  handleChangeContent();
                }}
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
          <div>
            {availableSizes.map((size, index) => (
              <button
                key={index}
                style={{
                  borderRadius: "20px",
                  width: "40px",
                  height: "40px",
                  border: "1px solid rgb(114, 114, 114)",
                  backgroundColor:
                    selectedSize === size ? "#333" : "rgb(255, 255, 255)",
                  color: selectedSize === size ? "white" : "black",
                  margin: "8px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleSizeClick(size);
                  handleChangeContent();
                }}
              >
                <span style={{ fontSize: ".8rem" }}>{size}</span>
              </button>
            ))}
          </div>

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
          <div
            onClick={() =>{ handleFilterClick("price", "0-50"), handleChangeContent()}}
            style={{
              cursor: "pointer",
              fontFamily: "Montserrat, arial, sans-serif",
              fontWeight: selectedPrice === "0-50" ? "600" : "400",
              fontSize: selectedPrice === "0-50" ? "1.1rem" : "1rem",
              color:
                selectedPrice === "0-50"
                  ? "rgb(52, 52, 54)"
                  : "rgb(52, 52, 54)",
              margin: "0.5rem",
            }}
          >
            R$5 - R$50
          </div>
          <div
            onClick={() => {handleFilterClick("price", "50-100"), handleChangeContent()}}
            style={{
              cursor: "pointer",
              fontFamily: "Montserrat, arial, sans-serif",
              fontWeight: selectedPrice === "50-100" ? "600" : "400",
              fontSize: selectedPrice === "50-100" ? "1.1rem" : "1rem",
              color:
                selectedPrice === "50-100"
                  ? "rgb(52, 52, 54)"
                  : "rgb(52, 52, 54)",
              margin: "0.5rem",
            }}
          >
            R$50 - R$100
          </div>
          <div
            onClick={() => {handleFilterClick("price", "100-200"), handleChangeContent()}}
            style={{
              cursor: "pointer",
              fontFamily: "Montserrat, arial, sans-serif",
              fontWeight: selectedPrice === "100-200" ? "600" : "400",
              fontSize: selectedPrice === "100-200" ? "1.1rem" : "1rem",
              color:
                selectedPrice === "100-200"
                  ? "rgb(52, 52, 54)"
                  : "rgb(52, 52, 54)",
              margin: "0.5rem",
            }}
          >
            R$100 - R$200
          </div>
          <div
            onClick={() => {handleFilterClick("price", "200-"), handleChangeContent()}}
            style={{
              cursor: "pointer",
              fontFamily: "Montserrat, arial, sans-serif",
              fontWeight: selectedPrice === "200-" ? "600" : "400",
              fontSize: selectedPrice === "200-" ? "1.1rem" : "1rem",
              color:
                selectedPrice === "200-"
                  ? "rgb(52, 52, 54)"
                  : "rgb(52, 52, 54)",
              margin: "0.5rem",
            }}
          >
            R$200 ou mais
          </div>
        </div>
      </div>


      <div>
        <div style={{ marginTop: "10rem" }}>
          {switchContent ? (
            <>
              <div>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "1rem",
                    marginTop: "13rem",
                  }}
                >
                  {searchResults.length === 0 && (
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
                        O Produto que Você Procura Não Está Disponível no
                        momento.
                      </span>
                    </div>
                  )}
                  {searchResults.map((product) => (
                    <li key={product._id}>
                      <Link
                        to={`/products/${product._id}`}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginBottom: "2rem",
                          alignItems: "center",
                          color: "black",
                          textDecoration: "none",
                        }}
                      >
                        <IconToggle productId={product._id} />
                        <img
                          src={product.variations[0].urls[0]}
                          alt=""
                          style={{
                            width: "15vw",
                            marginTop: "-2rem",
                            zIndex: "-1",
                            marginLeft: "1rem",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
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
                            {product.variations[0].sizes[0].price &&
                              product.variations[0].sizes[0].price.toFixed(2)}
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
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "2rem",
                  }}
                >
                  <Stack spacing={2}>
                    <Pagination
                      count={Math.ceil(totalProducts / 10)}
                      variant="outlined"
                      color="primary"
                      size="large"
                      page={currentPage}
                      onChange={handlePageChange}
                    />
                  </Stack>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "14rem",
                  }}
                >
                  

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
                                <div
                                  ref={modalRef}
                                  className={styles.FilterModalContent}
                                >
                                  <span
                                    className={styles.FilterClose}
                                    onClick={handleClickCloseModal}
                                  >
                                    &times;
                                  </span>
                                  <p
                                    style={{
                                      fontFamily:
                                        "Montserrat, arial, sans-serif",
                                      fontWeight: "600",
                                      fontSize: "1.2rem",
                                      color: "rgb(52, 52, 54)",
                                    }}
                                  >
                                    Categorias
                                  </p>
                                  <div onClick={handleClickCloseModal}>
                                    <ul
                                      style={{
                                        listStyle: "none",
                                        marginBottom: "3rem",
                                      }}
                                    >
                                      {subcategories.map(
                                        (subcategory, index) => (
                                          <li
                                            key={index}
                                            style={{ marginLeft: "-2.5rem" }}
                                            className={styles.myLinks}
                                          >
                                            {subcategory}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>

                                  <div style={{ marginBottom: "3rem" }}>
                                    <h3
                                      style={{
                                        fontFamily:
                                          "Montserrat, arial, sans-serif",
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
                                                handleFilterClick(
                                                  "color",
                                                  color
                                                );
                                            }}
                                            style={{
                                              cursor: "pointer",
                                              fontWeight:
                                                selectedColor === color
                                                  ? "600"
                                                  : "400",
                                              fontSize:
                                                selectedColor === color
                                                  ? "1.1rem"
                                                  : "1rem",
                                              fontFamily:
                                                "Montserrat, arial, sans-serif",
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
                                    {Array.from(uniqueSizes).map(
                                      (size, index) => (
                                        <div
                                          key={index}
                                          onClick={() =>
                                            handleFilterClick("size", size)
                                          }
                                        >
                                          <button
                                            style={{
                                              borderRadius: "20px",
                                              width: "40px",
                                              height: "40px",
                                              border:
                                                "1px solid rgb(114, 114, 114)",
                                              backgroundColor:
                                                selectedSize === size
                                                  ? "#333"
                                                  : "rgb(255, 255, 255)",
                                              color:
                                                selectedSize === size
                                                  ? "white"
                                                  : "black",
                                              marginLeft: "8px",
                                              marginTop: "8px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleSizeClick(size)
                                            }
                                          >
                                            <span style={{ fontSize: ".8rem" }}>
                                              {" "}
                                              {size}
                                            </span>
                                          </button>
                                        </div>
                                      )
                                    )}
                                  </div>

                                  <div style={{ marginTop: "3rem" }}>
                                    <h3
                                      style={{
                                        fontFamily:
                                          "Montserrat, arial, sans-serif",
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
                                              handleFilterClick(
                                                "priceRange",
                                                range
                                              );
                                          }}
                                          style={{
                                            cursor: "pointer",
                                            fontFamily:
                                              "Montserrat, arial, sans-serif",
                                            fontWeight:
                                              selectedPrice === range
                                                ? "600"
                                                : "400",
                                            fontSize:
                                              selectedPrice === range
                                                ? "1.1rem"
                                                : "1rem",
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
                              O Produto que Você Procura Não Está Disponível no
                              momento.
                            </span>
                          </div>
                        )}
                        <ul>
                          {filteredProducts.map((product) => {
                            const selectedColorVariation = selectedColor
                              ? product.variations.find(
                                  (variation) =>
                                    variation.color === selectedColor
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
                            // Encontre o preço correto para exibição
                            const displayedPrice = selectedSize
                              ? getPriceForSize(
                                  product,
                                  selectedColor,
                                  selectedSize
                                )
                              : selectedColorVariation
                              ? selectedColorVariation.sizes[0].price // Se nenhum tamanho estiver selecionado, use o preço do primeiro tamanho disponível para a variação selecionada
                              : product.variations[0].sizes[0].price; // Se nenhum tamanho ou variação estiver selecionado, use o preço do primeiro tamanho disponível no primeiro produto

                            // Acessar o tamanho do produto corretamente
                            const size =
                              selectedSize ||
                              selectedColorVariation.sizes[0].name;

                            // Construindo os parâmetros da URL
                            const queryParams = new URLSearchParams();
                            queryParams.append(
                              "selectedImageFromCategory",
                              selectedColorVariation.urls[0]
                            );
                            queryParams.append(
                              "selectedColorFromCategory",
                              selectedColor
                            );
                            queryParams.append(
                              "selectedPriceFromCategory",
                              displayedPrice
                            );
                            queryParams.append(
                              "selectedSizeFromCategory",
                              size
                            );

                            return (
                              <li
                                key={product._id || "undefined"}
                                style={{ position: "relative" }}
                              >
                                <Link
                                  to={{
                                    pathname: `/products/${product._id}`,
                                    search: `?${queryParams.toString()}`,
                                  }}
                                  style={{
                                    color: "black",
                                    textDecoration: "none",
                                  }}
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
                                      {Number(
                                        displayedPrice ||
                                          product.price ||
                                          product.variations[0].sizes[0].price
                                      )
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
                                O Produto que Você Procura Não Está Disponível
                                no momento.
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
                                      style={{
                                        color: "black",
                                        textDecoration: "none",
                                      }}
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
                                          {Number(
                                            product.variations[0].sizes[0].price
                                          )
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
           
                </div>
              </div>
            </>
          )}
          <button onClick={handleChangeContent}>mudar</button>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default SearchResults;
