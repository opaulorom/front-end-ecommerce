import { useEffect, useState } from "react";
import "./App.css";
import ProductByCategories from "./ProductByCategories";
import Home from "./components/Home";
import NavbarMobile from "./components/NavbarMobile";

function App() {
 
  return (
    <>
            <NavbarMobile></NavbarMobile>

      <Home></Home>
      <ProductByCategories/>
    </>
  );
}

export default App;
