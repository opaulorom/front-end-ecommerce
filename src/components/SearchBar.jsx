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
        style={{
          width:"40vw",
          height:"6.5vh",
          border:"0",
          borderRadius:"24px",
          outline:"none",
          position:"relative"
        }}
      />
      <img src='https://i.ibb.co/t4n36kx/loupe-6.png' onClick={handleSearch}
       style={{
        position:"absolute",
        top:".3rem",
        right:"18rem"
      }}></img>
    </div>
  );
};

export default SearchBar;
