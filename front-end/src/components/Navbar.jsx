// Navbar.js

import React, { useState } from "react";
import { FaHome, FaList, FaShoppingCart, FaUser } from "react-icons/fa";
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
    <div className="navbar">
      <Link to={"/home"} >
        <div onClick={() => handleItemClick(0)} className={`nav-item ${isActive(0)}`}>
          <FaHome />
          <span>Home</span>
        </div>
      </Link>
      <Link to={"/categorias"}>
        <div  onClick={() => handleItemClick(1)} className={`nav-item ${isActive(1)}`}>
          <FaList />
          <span>Categorias</span>
        </div>
      </Link>
      <Link to={"/carrinho"} >
        <div onClick={() => handleItemClick(2)} className={`nav-item ${isActive(2)}`}>
          <FaShoppingCart/>
          <span>Carrinho</span>
        </div>
      </Link>
      <Link to={"/perfil"} >
        <div  onClick={() => handleItemClick(3)} className={`nav-item ${isActive(3)}`}>
          <FaUser />
          <span>Perfil</span>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
