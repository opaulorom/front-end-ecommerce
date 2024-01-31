import { useEffect, useState } from "react";
import "./App.css";
import ProductByCategories from "./ProductByCategories";
import Home from "./components/Home";
import ImageGallery from "./components/ImageGallery";

function App() {
 
  return (
    <>

      <Home></Home>
      <ProductByCategories/>
      <ImageGallery categoryId="65b8ec0013a4e617e3753897" />


    </>
  );
}

export default App;
