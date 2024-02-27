import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Header from "./Header";

const Cart = () => {
  const [getCart, setGetCart] = useState([]);
  const [handleDeleteProduct, setHandleDeleteProduct] = useState(false)
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const clerkUserId = user.id;
      axios
        .get(`http://localhost:3001/api/cart/${clerkUserId}`)
        .then((response) => {
          setGetCart(response.data.cart.products);
        })
        .catch((error) => {
          console.log("Erro ao visualizar frete.", error);
        });
    }
  }, [isLoaded, isSignedIn, user]);





  const handleDelete = (productId) => {
    const clerkUserId = user.id;
    axios
      .delete(`http://localhost:3001/api/remove-from-cart/${clerkUserId}/${productId}`)
      .then((response) => {
        console.log(response.data.message);
        // Atualize o estado do carrinho na sua aplicação, se necessário
        setGetCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
      })
      .catch((error) => {
        console.error("Erro ao remover produto do carrinho:", error);
      });
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
                onClick={() => {
                  const newQuantity = item.quantity - 1;
                  if (newQuantity >= 0) {
                    const newCart = [...getCart];
                    newCart[index].quantity = newQuantity;
                    const clerkUserId = user.id;
                    const productId = item.productId._id;
                    axios
                      .put(
                        `http://localhost:3001/api/update-quantity/${clerkUserId}/${productId}`,
                        { quantity: newQuantity }
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
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value);
                  const newCart = [...getCart];
                  newCart[index].quantity = newQuantity;
                  setGetCart(newCart);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const newQuantity = parseInt(e.target.value);
                    const newCart = [...getCart];
                    newCart[index].quantity = newQuantity;
                    const clerkUserId = user.id;
                    const productId = item.productId._id;
                    axios
                      .put(
                        `http://localhost:3001/api/update-quantity/${clerkUserId}/${productId}`,
                        { quantity: newQuantity }
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
              />
              <button
                onClick={() => {
                  const newQuantity = item.quantity + 1;
                  const newCart = [...getCart];
                  newCart[index].quantity = newQuantity;
                  const clerkUserId = user.id;
                  const productId = item.productId._id;
                  axios
                    .put(
                      `http://localhost:3001/api/update-quantity/${clerkUserId}/${productId}`,
                      { quantity: newQuantity }
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
                }}
              >
                +
              </button>
              <button onClick={() => handleDelete(item.productId._id)}>Excluir produto</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Cart;
