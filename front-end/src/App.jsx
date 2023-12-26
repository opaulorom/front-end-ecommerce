import { useEffect, useState } from "react";
import "./App.css";
import ProductByCategories from "./ProductByCategories";
import Home from "./components/Home";

function App() {
 
  return (
    <>
      <Home></Home>
      <ProductByCategories/>
    </>
  );
}

export default App;
