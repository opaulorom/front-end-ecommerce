import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Products from "./components/Products";
import Pay from "./components/Pay";
import { createRoot } from 'react-dom/client';

const Root = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products/:productId" element={<Products />} />
    <Route path="/pay/:payId" element={<Pay />} />
    <Route path="/app" element={<App />} />
  </Routes>
);
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
