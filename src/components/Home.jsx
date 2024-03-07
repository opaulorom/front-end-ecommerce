import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import CategoryCarousel from "./CategoryCarousel";
import DiscountImageCarousel from "./DiscountImageCarousel ";
import ProductByCategories from "../ProductByCategories";
import DiscountImageLinkPerPercentage from "./DiscountImageLinkPerPercentage";
import BannerWithDiscount from "./BannerWithDiscount";
import DiscountImageLinkPerPercentageAndCategory from "./DiscountImageLinkPerPercentageAndCategory";
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleLoginButton from "./GoogleLoginButton";

const Home = () => {
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
      <DiscountImageCarousel />
      <Categories />
      <CategoryCarousel />
      <Header />
      <ProductByCategories />
      <DiscountImageLinkPerPercentage />
      <BannerWithDiscount />
      <DiscountImageLinkPerPercentageAndCategory />
      <Navbar></Navbar>

      {showButton && (
        <div className="button" onClick={logout}>
          <LogoutIcon />
          <span>Sair</span>
        </div>
      )}
      <GoogleLoginButton />

    </div>
  );
};

export default Home;
