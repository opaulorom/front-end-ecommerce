import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const Cart = () => {
  const [getCart, setGetCart] = useState([]);

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

  return (
    <div>
      <Navbar />
      {getCart.map((item) => (
        <div key={item.productId._id} style={{ marginTop: "2rem", marginLeft: "1rem" }}>
          <b>nome:</b> {item.productId.name}
          <b>preço:</b> {item.productId.price}
          <b>tamanho:</b> {item.productId.size}
        </div>
      ))}
    </div>
  );
};

export default Cart;
