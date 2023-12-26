// Navbar.js

import React, { useState } from "react";
import { FaHome, FaList, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleItemClick = (index) => {
    setActiveLink(index);
    // Lógica adicional, se necessário
  };

  return (
    <div className="navbar">
      <NavLink to="/home" activeClassName="active" onClick={() => handleItemClick(0)}>
        <div className={`nav-item ${activeLink === 0 ? 'active' : ''}`}>
          <FaHome />
          <span>Home</span>
        </div>
      </NavLink>
      <NavLink to="/categorias" activeClassName="active" onClick={() => handleItemClick(1)}>
        <div className={`nav-item ${activeLink === 1 ? 'active' : ''}`}>
          <FaList />
          <span>Categorias</span>
        </div>
      </NavLink>
      <NavLink to="/carrinho" activeClassName="active" onClick={() => handleItemClick(2)}>
        <div className={`nav-item ${activeLink === 2 ? 'active' : ''}`}>
          <FaShoppingCart />
          <span>Carrinho</span>
        </div>
      </NavLink>
      <NavLink to="/perfil" activeClassName="active" onClick={() => handleItemClick(3)}>
        <div className={`nav-item ${activeLink === 3 ? 'active' : ''}`}>
          <FaUser />
          <span>Perfil</span>
        </div>
      </NavLink>
    </div>
  );
};

export default Navbar;
