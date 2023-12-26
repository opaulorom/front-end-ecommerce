// Navbar.js

import React, { useState } from "react";
import { FaHome, FaList, FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState(null)
    const handleItemClick = (index) => {
        setActiveLink(index);
        // Aqui você pode adicionar a lógica para lidar com o clique no link, se necessário
      };
  return (
    <div className="navbar">
      <Link to={"/home"}>
        <div className="nav-item">
          <FaHome />
          <span>Home</span>
        </div>
      </Link>
      <Link to={"/categorias"}>
        <div className="nav-item">
          <FaList />
          <span>Categorias</span>
        </div>
      </Link>
      <Link to={"/carrinho"}>
        <div className="nav-item">
          <FaShoppingCart />
          <span>Carrinho</span>
        </div>
      </Link>

      <Link to={"/perfil"}>
        <div className="nav-item">
          <FaUser />
          <span>Perfil</span>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
