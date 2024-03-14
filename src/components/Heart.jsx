import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext"
import Cookies from "js-cookie";

const Heart = () => {
  const [favorites, setFavorites] = useState([]);

  const userId = Cookies.get('userId'); // Obtenha o token do cookie
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação

  useEffect(() => {
    if (loggedIn) {

      axios
        .get(`http://localhost:3001/api/favorites/${userId}`)
        .then((response) => {
          setFavorites(response.data.favorites);
        })
        .catch((error) => {
          console.error("Erro ao visualizar produtos favoritos:", error);
        });
    }
  }, [loggedIn, userId]);

  return (
    <div>
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