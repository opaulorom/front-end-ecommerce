import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import CategoryCarousel from "./CategoryCarousel";
import DiscountImageCarousel from "./DiscountImageCarousel ";
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import DiscountImageLinkPerPercentage from "./DiscountImageLinkPerPercentage";
import NewArrivals from "./NewArrivals";
import LoginForm from "./LoginForm";

const Home = () => {
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
      <DiscountImageCarousel />
      <Categories />
      <CategoryCarousel />
      <Header />
      <h1 style={{ marginTop: "10rem" }}>Ofertas</h1>
      <div style={{ display: "flex", marginTop: "5rem" }}>
        <DiscountImageLinkPerPercentage />
      </div>

      <NewArrivals/>
      <Navbar></Navbar>

      {showButton && (
        <div className="button" onClick={logout}>
          <LogoutIcon />
          <span>Sair</span>
        </div>
      )}
    </div>
  );
};

export default Home;
