// SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/search/product?searchQuery=${query}`);
        const data = await response.json();
        console.log('Data from server:', data);
        setSearchResults(data); // Atualize para setSearchResults(data) se a propriedade correta for 'data'
      } catch (error) {
        console.error('Erro ao buscar resultados de pesquisa:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <h2>Resultados da Pesquisa para "{query}"</h2>
      <ul>
        {searchResults.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
