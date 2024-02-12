// Root.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Products from "./components/Products";
import Pay from "./components/Pay";
import { createRoot } from "react-dom/client";
import Categories from "./components/Categories";
import CategoriesMobile from "./components/CategoriesMobile";

import Profile from "./components/Profile";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails"; // Importe o componente
import ErrorBoundary from "./ErrorBoundary";
import { Provider } from "jotai";
import Subcategory from "./components/Subcategory";
import CategorySubcategories from "./components/CategorySubcategories";
import SearchResults from "./components/SearchResults";
import SearchBar from "./components/SearchBar";
import CategoryProducts from "./components/CategoryProducts";


const Root = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/home" element={<Home />} />
    <Route path="/categorias" element={<Categories />} />
    <Route path="/categoriasMobile" element={<CategoriesMobile />} />
    


    
    <Route path="/carrinho" element={<Cart />} />
    <Route path="/perfil" element={<Profile />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:productId" element={<ProductDetails />} />{" "}
    <Route path="/pay/:payId" element={<Pay />} />
    <Route path="/" element={<Categories />} />
    <Route path="/categories/:category" element={<CategorySubcategories />} />
    <Route
      path="/categories/:category/:subcategory"
      element={<Subcategory />}
    />
    <Route path="/search/product/:query" element={<SearchResults />} />
    <Route path="/" element={<SearchBar />} />

    // Adicione a rota
<Route
  path="/categories/:category/subcategories"
  element={<CategorySubcategories />}
/>
<Route path="/categories/:category/:subcategory/products" element={<CategoryProducts />} />


  </Routes>
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider>
          <Root />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
