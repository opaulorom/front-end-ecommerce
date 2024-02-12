import React from "react";
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import CategoriesList from "./CategoriesList";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const Header = () => {
  return (
    <>
      <div className={styles.ContainerHeader}>
        <div
          style={{
            marginTop: "-10rem",
          }}
        >
          <CategoriesList />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            marginTop:'-2rem'
          }}
        >
          {/* Ícone à esquerda */}
          <i
            style={{
              position: "absolute",
              left: "-25rem", // Posiciona o elemento no lado esquerdo
            }}
          >
           <p>Logo</p>
          </i>

          {/* Componente SearchBar à direita */}
          <div style={{ marginRight: "10rem" }} className={styles.SearchBar}>
            {" "}
            {/* Margem esquerda automática para empurrar para a direita */}
            <SearchBar />
          </div>

          <div
        
            className={styles.desktopContainer}
          >
            <img src="https://i.ibb.co/L1tX6LY/user-2.png" alt="" />
            <img src="https://i.ibb.co/2ZnFQfq/heart-1.png" alt="" />

            <img src="https://i.ibb.co/FwNpdzD/shopping-bag-1.png" alt="" />
          </div>


        
          <div></div>
        </div>
        <div className={styles.MobileHeader}>
            <FavoriteBorderIcon style={{ fontSize: "1.8rem"}} />
            <AccountCircleOutlinedIcon style={{ fontSize: "1.8rem" }} />
            <ShoppingBagOutlinedIcon style={{ fontSize: "1.8rem" }} />
            
          </div>
      </div>
    </>
  );
};

export default Header;
