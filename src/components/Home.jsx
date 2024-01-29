import React from "react";
import "./Home.css";
import Products from "./Products";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
const Home = () => {
 
  return (
    <div>
            <Categories/>

      <Header/>
      <Navbar></Navbar>
    </div>
  );
};

export default Home;
