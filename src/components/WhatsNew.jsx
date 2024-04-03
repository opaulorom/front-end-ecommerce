import React, { useEffect } from "react";
import DiscountImageLinkPerPercentage from "./DiscountImageLinkPerPercentage";
import BannerWithDiscount from "./BannerWithDiscount";
import DiscountImageLinkPerPercentageAndCategory from "./DiscountImageLinkPerPercentageAndCategory";
import Header from "./Header";
import Navbar from "./Navbar";

import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
const WhatsNew = () => {
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
      <Header />
      <Navbar />
      <h1 style={{ marginTop: "10rem" }}>Promoções</h1>
      <div style={{ display: "flex", marginTop: "5rem" }}>
        <DiscountImageLinkPerPercentage />
      </div>
      <BannerWithDiscount />
      <DiscountImageLinkPerPercentageAndCategory />

      {showButton && (
        <div className="button" onClick={logout}>
          <LogoutIcon />
          <span>Sair</span>
        </div>
      )}

    </div>
  );
};

export default WhatsNew;
