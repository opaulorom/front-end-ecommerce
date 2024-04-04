import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import CategoryCarousel from "./CategoryCarousel";
import DiscountImageCarousel from "./DiscountImageCarousel ";
import DiscountImageLinkPerPercentage from "./DiscountImageLinkPerPercentage";
import NewArrivals from "./NewArrivals";

const Home = () => {

 
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

     
    </div>
  );
};

export default Home;
