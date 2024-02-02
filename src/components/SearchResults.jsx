import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    color: '',
    size: '',
    priceRange: '',
  });

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/search/product?searchQuery=${query}&page=${currentPage}&color=${selectedFilters.color}&size=${selectedFilters.size}&priceRange=${selectedFilters.priceRange}`);
        const data = await response.json();
        console.log('Data from server:', data);
        setSearchResults(data.products);
        setTotalProducts(data.totalProducts);
      } catch (error) {
        console.error('Erro ao buscar resultados de pesquisa:', error);
      }
    };

    fetchSearchResults();
  }, [query, currentPage, selectedFilters.color, selectedFilters.size, selectedFilters.priceRange]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };



  return (
    <div>
      {/* Lista de resultados */}
      <ul>
        {searchResults.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price}
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
  );
};

export default SearchResults;
