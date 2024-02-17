import React from 'react';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../Jotai/favoritesAtom';

const Heart = ({ isFavorite, productId }) => {
    const [favorites, setFavorites] = useAtom(favoritesAtom);
  
    const toggleFavorite = () => {
      if (favorites.includes(productId)) {
        setFavorites(favorites.filter((id) => id !== productId));
      } else {
        setFavorites([...favorites, productId]);
      }
    };
  
    return (
      <div onClick={toggleFavorite}>
        {isFavorite ? '❤️' : '🤍'}
      </div>
    );
  };
  
  export default Heart;
  