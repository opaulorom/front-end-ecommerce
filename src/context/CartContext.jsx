import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  
  const [cartItemCount, setCartItemCount] = useState(() => {
    const storedCartItemCount = localStorage.getItem("cartItemCount");
    if (storedCartItemCount !== null) {
      return Number(storedCartItemCount);
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem("cartItemCount", cartItemCount);
  }, [cartItemCount]);

  const addToCart = (productDetails) => {
    setCartItemCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = () => {
    setCartItemCount((prevCount) => Math.max(prevCount - 1, 0));
  };


  const clearCart = () => {
    setCartItemCount([]);
    localStorage.removeItem("cartItemCount");
  };
  return (
    <CartContext.Provider value={{ cartItemCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
