import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import LoginForm from "./LoginForm";
import Protected from "./Protected";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import LogoutIcon from "@mui/icons-material/Logout";
const MobileProfile = () => {
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    if (loggedIn) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  });

  return (
    <div>
      <Header> </Header>
      <div style={{ marginTop: "10rem" }}>
        {loggedIn === true ? (
          <>
            <nav>
              <ul>
                <Link to={"/protected"}>
                  <li>Minha conta</li>
                </Link>
                <Link to={"/orders"}>
                  <li>Historico de Compras</li>
                </Link>
                <Link to={"/forgotPassword"}>
                  <li>Alterar senha</li>
                </Link>
              </ul>
            </nav>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "red",
                bottom: "10px",
                left: "10px",
                gap: ".2rem",
                cursor: "pointer",
                marginTop: "15rem",
              }}
              onClick={logout}
            >
              <LogoutIcon />
              <span
                style={{
                  fontSize: "1rem",
                  fontFamily: "poppins",
                  fontWeight: "400",
                }}
              >
                Sair
              </span>
            </div>
          </>
        ) : (
          <LoginForm />
        )}

        <Navbar />
      </div>
    </div>
  );
};

export default MobileProfile;
