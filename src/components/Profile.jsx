import React, { useEffect, useState } from 'react'
import Protected from './Protected'
import Header from './Header'
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleLoginButton from './GoogleLoginButton';


const Profile = () => {
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    if(loggedIn){
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  })
  return (
    <div>
      <Header> </Header>
      <Protected/>
      <GoogleLoginButton/>
      {showButton && (
        <div className="button" onClick={logout}>
          <LogoutIcon />
          <span>Sair</span>
        </div>
      )}
      </div>
  )
}

export default Profile