import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import CategoryCarousel from "./CategoryCarousel";
import DiscountImageCarousel from "./DiscountImageCarousel ";
import NewArrivals from "./NewArrivals";
import Slider from "../components/Slider";
import Footer from "./Footer";
import SkeletonCategories from "./SkeletonCategories";



const Home = () => {
 
  
  return (
    <div>
    

      <Slider />
      <Categories />
      <CategoryCarousel />
      <Header />
   
      <div
        style={{ display: "flex", marginTop: "3rem", flexDirection: "column" }}
      >
        <NewArrivals  />{" "}
      </div>
      <SkeletonCategories />
      <Navbar></Navbar>
     <Footer/>
   
 
      
    </div>
  );
};

export default Home;
