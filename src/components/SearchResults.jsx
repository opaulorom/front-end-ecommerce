import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconToggle from "./IconToggle";
import Header from "./Header";

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
      <div style={{ marginTop: "10rem" }}>
        <ul>
          {searchResults.map((product) => (
            <li key={product._id}>
              <Link to={`/products/${product._id}`}>
                <img src={product.variations[0].urls[0]} alt="" />
                <IconToggle
                  productId={product._id}
                  isFavorite={product.isFavorite}
                />
                {product.name} - {product.price}
              </Link>
            </li>
          ))}
        </ul>

        {/* Paginação */}
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
  );
};

export default SearchResults;
