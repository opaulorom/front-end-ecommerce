// SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// SearchBar.jsx
const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = () => {
      console.log('Search Query:', searchQuery);
      navigate(`/search/product/${searchQuery}`);
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Digite o nome do produto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
    );
  };
  
export default SearchBar;
