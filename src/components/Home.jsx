import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import CategoryCarousel from "./CategoryCarousel";
import DiscountImageCarousel from "./DiscountImageCarousel ";
import NewArrivals from "./NewArrivals";
import Slider from "../components/Slider";

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
        <h1 style={{ marginTop: "1rem" }}>Novidades</h1>
        <NewArrivals />{" "}
      </div>

      <Navbar></Navbar>

      
    </div>
  );
};

export default Home;
