import React, { useEffect, useState } from 'react'
import Protected from './Protected'
import Header from './Header'
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginForm from './LoginForm';
import { Helmet } from 'react-helmet';
;


const Profile = () => {
  const { logout, loggedIn } = useAuth(); // UseAuth hook deve ser chamado antes de qualquer retorno condicional

  if (!loggedIn) {
    return <LoginForm />;
  }

  return (
    <div>
        <Helmet>
        <title>Perfil - Loja Mediewal</title>
        <meta
          name="description"
          content="Veja as últimas novidades em nossa loja, com uma seleção de produtos novos."
        />
      </Helmet>
      <Header />
      <div style={{ marginTop: "10rem" }}>
        <Protected isLoggedIn={loggedIn} />
        
      </div>
    </div>
  );
}

export default Profile