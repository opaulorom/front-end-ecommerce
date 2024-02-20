import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Heart = () => {
  const clerkUserId = "user_2cVPVOEfoBibCy2khNTKk3m4fU1";
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/favorites/${clerkUserId}`)
      .then((response) => {
        setFavorites(response.data.favorites);
      })
      .catch((error) => {
        console.error("Erro ao visualizar produtos favoritos:", error);
      });
  }, []);

  return (
    <div>
      <h1>Heart</h1>
      <ul>
        {favorites.map((favorite) => (
          <div key={favorite._id}>
            <Link to={`/products/${favorite._id}`}>
              <img src={favorite.variations[0].urls[0]} alt="" />
              <li>{favorite.name}</li>
              </Link>
          </div>
        ))}
      </ul>
     
    </div>
  );
};

export default Heart;
