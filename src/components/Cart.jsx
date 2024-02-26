import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const Cart = () => {
  const [getCart, setGetCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

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

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div>
      <Navbar />
      {getCart.length === 0 ? (
        
        <> 
        <div style={{display:'flex', flexDirection:"column",alignItems:"center", justifyContent:"center", marginTop:"10rem"}}>
        <img src='https://i.ibb.co/x765V9y/bag-4.png' alt=""  style={{width:"15vw"}}/>
        <p>O carrinho está vazio.</p>
        </div>
        
        
        </>
       
      ) : (
        getCart.map((item, index) => (
          <div key={index} style={{ marginTop: "2rem", marginLeft: "1rem" }}>
            <b>nome:</b> {item.productId.name}
            <b>preço:</b> {item.productId.price}
            <b>tamanho:</b> {item.productId.size}
            <div>
              <button onClick={handleDecrementQuantity}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button onClick={handleIncrementQuantity}>+</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
