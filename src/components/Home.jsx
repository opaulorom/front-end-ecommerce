import React from "react";
import "./Home.css";
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



      
    </div>
  );
};

export default Home;
