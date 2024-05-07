import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Header from "./Header";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./CartB.module.css";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const [getCart, setGetCart] = useState([]);
  const [handleDeleteProduct, setHandleDeleteProduct] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { removeFromCart } = useCart(); // Use a função removeFromCart do contexto do carrinho
  const [getTotal, setGetTotal] = useState({});
  const [selectedFreteIndex, setSelectedFreteIndex] = useState(
    localStorage.getItem("selectedFreteIndex") || null
  );
  const userId = Cookies.get("userId"); // Obtenha o token do cookie
  const [cep, setCep] = useState(localStorage.getItem("cep") || "");
  const [frete, setFrete] = useState(null);
  const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie
  const token = Cookies.get("token"); // Obtenha o token do cookie
  const [shippingFee, setShippingFee] = useState(0);
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  const productsContainerRef = useRef(null);

  function handleProducts() {
    axios
      .get(`http://localhost:3001/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGetCart(response.data.cart.products);
      })
      .catch((error) => {
        console.log("Erro ao visualizar frete.", error);
      });
  }
  useEffect(() => {
    handleProducts();
  }, []);



  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      })
      .then((response) => {
        setGetCart(response.data.cart.products);

          setGetTotal(response.data.products);
    
      })

      .catch((error) => {
        console.log("Erro ao visualizar frete.", error);
      });
  }, [userId, getCart, getTotal]);


  return (
    <div style={{ position: "relative" }}>
      {getCart.length === 0 && !loggedIn && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "15rem",
            }}
          >
            <div
              style={{
                marginTop: "5rem",
                fontFamily: "poppins",
                fontSize: "1rem",
                fontWeight: "400",
              }}
            >
              {" "}
              Somente os usuários registrados podem acessar esta página faça{" "}
              <Link
                to={"/perfil"}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {" "}
                <b
                  style={{
                    fontFamily: "poppins",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                  }}
                >
                  {" "}
                  Login
                </b>
                .
              </Link>{" "}
            </div>
          </div>
        </>
      )}

      {getCart.length === 0 && loggedIn === true ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15rem",
          }}
        >
          <img
            src="https://i.ibb.co/x765V9y/bag-4.png"
            alt=""
            style={{ width: "15vw" }}
          />
          <p>O carrinho está vazio.</p>
        </div>
      ) : (
        <div className={styles.verticalScroll} ref={productsContainerRef}>
          {getCart.map((item, index) => (
            <div key={index} className={styles.product}>
              <div
                style={{
                  border: "1px solid #e9e9e9",
                  display: "flex",
                  flexDirection: "column",
                  width: "20vw",
                  justifyContent: "space-between",
                  padding: "16px 24px 16px 16px",
                  marginBottom: "3rem",
                }}
              >
                <div className={styles.quantity}>
                  {" "}
                  {item.productId.quantity > 0 ? (
                    <p>{`Apenas ${item.productId.quantity} unidades em estoque`}</p>
                  ) : (
                    <p className={styles.p}>
                      Produto esgotado so temos 1 no estoque
                    </p>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    {item.productId.variations && (
                      <img
                        src={
                          item.productId.variations.find(
                            (variation) => variation.color === item.color
                          )?.urls[0]
                        }
                        alt={item.productId.name}
                        className={styles.image}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    className={styles.texts}
                  >
                    <span className={styles.spanName}>
                      {" "}
                      {item.productId.name}
                    </span>
                    <span className={styles.spanSize}>
                      {" "}
                      Tamanho: {item.size}
                    </span>
                    <span className={styles.spanColor}> Cor: {item.color}</span>
                    {item.productId.variations && item.productId.variations.find(variation => variation.color === item.color) && (
  <span className={styles.spanPrice}>
    Preço: R${item.productId.variations.find(variation => variation.color === item.color).price.toFixed(2)}
  </span>
)}


                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {getCart.length > 0 && (
        <div style={{ marginLeft: "14rem" }}>
          {getTotal && typeof getTotal === "object" && getTotal.totalAmount && (
            <div className={styles.totalAmountAndQuantityContainer}>
              <div className={styles.TotalQuantity}>
                <span >total de <b style={{color:"#212121"}}>{getTotal.TotalQuantity}</b> produto(s) na sacola </span>
                <span className={styles.TotalQuantity}></span>
              </div>
              <div className={styles.totalAmount}>
                <span className={styles.totalAmount}> Total:</span>
                <span className={styles.totalAmount}>  R${ getTotal.totalAmount && getTotal.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {getCart.length > 0 && (
        <div className={styles.buttonCart}>
          <Link to={"/cart"}>
            <button
              style={{
                backgroundColor: "#E94D36",
                color: "white",
                border: "none",
                width:"20vw",
                padding: ".8rem",
       
                fontWeight: "600",
                fontFamily: "poppins, sans-serif",
                fontSize:"1rem"
,                cursor: "pointer",
                position: "absolute",
                marginTop: "10rem",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              IR PRA SACOLA
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
