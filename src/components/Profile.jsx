import React, { useEffect, useState } from 'react'
import Protected from './Protected'
import Header from './Header'
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginForm from './LoginForm';
;


const Profile = () => {
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  
  return (
    <div>
      <Header> </Header>
      <div style={{marginTop:"10rem"}}>
      <LoginForm/>
      {loggedIn === true &&  <Protected></Protected>
      }
     
      </div>
  
      </div>
  )
}

export default Profile