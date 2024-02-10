// Navbar.js

import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleItemClick = (index) => {
    setActiveLink(index);
  };

  const isActive = (index) => {
    return index === activeLink ? "active" : "";
  };


  return (
    <div className="hide">
      <div className="navbar">
        <Link to={"/home"} className={`nav-item ${isActive(0)} `}>
          <img src="https://i.ibb.co/J3gLZnz/home-4.png" />
          <span className="span">Home</span>
        </Link>

        <Link to={"/categorias"} className={`nav-item ${isActive(1)}`}>
          <img src="https://i.ibb.co/HqPdMws/category-1.png" />
          <span className="span">Categorias</span>
        </Link>

        <Link to={"/carrinho"} className={`nav-item ${isActive(2)}`}>
          <img src="https://i.ibb.co/c1F91T2/shopping-bag-4.png" />
          <span className="span">Carrinho</span>
        </Link>

        <Link to={"/perfil"} className={`nav-item ${isActive(3)}`}>
          <img src="https://i.ibb.co/bBpcH5t/user-4.png" />
          <span className="span">Perfil</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
