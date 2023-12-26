// Root.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Products from "./components/Products";
import Pay from "./components/Pay";
import { createRoot } from "react-dom/client";
import Categories from "./components/Categories";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails"; // Importe o componente

const Root = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/home" element={<Home />} />
    <Route path="/categorias" element={<Categories />} />
    <Route path="/carrinho" element={<Cart />} />
    <Route path="/perfil" element={<Profile />} />

    <Route path="/products" element={<Products />} />
    <Route path="/products/:productId" element={<ProductDetails />} /> {/* Nova rota para detalhes do produto */}

    <Route path="/pay/:payId" element={<Pay />} />
  </Routes>
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
