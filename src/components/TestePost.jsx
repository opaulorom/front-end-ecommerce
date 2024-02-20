import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// Criar um átomo para armazenar a função toggleFavorite e o estado favorites
const favoritesAtom = atom({
  favorites: [],
  toggleFavorite: async (clerkUserId, productId) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/favorites`, {
        clerkUserId,
        productId,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar/remover produto dos favoritos:", error);
      return null;
    }
  }
});

const TestePost = () => {
  const clerkUserId = "user_2cVPVOEfoBibCy2khNTKk3m4fU1";
  const [{ favorites, toggleFavorite }] = useAtom(favoritesAtom);
  const [productId, setProductId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = async () => {
    const response = await toggleFavorite(clerkUserId, productId);
    if (response) {
      setFavorites(response.user.favorites);
      setIsFavorite(response.user.favorites.some(favorite => favorite._id === productId));
    }
  };

  return (
    <div>
      <button onClick={handleToggleFavorite} style={{marginTop:"-10rem"}}>
        {isFavorite ? <FavoriteBorderIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
      </button>
    </div>
  )
}

export default TestePost
