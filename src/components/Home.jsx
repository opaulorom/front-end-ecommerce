import React from "react";
import "./Home.css";
import Products from "./Products";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import CategoryCarousel from "./CategoryCarousel";
const Home = () => {
 
  return (
    <div>
            <Categories/>
            <CategoryCarousel/>
      <Header/>
      <Navbar></Navbar>
    </div>
  );
};

export default Home;
