// Products.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Products.css";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { searchAtom } from "../Jotai/searchAtom";
import { useAtomValue } from "jotai";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import colorMap from "./colorMap";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchTerm = useAtomValue(searchAtom);
  const [FilterModalOpen, setFilterModalOpen] = useState(false);
  const [isPlusIconOpen, setIsPlusIconOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("Current Page:", currentPage);
      console.log("Search Term:", searchTerm);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/products?page=${currentPage}&keyword=${searchTerm}`
        );

        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        console.log("TotalPages", response.data.totalPages);
      } catch (error) {
        console.log("Erro ao obter produtos", error);
      } finally {
        setLoading(false); // Desativar loading, independentemente do resultado
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm]);

  const handlePageChange = (event, value) => {
    console.log("New Page:", value);
    setCurrentPage(value || currentPage);
  };

  const handleFilterIconClick = () => {
    setFilterModalOpen(true);
  };

  const handleCloseModal = () => {
    setFilterModalOpen(false);
  };

  const handleOpenPlusIcon = () => {
    setIsPlusIconOpen(true);
    // Verificar se 'product' e 'variations' estão definidos antes de acessá-los
    if (products && products.variations && product.variations.length > 0) {
      setIsPlusIconOpen(true);
      // Restante do código...
    }
  };

  const handlePlusIconClose = () => {
    setIsPlusIconOpen(false);
  };


  const handleColorClick = (color, urls, index) => {
    setSelectedColor(color);
    setSelectedImageIndex(index);
    // Restante do código...
  };
  
  
  
  return (
    <div className="productContainer">
      <div>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div>
            {FilterModalOpen ? (
              <div className="modal">
                <div className="modal-content">
                  <CloseIcon
                    onClick={handleCloseModal}
                    style={{ position: "absolute", right: "1rem" }}
                  ></CloseIcon>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>Cor</span>{" "}
                    {isPlusIconOpen ? (
                      <>
                        {" "}
                        <RemoveIcon onClick={handlePlusIconClose} />
                        <div>
                          {products.map((product) => (
                            <div key={product.id}>
                              <h3>Produto: {product.name}</h3>
                              <div>
                                {product.variations.map((variation, index) => (
                                  <div key={index}>
                                    <h4>Variação {index + 1}</h4>
                                    <div>
                                      Cor: {variation.color}
                                      <div
                                        key={index}
                                        style={{
                                          backgroundColor:
                                            colorMap[variation.color] ||
                                            "#000000",
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                        }}
                                      ></div>{" "}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <AddIcon onClick={handleOpenPlusIcon} />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="modal-filter">
                  <img
                    src="https://i.ibb.co/rwVqHvX/adjust.png"
                    onClick={handleFilterIconClick}
                    alt="Filter Icon"
                  />
                  <span>Filtro</span>
                </div>
              </>
            )}
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="product-link"
              >
                <div className="product-card">
                  {product.variations &&
                    product.variations.length > 0 &&
                    product.variations[0].urls &&
                    product.variations[0].urls.length > 0 && (
                      <img
                        className="image"
                        src={product.variations[0].urls[0]}
                        alt=""
                      />
                    )}
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
               {product.variations.map((variation, index) => (
  <div
    key={index}
    onClick={() => handleColorClick(variation.color, variation.urls, index)}
    style={{
      backgroundColor: colorMap[variation.color],
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      marginRight: "5px",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
      cursor: "pointer",
    }}
  ></div>
))}

{selectedColor && (
  <div>
    <p>Descrição da Cor: {selectedColor}</p>
    <img
      src={selectedImageUrl}
      alt="Imagem Selecionada"
      style={{ maxWidth: "100%", marginTop: "10px" }}
    />
  </div>
)}


                </div>
              </Link>
            ))}
            <div
              style={{
                marginBottom: "1rem",
                zIndex: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, value) => handlePageChange(event, value)}
                  color="primary"
                />
              </Stack>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
