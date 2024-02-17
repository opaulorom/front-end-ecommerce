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
import DiscountProducts from "./components/DiscountProducts";
import DiscountedProductsPage from "./components/DiscountedProductsPage";


import NoMatch from "./components/NoMatch";
import Layout from "./components/Layout";
import Protected from "./components/Protected";
import { ClerkProvider } from "@clerk/clerk-react";
import DiscountProductsByCategoryAndPorcentage from "./components/DiscountProductsByCategoryAndPorcentage";
import { ptBR } from "@clerk/localizations";
;
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;




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

<Route path="/productsByDiscountPercentage/:discount" element={<DiscountProducts />} />
<Route path="/produtos/vestidos" element={<DiscountedProductsPage />} />
<Route path="/perfil" element={<Profile />} />
<Route path="/products/discount/:discount/category/:category" element={<DiscountProductsByCategoryAndPorcentage />} />



<Route path="*" element={<NoMatch />} />
          <Route path="/protected" element={<Protected />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
          </Route>
  </Routes>
);

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={publishableKey} localization={ptBR} >

  <React.StrictMode>

    <BrowserRouter>
      <ErrorBoundary>
        <Provider>
          <Root />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>

  </React.StrictMode>
  </ClerkProvider>


);
