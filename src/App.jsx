import { useEffect, useState } from "react";
import "./App.css";
import ProductByCategories from "./ProductByCategories";
import Home from "./components/Home";
import DiscountImageLinkPerPercentage from "./components/DiscountImageLinkPerPercentage";
import BannerWithDiscount from "./components/BannerWithDiscount";


function App() {
 
  return (
    <>

      <Home></Home>
      <ProductByCategories/>
      <DiscountImageLinkPerPercentage/> 
      <BannerWithDiscount/>

    </>
  );
}

export default App;
