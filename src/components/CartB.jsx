import React, { useEffect, useState } from "react";
import axios from "axios";

import { useCart } from "../context/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./Cart.module.css";
import Cookies from "js-cookie";

const CartB = () => {
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const { removeFromCart } = useCart(); // Use a função removeFromCart do contexto do carrinho
  const userId = Cookies.get("userId"); // Obtenha o token do cookie
  const credentials = Cookies.get('role'); // Obtenha as credenciais do cookie

  const token = Cookies.get('token'); // Obtenha o token do cookie
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/cart/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Credentials: credentials,
        },
      })
      .then((response) => {
        const cartProducts = response.data.cart.products;
        if (cartProducts.length > 0) {
          setLastAddedProduct(cartProducts[cartProducts.length - 1]);
        }
      })
      .catch((error) => {
        console.log("Erro ao visualizar frete.", error);
      });
  }, [userId]);

  
  const handleQuantityChange = (productId, newQuantity) => {
    axios
      .put(
        `http://localhost:3001/api/update-quantity/${userId}/${productId}`,
        { quantity: newQuantity }
      )
      .then((response) => {
        // Atualize o estado do carrinho na sua aplicação, se necessário
        console.log("Quantidade do produto atualizada com sucesso.");
      })
      .catch((error) => {
        console.log(
          "Erro ao atualizar quantidade do produto no carrinho.",
          error
        );
      });
  };

  return (
    <div style={{ position: "relative" }}>
 

      

      {lastAddedProduct ? (
        <div
          style={{
            marginTop: "4rem",
            marginLeft: "3rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >

          {lastAddedProduct.productId.variations && (
            <img
              src={
                lastAddedProduct.productId.variations.find(
                  (variation) => variation.color === lastAddedProduct.color
                )?.urls[0]
              }
              alt={lastAddedProduct.productId.name}
              style={{ width: "10%", marginBottom: "10px" }}
            />
          )}

          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <span> {lastAddedProduct.productId.name}</span>
            <span> {lastAddedProduct.size}</span>
            <span> {lastAddedProduct.color}</span>
          </div>

          <RemoveIcon
            onClick={() => {
              const newQuantity = lastAddedProduct.quantity - 1;
              if (newQuantity >= 0) {
                handleQuantityChange(
                  lastAddedProduct.productId._id,
                  newQuantity
                );
              }
            }}
          />
          <input
            type="number"
            value={lastAddedProduct.quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value);
              setLastAddedProduct((prevProduct) => ({
                ...prevProduct,
                quantity: newQuantity,
              }));
              handleQuantityChange(lastAddedProduct.productId._id, newQuantity);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const newQuantity = parseInt(e.target.value);
                setLastAddedProduct((prevProduct) => ({
                  ...prevProduct,
                  quantity: newQuantity,
                }));
                handleQuantityChange(
                  lastAddedProduct.productId._id,
                  newQuantity
                );
              }
            }}
            style={{ width: "2vw" }}
          />

          <AddIcon
            onClick={() => {
              const newQuantity = lastAddedProduct.quantity + 1;
              setLastAddedProduct((prevProduct) => ({
                ...prevProduct,
                quantity: newQuantity,
              }));
              handleQuantityChange(
                lastAddedProduct.productId._id,
                newQuantity
              );
            }}
          />
        
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-5rem",
          }}
        >
          <img
            src="<https://i.ibb.co/x765V9y/bag-4.png>"
            alt=""
            style={{ width: "15vw" }}
          />
          <p>O carrinho está vazio.</p>
        </div>
      )}

  
    </div>
  );
};

export default CartB;
