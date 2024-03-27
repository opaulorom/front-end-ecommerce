import React, { useEffect, useState } from "react";
import styles from "./PaymentHeader.module.css";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className={styles.ContainerHeader}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            marginTop: "-0.45rem",
          }}
        >
          {/* Ícone à esquerda */}
          <i
            style={{
              position: "absolute",
              left: "2rem", // Posiciona o elemento no lado esquerdo
              zIndex: "999999",
            }}
          >
            <Link to={"/home"}>
              <img
                src="https://i.ibb.co/B3xYDzG/Logo-mediewal-1.png"
                style={{ width: "12vw" }}
              />
            </Link>
          </i>

          {/* Componente SearchBar à direita */}
          <div
            style={{
              marginRight: "1.5rem",
              marginLeft: "35rem",
              zIndex: "9999",
              display:"flex",
              alignItems:"center",
              gap:"1rem"
              

            }}

          >
            {" "}
            {/* Margem esquerda automática para empurrar para a direita */}
            <img src="https://i.ibb.co/3FvrMNv/verified-1.png" alt="" />
            <span style={{fontSize:"1rem"}}>Você está em ambiente seguro!</span>
            
          </div>
        </div>
        <div style={{position:"absolute", right:"20px", gap:"1rem", display:"flex", alignItems:"center"}}>

            <p>exemploDeEmail@gmail.com</p>
            <p>(99) 999.999.9999</p>
            </div>
      </div>
    </>
  );
};

export default Header;
