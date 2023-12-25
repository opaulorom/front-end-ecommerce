import React from "react";
import "./Home.css"
import Products from "./Products";
const Home = () => {
  return (
    <div>
    <header>
     <div className="container">
     
        <h2 style={{listStyle:"none"}} width={"120"} height={"37"} alt="">Logo</h2>

     </div>
     <div className="header-search-container">
      <input type="search" name="search" className="search-files" placeholder="Pesquisar Produto"/>
     </div>
    </header>
    <Products></Products>
    </div>
  );
};

export default Home;
