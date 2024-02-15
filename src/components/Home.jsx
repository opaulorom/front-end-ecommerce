import React from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import CategoryCarousel from "./CategoryCarousel";
import Carousel from "./CarouselItem";

const Home = () => {
  const images = ['https://i.ibb.co/ThX6mJz/azul3.webp', 'https://i.ibb.co/s95xBNt/camisa-preta-masculina.webp', 'https://i.ibb.co/2vTzpMz/morrom.webp']; // Substitua pelos URLs reais das suas imagens

  return (
    <div>
      <Categories />
      <CategoryCarousel />
      <Header />
      <Carousel images={images} />

      <Navbar></Navbar>
    </div>
  );
};

export default Home;
