import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Header from "./Header";
import IconToggle from "./IconToggle";

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

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/search/product?searchQuery=${query}&page=${currentPage}&color=${selectedFilters.color}&size=${selectedFilters.size}&priceRange=${selectedFilters.priceRange}`
        );
        const data = await response.json();
        console.log("Data from server:", data);
        setSearchResults(data.products);
        setTotalProducts(data.totalProducts);
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
    <div>
      <Header />

      <div ></div>
      <div style={{ marginTop: "10rem" }}>
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
              O Produto que Você Procura Não Está Disponível no momento.
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
                  color: 'black',
                  textDecoration: 'none'
                }}
              >
                 <IconToggle
                      productId={product._id}
                    />
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
                <div style={{ display: "flex", flexDirection: "column", marginLeft:"1rem" }}>
                <span style={{fontSize:"1rem", fontWeight:"700", fontFamily:"poppins, sans-serif"}}>R$ {product.variations[0].price && product.variations[0].price.toFixed(2)}</span>

                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "15vw",
                      color: "rgb(114, 114, 114)",
                      fontSize:".8rem"
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
    </div>
  );
};

export default SearchResults;
