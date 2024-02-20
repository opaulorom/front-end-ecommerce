import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import Heart from "react-heart"

const IconToggle = ({ productId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const [active, setActive] = useState(localStorage.getItem('active') === 'true' ? true : false);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    if (!isSignedIn || !user || !isLoaded) {
      console.error('Usuário não autenticado.');
      return;
    }

    // Verificar se o produto está nos favoritos do usuário
    setIsFavorite(user.favorites && user.favorites.includes(productId));
  }, [isSignedIn, user, isLoaded, productId]);

  const handleClick = async () => {
    try {
      // Verificar se o usuário está autenticado
      if (!isSignedIn || !user || !isLoaded) {
        console.error('Usuário não autenticado.');
        return;
      }

      // Verificar se o produto está nos favoritos do usuário
      const isAlreadyFavorite = user.favorites && user.favorites.includes(productId);

      // Enviar uma requisição POST para adicionar/remover o produto dos favoritos
      const response = await fetch(
        `http://localhost:3001/api/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: user.id,
            productId: "65bf90c7033f4eb0d2d263eb",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsFavorite(!isAlreadyFavorite);
        setActive(!active);
        localStorage.setItem('active', !active);
      } else {
        console.error("Erro ao adicionar/remover produto dos favoritos");
      }
    } catch (error) {
      console.error("Erro ao adicionar/remover produto dos favoritos:", error);
    }
  };

  return (
    <div>
    <div style={{ width: "2rem" }}>
          <Heart isActive={active} onClick={handleClick} animationScale = {1.25} style = {{marginBottom:'1rem'}} />
        </div>
      
    </div>
  );
};

export default IconToggle;
