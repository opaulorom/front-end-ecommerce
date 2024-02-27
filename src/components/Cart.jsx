import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Header from "./Header";

const Cart = () => {
  const [getCart, setGetCart] = useState([]);
  const [availableQuantities, setAvailableQuantities] = useState({});
  const [message, setMessage] = useState("");

  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const clerkUserId = user.id;
      axios
        .get(`http://localhost:3001/api/cart/${clerkUserId}`)
        .then((response) => {
          setGetCart(response.data.cart.products);
          const quantities = {};
          response.data.cart.products.forEach((product) => {
            quantities[product.productId._id] = product.productId.quantity;
          });
          setAvailableQuantities(quantities);
        })
        .catch((error) => {
          console.log("Erro ao visualizar frete.", error);
        });
    }
  }, [isLoaded, isSignedIn, user]);

  const handleAdd = (productId) => {
    const newQuantity = getCart.find((item) => item.productId._id === productId).quantity + 1;
    if (newQuantity <= availableQuantities[productId]) {
      const newCart = getCart.map((item) => {
        if (item.productId._id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setGetCart(newCart);
    } else {
      setMessage(`Só tem ${availableQuantities[productId]} produtos em estoque.`);
    }
  };

  const handleRemove = (productId) => {
    const newQuantity = getCart.find((item) => item.productId._id === productId).quantity - 1;
    if (newQuantity >= 0) {
      const newCart = getCart.map((item) => {
        if (item.productId._id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setGetCart(newCart);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      {getCart.length === 0 ? (
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
      ) : (
        <>
          {getCart.map((item, index) => (
            <div key={index} style={{ marginTop: "10rem", marginLeft: "1rem" }}>
              <b>nome:</b> {item.productId.name}
              <b>preço:</b> {item.productId.price}
              <b>tamanho:</b> {item.productId.size}
              <button
                onClick={() => handleRemove(item.productId._id)}
                disabled={item.quantity === 0}
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value);
                  if (newQuantity <= availableQuantities[item.productId._id]) {
                    const newCart = getCart.map((cartItem) => {
                      if (cartItem.productId._id === item.productId._id) {
                        return { ...cartItem, quantity: newQuantity };
                      }
                      return cartItem;
                    });
                    setGetCart(newCart);
                  } else {
                    setMessage(`Só tem ${availableQuantities[item.productId._id]} produtos em estoque.`);
                  }
                }}
              />
              <button
                onClick={() => handleAdd(item.productId._id)}
                disabled={item.quantity === availableQuantities[item.productId._id]}
              >
                +
              </button>
            </div>
          ))}
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
};

export default Cart;
