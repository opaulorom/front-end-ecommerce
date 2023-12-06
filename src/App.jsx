import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/*" element={<Home key="search" />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="login" element={<Login/>}/>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
