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

const Home = () => {
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
    </div>
  );
};

export default Home;
