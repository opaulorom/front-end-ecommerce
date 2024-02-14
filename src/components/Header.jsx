import React from "react";
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import CategoriesList from "./CategoriesList";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
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
            marginTop:'-2rem'
          }}
        >
          {/* Ícone à esquerda */}
          <i
            style={{
              position: "absolute",
              left: "2rem", // Posiciona o elemento no lado esquerdo
          
            }}
          >
           <img  src="https://i.ibb.co/BZZ2571/Mediewallogo.png" style={{width:"12vw"}}/>
          </i>

          {/* Componente SearchBar à direita */}
          <div style={{ marginRight: "1.5rem",marginLeft:"35rem", zIndex:"9999"}} className={styles.SearchBar}>
            {" "}
            {/* Margem esquerda automática para empurrar para a direita */}
            <SearchBar />
          </div>

          <div
        
            className={styles.desktopContainer}
          >
           <Link to={"/perfil"}> <img src="https://i.ibb.co/L1tX6LY/user-2.png" alt="" /></Link>
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
          <div
    style={{
      marginTop: "-10rem",
      zIndex: 1, // Define o z-index para 1
     position:"absolute"
    }}
  >
    <CategoriesList />
  </div>
      </div>
      
    </>
  );
};

export default Header;
