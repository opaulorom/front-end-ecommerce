import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    navigate(`/search/product/${searchQuery}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o nome do produto"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress} // Adiciona o event listener para capturar a tecla pressionada
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
};

export default SearchBar;
