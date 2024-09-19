import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import LoginForm from "./LoginForm";
import styles from "./MobileProfile.module.css";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { logPageView } from "../../analytics";
import { Helmet } from "react-helmet";
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
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);
  return (
    <div>
      <Header> </Header>
      <Helmet>
        <title>Perfil - Loja Mediewal</title>
        <meta
          name="description"
          content="Veja as últimas novidades em nossa loja, com uma seleção de produtos novos."
        />
      </Helmet>
      <div style={{ marginTop: "10rem" }}>
        {loggedIn === true ? (
          <>
            <nav className={styles.nav}>
              <ul className={styles.ul}>
                <Link to={"/protected"} className={styles.Link}>
                  <li>Minha conta</li>
                </Link>
                <Link to={"/orders"}  className={styles.Link}>
                  <li>Historico de Compras</li>
                </Link>
                <Link to={"/forgotPassword"} className={styles.Link}>
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
