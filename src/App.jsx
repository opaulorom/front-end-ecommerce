import { useEffect, useState } from "react";
import "./App.css";
import ProductByCategories from "./ProductByCategories";
import Home from "./components/Home";
import DiscountImageLink from "./components/DiscountImageLink";


function App() {
 
  return (
    <>

      <Home></Home>
      <ProductByCategories/>
      <DiscountImageLink/> 


    </>
  );
}

export default App;
