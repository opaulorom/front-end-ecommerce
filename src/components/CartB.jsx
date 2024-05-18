import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import styles from "./CartB.module.css";
import AddIcon from "@mui/icons-material/Add";

import RemoveIcon from "@mui/icons-material/Remove";
const CartB = () => {
  const [getCart, setGetCart] = useState([]);
  const [getTotal, setGetTotal] = useState({});
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const { logout, loggedIn } = useAuth();
  const productsContainerRef = useRef(null);
  const [exceedAvailability, setExceedAvailability] = useState(1);

  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGetCart(response.data.cart.products);
        setGetTotal(response.data.cart);
      })
      .catch((error) => {
        console.log("Erro ao visualizar frete.", error);
      });
  }, [userId, token]);




  
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

      {getCart.length === 0 && loggedIn ? (
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
                  {item.productId.variations &&
                  item.productId.variations.some((variation) =>
                    variation.sizes.some((size) => size.quantityAvailable > 0)
                  ) ? (
                    <p>{`Apenas ${
                      item.productId.variations
                        .find((variation) =>
                          variation.sizes.some(
                            (size) => size.quantityAvailable > 0
                          )
                        )
                        .sizes.find((size) => size.quantityAvailable > 0)
                        .quantityAvailable
                    } unidades em estoque`}</p>
                  ) : (
                    <p className={styles.p}>0 unidades em estoque</p>
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
                    {item.productId.variations &&
                      item.productId.variations
                        .find((variation) => variation.color === item.color)
                        ?.sizes.map(
                          (size) =>
                            size.size === item.size && (
                              <div key={size.size}>
                                <span className={styles.spanPrice}>
                                  Preço: R${size.price && size.price.toFixed(2)}
                                </span>
                              </div>
                            )
                        )}
                         <div className={styles.quantityContainer}>
                          <RemoveIcon
                            onClick={() => {
                              const newQuantity = item.quantity - 1; // Defina newQuantity antes de usá-la
                              if (newQuantity >= 0) {
                                const newCart = [...getCart];
                                newCart[index].quantity = newQuantity;
                                const productId = item.productId._id;
                                const color = item.color;
                                const size = item.size;
                                const token = Cookies.get("token");

                                axios
                                  .put(
                                    `http://localhost:3001/api/update-quantity/${userId}/${productId}/${color}/${size}`,
                                    { quantity: newQuantity },
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  )
                                  .then((response) => {
                                    setGetCart((prevCart) => {
                                      const newCart = [...prevCart];
                                      newCart[index].quantity = newQuantity;
                                      return newCart;
                                    });
                                  })
                                  .catch((error) => {
                                    console.log(
                                      "Erro ao atualizar quantidade do produto no carrinho.",
                                      error
                                    );
                                  });
                              }
                            }}
                            style={{ cursor: "pointer" }}
                          />
                          <span
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              const newCart = [...getCart];
                              newCart[index].quantity = newQuantity;
                              setGetCart(newCart);
                              handleQuantityChange(
                                item.productId._id,
                                newQuantity
                              );
                            }}
                            style={{}}
                            className={styles.inputContainer}
                          >
                            {" "}
                            {item.quantity}
                          </span>
                          <AddIcon
                            onClick={() => {
                              const newQuantity = item.quantity + 1;
                              const productId = item.productId._id;
                              const color = item.color; // Certifique-se de estar obtendo o variationId corretamente
                              const size = item.size; // Certifique-se de estar obtendo o variationId corretamente

                              const token = Cookies.get("token");

                              axios
                                .put(
                                  `http://localhost:3001/api/update-quantity/${userId}/${productId}/${color}/${size}`,
                                  { quantity: newQuantity },
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                )
                                .then((response) => {
                                  const products = response.data.cart.products;

                                  console.log(
                                    "Produtos no carrinho:",
                                    products
                                  );

                                  // Verifica se a quantidade de algum produto excede a disponibilidade
                                  const exceedAvailability = products.some(
                                    (product) => {
                                      console.log(
                                        "Excede disponibilidade?",
                                        product.availableQuantity
                                      );
                                      setExceedAvailability(
                                        product.exceedAvailability
                                      );

                                      console.log(
                                        "Verificando produto:",
                                        product.productId
                                      );
                                      return (
                                        product.quantity >
                                        product.availableQuantity
                                      );
                                    }
                                  );

                                  console.log(
                                    "Excede disponibilidade?",
                                    exceedAvailability
                                  );

                                  if (exceedAvailability) {
                                    console.log(
                                      "A quantidade no carrinho excede a disponibilidade de algum produto. Botão desabilitado."
                                    );
                                    // Não continua com a atualização do carrinho
                                    return;
                                  }

                                  console.log(
                                    "Excede disponibilidade?",
                                    exceedAvailability
                                  );

                                  if (exceedAvailability) {
                                    return; // Não continua com a atualização do carrinho
                                  }

                                  if (exceedAvailability) {
                                    return; // Não continua com a atualização do carrinho
                                  }

                                  // Atualiza o estado apenas se a quantidade for válida
                                  setGetCart((prevCart) => {
                                    const newCart = [...prevCart];

                                    const productIndex = newCart.findIndex(
                                      (product) =>
                                        product.productId._id === productId &&
                                        product.color === color &&
                                        product.size === size
                                    ); // Certifique-se de verificar também o variationId
                                    if (productIndex !== -1) {
                                      newCart[productIndex].quantity =
                                        newQuantity;
                                    }
                                    return newCart;
                                  });
                                })
                                .catch((error) => {
                                  console.log(
                                    "Erro ao atualizar quantidade do produto no carrinho.",
                                    error
                                  );
                                });
                              setUpdatedQuantity(newQuantity);
                              console.log("quantidade", newQuantity);
                            }}
                            style={{
                              cursor: "pointer",
                              // opacity: updatedQuantity === -1 c
                              // opacity:
                              // exceedAvailability === -1
                              // ? 1 : 0.5
                            }}
                          />
                                            </div>

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
                <span>
                  total de{" "}
                  <b style={{ color: "#212121" }}>{getTotal.TotalQuantity}</b>{" "}
                  produto(s) na sacola{" "}
                </span>
                <span className={styles.TotalQuantity}></span>
              </div>
              <div className={styles.totalAmount}>
                <span className={styles.totalAmount}> Total:</span>
                <span className={styles.totalAmount}>
                  {" "}
                  R${getTotal.totalAmount && getTotal.totalAmount.toFixed(2)}
                </span>
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
                width: "20vw",
                padding: ".8rem",
                fontWeight: "600",
                fontFamily: "poppins, sans-serif",
                fontSize: "1rem",
                cursor: "pointer",
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

export default CartB;
