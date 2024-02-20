import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Heart = () => {
  const [favorites, setFavorites] = useState([]);
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const clerkUserId = user.id;
      axios
        .get(`http://localhost:3001/api/favorites/${clerkUserId}`)
        .then((response) => {
          setFavorites(response.data.favorites);
        })
        .catch((error) => {
          console.error("Erro ao visualizar produtos favoritos:", error);
        });
    }
  }, [isLoaded, isSignedIn, user]);

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
