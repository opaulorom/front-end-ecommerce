import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import CategoriesList from "./CategoriesList";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {useAuth} from "../context/AuthContext"
import axios from "axios";
import Cookies from "js-cookie";

const Header = () => {
  const { cartItemCount, addToCart, removeFromCart } = useCart();
  const [localCartItemCount, setLocalCartItemCount] = useState(0);
  const userId = Cookies.get('userId'); // Obtenha o token do cookie
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação

  useEffect(() => {
    const storedCartItemCount = localStorage.getItem("cartItemCount");
    if (storedCartItemCount !== null) {
      setLocalCartItemCount(Number(storedCartItemCount));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/cart/${userId}`)
        .then((response) => {
          setLocalCartItemCount(
            Math.max(response.data.cart.products.length, 0)
          );
        })
        .catch((error) => {
          console.error(
            "Erro ao obter o número de produtos no carrinho:",
            error
          );
        });
    } else {
      setLocalCartItemCount(cartItemCount);
    }
  }, [loggedIn, userId, cartItemCount]);

  useEffect(() => {
    localStorage.setItem("cartItemCount", localCartItemCount);
  }, [localCartItemCount]);

  return (
    <>
      <div className={styles.ContainerHeader}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            marginTop: "-2rem",
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
            }}
            className={styles.SearchBar}
          >
            {" "}
            {/* Margem esquerda automática para empurrar para a direita */}
            <SearchBar />
          </div>

          <div className={styles.desktopContainer}>
            <Link to={"/perfil"} style={{zIndex:"99999"}}>
              {" "}
              <img src="https://i.ibb.co/L1tX6LY/user-2.png" alt="" />
            </Link>

            <Link
              to={"/favoritos"}
              style={{
                cursor: "pointer",
                zIndex:"99999"
              }}
            >
              <img src="https://i.ibb.co/2ZnFQfq/heart-1.png" alt="" />
            </Link>
            <Link
              to={"/cart"}
              style={{ position: "relative", display: "inline-block",zIndex:"99999" }}
            >
              <img src="https://i.ibb.co/FwNpdzD/shopping-bag-1.png" alt="" />
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "13px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loggedIn ? localCartItemCount : 0}
              </span>
            </Link>
          </div>
        </div>
        <div className={styles.MobileHeader}>
          <Link
            to={"/favoritos"}
            style={{
              cursor: "pointer",
            }}
          >
            <FavoriteBorderIcon style={{ fontSize: "1.8rem" }} />
          </Link>
          <Link to={"/perfil"}>
            <AccountCircleOutlinedIcon style={{ fontSize: "1.8rem" }} />
          </Link>
          <Link
            to={"/cart"}
            style={{ position: "relative", display: "inline-block" }}
          >
            <span
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                width: "20px",
                height: "20px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                fontSize: "13px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loggedIn ? localCartItemCount : 0}
            </span>
            <ShoppingBagOutlinedIcon style={{ fontSize: "1.8rem" }} />
          </Link>
        </div>
        <div
          style={{
            marginTop: "-10rem",
            zIndex: 1, // Define o z-index para 1
            position: "absolute",
          }}
        >
          <CategoriesList />
        </div>
      </div>
    </>
  );
};

export default Header;
