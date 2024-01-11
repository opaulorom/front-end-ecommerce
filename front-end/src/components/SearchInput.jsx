import React, { useState, useEffect } from "react";
import "./SearchInput.css"; // Certifique-se de ter um arquivo CSS associado

const SearchInput = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth >= 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 699);
    };

    // Adiciona um ouvinte de redimensionamento no montar do componente
    handleResize();

    // Adiciona um ouvinte de redimensionamento
    window.addEventListener("resize", handleResize);

    // Remove o ouvinte de redimensionamento quando o componente for desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = () => {
    // Lógica de pesquisa aqui (pode chamar a função onSearch)
    // Exemplo: onSearch(inputValue);
  };

  return (
    <>
      {isMobile ? (
        <div className="search-container">
       
          <img
            src="https://i.ibb.co/By6TFwq/search-interface-symbol-1.png"
            alt="Search"
            className="search-icon"
            onClick={handleSearch}
          />
        </div>
      ) : (
        <div className="search-container">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src="https://i.ibb.co/RQNdWdY/search-interface-symbol-5.png"
          alt="Search"
          className="search-icon"
          onClick={handleSearch}
        />
  

    
      </div>
      )}
    </>
  );
};

export default SearchInput;
