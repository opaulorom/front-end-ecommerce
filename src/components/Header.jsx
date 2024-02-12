import React from "react";
import styles from "./Header.module.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchBar from "./SearchBar";
import CategoriesList from "./CategoriesList";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
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
          }}
        >
          {/* Ícone à esquerda */}
          <i
            style={{
              position: "absolute",
              left: "-68rem", // Posiciona o elemento no lado esquerdo
            }}
          >
            <img
              src="https://i.ibb.co/6WRG0XT/wardrobe.png"
              alt="logo"
              style={{ maxWidth: "10vw" }}
            />
          </i>

          {/* Componente SearchBar à direita */}
          <div style={{ marginRight: "15rem" }} className={styles.SearchBar}>
            {" "}
            {/* Margem esquerda automática para empurrar para a direita */}
            <SearchBar />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: "5rem",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem"
            }}
          >
            <FavoriteBorderIcon  style={{         fontSize:"1.9rem"}}/>
            <AccountCircleOutlinedIcon style={{         fontSize:"1.9rem"}}/>
            <ShoppingBagOutlinedIcon style={{         fontSize:"1.9rem"}}/>
          </div>
          <div></div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Header;
