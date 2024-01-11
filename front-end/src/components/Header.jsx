import React from "react";
import "./Header.css";
import SearchInput from "./SearchInput";
const Header = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Adicione sua lógica de pesquisa aqui
  };
  return (
    <div className="ContainerHeader">
      <h1>Logo</h1>
      <div style={{marginRight:"5rem"}}>
        {" "}
        <SearchInput placeholder="Pesquisar..." onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Header;
