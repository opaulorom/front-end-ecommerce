import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import store from "./store/store"
import Profile from "./components/user/Profile";

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/*" element={<Home key="search" />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>


        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
