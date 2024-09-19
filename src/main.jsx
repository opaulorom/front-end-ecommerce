// Root.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";

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
import DiscountProductsByCategoryAndPorcentage from "./components/DiscountProductsByCategoryAndPorcentage";
import Heart from "./components/Heart";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import PasswordResetRequest from "./components/PasswordResetRequest";
import ResetPasswordPage from "./components/ResetPasswordPage";
import RegisterLink from "./components/RegisterLink";

import NewArrivals from "./components/NewArrivals";
// import WhatsNew from "./components/WhatsNew";
import SignUpForm from "./components/SignUpForm";
import MyOrders from "./components/MyOrders";
import OrderDetails from "./components/OrderDetails";
import { UnreadProvider } from "./context/UnreadContext";
import AllOrderDetails from "./components/AllOrderDetails";
import SuccessPage from "./components/SuccessPage";
import MobileProfile from "./components/MobileProfile";
import { ConfigProvider } from './context/ConfigContext';

const Root = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/home" element={<Home />} />
    <Route path="/categorias" element={<Categories />} />
    <Route path="/categoriasMobile" element={<CategoriesMobile />} />
    <Route path="/favoritos" element={<Heart />} />
    <Route path="/carrinho" element={<Cart />} />
    <Route path="/perfil" element={<Profile />} />
    <Route path="/conta" element={<MobileProfile />} />


    <Route path="/products/:productId" element={<ProductDetails  />} />{" "}
    <Route path="/payment/:quantity/:shippingFee/:totalPrice" element={<Pay />} />
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
    <Route
      path="/categories/:category/:subcategory/products"
      element={<CategoryProducts />}
    />
    <Route
      path="/productsByDiscountPercentage/:discount"
      element={<DiscountProducts />}
    />
    <Route path="/produtos/vestidos" element={<DiscountedProductsPage />} />

    <Route
      path="/products/discount/:discount/category/:category"
      element={<DiscountProductsByCategoryAndPorcentage />}
    />
    <Route path="*" element={<NoMatch />} />
    <Route path="/protected" element={<Protected />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<App />} />
    </Route>
    <Route path="/cart" element={<Cart />} />
    <Route path="/login" element={<LoginForm/>} />
    <Route path="/register" element={<RegisterLink/>} />
    <Route path="/success" element={<SuccessPage/>} />
    
    <Route path="/register/:token" element={<Register/>} />
    <Route path="/forgotPassword" element={<PasswordResetRequest/>} />
    <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />

    {/* <Route path="/whatsNew" element={<WhatsNew/>} /> */}
    <Route path="/newArrivals" element={<NewArrivals/>} />
    <Route path="/signUp" element={<SignUpForm/>} />

    <Route path="/orders" element={<MyOrders/>} />
    <Route path="/boleto/:id/:customerId" element={<OrderDetails  />} />{" "}

    <Route path="/order/:custumerId/:id" element={<AllOrderDetails  />} />{" "}
  </Routes>
);

createRoot(document.getElementById("root")).render(
  <ConfigProvider>

  <AuthProvider>
       

    <UnreadProvider>
    <CartProvider>
      
      {" "}
      {/* Envolve toda a aplicação com o CartProvider */}
      <FavoritesProvider>
        <React.StrictMode>
          <BrowserRouter>
            <ErrorBoundary>
              <Provider>
                <Root />
              </Provider>
            </ErrorBoundary>
          </BrowserRouter>
        </React.StrictMode>
      </FavoritesProvider>
    </CartProvider>
    </UnreadProvider>

  </AuthProvider>
          
  </ConfigProvider>
);