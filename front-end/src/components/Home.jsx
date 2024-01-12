import React from "react";
import "./Home.css";
import Products from "./Products";
import Navbar from "./Navbar";
import Header from "./Header";
const Home = () => {
 
  return (
    <div>

      <Header/>
      <Products ></Products>
      <Navbar></Navbar>
    </div>
  );
};

export default Home;
