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
import { useLocation } from "react-router-dom";
import { logPageView } from "../../analytics";
import { Helmet } from "react-helmet";

const Home = () => {
  const [pageTitle, setPageTitle] = useState("Loja Mediewal");

  const location = useLocation();

  // useEffect(() => {
  //   logPageView();
  // }, [location]);

  useEffect(() => {
    logPageView();

    // Condição para ajustar o título da página
    if (location.pathname === "/home") {
      setPageTitle("Home - Loja Mediewal");
    } else if (location.pathname === "/categorias") {
      setPageTitle("Categorias - Loja Mediewal");
    }  else {
      setPageTitle("Loja Mediewal");
    }
  }, [location]);
  return (
    <div>
     <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Veja as últimas novidades em nossa loja, com uma seleção de produtos novos."
        />
      </Helmet>

      <Slider />
      <Categories />

      <CategoryCarousel />

      <Header />

      <div
        style={{ display: "flex", marginTop: "3rem", flexDirection: "column" }}
      >
        <NewArrivals />{" "}
      </div>
      <Navbar></Navbar>
      <Footer />
    </div>
  );
};

export default Home;
