import React, { useEffect, useState } from 'react'
import Protected from './Protected'
import Header from './Header'
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginForm from './LoginForm';
;


const Profile = () => {
  const { logout, loggedIn } = useAuth(); // UseAuth hook deve ser chamado antes de qualquer retorno condicional

  if (!loggedIn) {
    return <LoginForm />;
  }

  return (
    <div>
      <Header />
      <div style={{ marginTop: "10rem" }}>
        <Protected isLoggedIn={loggedIn} />
        
      </div>
    </div>
  );
}

export default Profile