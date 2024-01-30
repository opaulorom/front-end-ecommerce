import React from "react";
import "./Header.css";

import SearchBar from "./SearchBar";
import CategoriesList from "./CategoriesList";

const Header = () => {
  
  return (
    <>
    <div className="ContainerHeader">
      <h1>Logo</h1>
      <div style={{marginRight:"5rem"}}>
        {" "}
        <SearchBar/>
      </div>
    
    </div>  <div>
      <CategoriesList/>

      </div>
    </>
  );
};

export default Header;
