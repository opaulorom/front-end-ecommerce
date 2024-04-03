import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext"
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import Header from "./Header";

const Heart = () => {
  const [favorites, setFavorites] = useState([]);

  const userId = Cookies.get('userId'); // Obtenha o token do cookie
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  const credentials = Cookies.get('role'); // Obtenha as credenciais do cookie
  const token = Cookies.get('token'); // Obtenha o token do cookie
  useEffect(() => {
    if (loggedIn) {

      axios
        .get(`http://localhost:3001/api/favorites/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Credentials: credentials,
          },
        })
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
      <Header/>
      <Navbar/>
      
      {favorites.length === 0 && !loggedIn && (
        <div  style={{display:"flex",alignItems:"center", justifyContent:"center", marginTop:"15rem",  }}>
                <div style={{ marginTop:"5rem", fontFamily:"poppins", fontSize:"1rem", fontWeight:"400" }}> Somente os usuários registrados podem acessar esta página faça <Link to={"/perfil"} style={{ color: "inherit", textDecoration: "none", }}> <b style={{fontFamily:"poppins", fontWeight:"600", fontSize:"1.2rem" }}>  Login</b>.</Link> </div>


        </div>
   
      )}
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