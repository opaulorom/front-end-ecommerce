import React, { useState } from 'react';
import { useUser } from "@clerk/clerk-react";

const IconToggle = ({ productId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const handleClick = async () => {
    try {
      // Verificar se o usuário está autenticado
      if (!isSignedIn || !user || !isLoaded) {
        console.error('Usuário não autenticado.');
        return;
      }

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
            productId: "65bf9160033f4eb0d2d26458",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsFavorite(data.user.favorites.includes(productId));
      } else {
        console.error("Erro ao adicionar/remover produto dos favoritos");
      }
    } catch (error) {
      console.error("Erro ao adicionar/remover produto dos favoritos:", error);
    }
  };

  return (
    <div>
      {isFavorite  ? (
          <img src='https://i.ibb.co/DKmxvXT/heart-3.png' onClick={handleClick} />
          ) : (
          <img src='https://i.ibb.co/h1HfgJs/heart-2.png' onClick={handleClick} />
      )}
    </div>
  );
};

export default IconToggle;
