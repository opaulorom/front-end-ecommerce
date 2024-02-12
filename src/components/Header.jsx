import React from "react";
import styles from "./Header.module.css";

import SearchBar from "./SearchBar";
import CategoriesList from "./CategoriesList";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const Header = () => {
  
  return (
    <>
    <div className={styles.ContainerHeader}>
    <div style={{
        marginTop:"-10rem"
      }}>
      <CategoriesList/>
      </div>
      <div style={{
  display: "flex",
  alignItems: "center",
  position: "relative"
}}>
  {/* Ícone à esquerda */}
  <i style={{
    position: "absolute",
    left: "-68rem",  // Posiciona o elemento no lado esquerdo
  }}>
    <img src="https://i.ibb.co/6WRG0XT/wardrobe.png" alt="logo" style={{ maxWidth: "10vw" }} />
  </i>
  
  {/* Componente SearchBar à direita */}
  <div style={{ marginRight: "15rem" }} className={styles.SearchBar}> {/* Margem esquerda automática para empurrar para a direita */}
    <SearchBar/>
  </div>
  
  <div  style={{
     display:"flex",
     flexDirection:"row",
     marginRight: "5rem",
     alignItems:"center",
     justifyContent:"center",
     gap:"1.5rem"

   }}>


     <img src="https://i.ibb.co/L1tX6LY/user-2.png" alt="" />
    <img src="https://i.ibb.co/2ZnFQfq/heart-1.png" alt="" />



    <img src="https://i.ibb.co/FwNpdzD/shopping-bag-1.png" alt="" />
  
    <FavoriteBorderIcon/>
  </div>
 
</div>


    </div>  
    <div>
  

      </div>
    </>
  );
};

export default Header;
