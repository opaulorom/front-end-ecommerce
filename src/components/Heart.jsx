import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useClerk } from "@clerk/clerk-react";

const Heart = ({ productId, clerkUserId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const clerk = useClerk();
  useEffect(() => {
    // Aqui você pode fazer uma requisição para o backend para verificar se o produto está nos favoritos do usuário
    // Você pode usar o productId e clerkUserId para fazer a requisição
    // Por exemplo, você pode usar o fetch() ou axios para fazer a requisição
    fetch(`http://localhost:3001/api/favorites/${clerk.userId}`)
      .then(response => response.json())
      .then(data => {
        // Verificar se o produto está nos favoritos do usuário
        const isProductInFavorites = data.favorites.some(favorite => favorite._id === productId);
        setIsFavorite(isProductInFavorites);
      })
      .catch(error => console.error('Erro ao verificar se o produto está nos favoritos:', error));
  }, [productId, clerk.userId]);

  return (
    <div>
      {isFavorite ? <FavoriteBorderIcon color="red" /> : <FavoriteBorderIcon color="red" />}
    </div>
  );
};

export default Heart;
