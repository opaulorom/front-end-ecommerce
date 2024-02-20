import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const TesteGet = () => {
    const clerkUserId = "user_2cVPVOEfoBibCy2khNTKk3m4fU1";
    const [favorites, setFavorites] = useState([]);
    const [productId, setProductId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
  
    useEffect(() => {
      axios
        .get(`http://localhost:3001/api/products`)
        .then((response) => {
          setFavorites(response.data.products);
  
        })
        .catch((error) => {
          console.error("Erro ao visualizar produtos favoritos:", error);
        });
    }, [productId]);
  
    const handleToggleFavorite = async (productId) => {
      const response = await toggleFavorite(clerkUserId, productId);
      if (response) {
        setFavorites(response.user.favorites);
        setIsFavorite(response.user.favorites.some(favorite => favorite._id === productId));
      }
    };
  return (
    <div>  
        <h1>products</h1>
    <ul>
      {favorites.map((favorite) => (
        <div key={favorite._id} >
          <Link to={`/products/${favorite._id}`}>
            <img src={favorite.variations[0].urls[0]} alt="" />
            <li>{favorite.name}</li>
          </Link>
        </div>
      ))}
    </ul>
    </div>
  )
}

export default TesteGet