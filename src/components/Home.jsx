import React from "react";
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
import { useAuth } from "@clerk/clerk-react";


const Home = () => {
  const { logout } = useAuth(); // Obtendo o userId do contexto de autenticação


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
      <button className='button' onClick={logout}>
    
          <span>Sair</span>
        </button>

    </div>
  );
};

export default Home;
