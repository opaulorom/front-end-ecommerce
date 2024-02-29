import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(() => {
    // Tenta obter o cartItemCount do localStorage
    const storedCartItemCount = localStorage.getItem("cartItemCount");

    // Se o cartItemCount estiver armazenado, retorna o valor convertido para número
    if (storedCartItemCount !== null) {
      return Number(storedCartItemCount);
    }

    // Caso contrário, retorna 0
    return 0;
  });

  useEffect(() => {
    // Atualiza o localStorage sempre que o cartItemCount mudar
    localStorage.setItem("cartItemCount", cartItemCount);
  }, [cartItemCount]);

  const addToCart = () => {
    setCartItemCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem("cartItemCount", newCount);
      return newCount;
    });
  };

  const removeFromCart = () => {
    setCartItemCount((prevCount) => {
      const newCount = Math.max(prevCount - 1, 0);
      localStorage.setItem("cartItemCount", newCount);
      return newCount;
    });
  };

  return (
    <CartContext.Provider value={{ cartItemCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
