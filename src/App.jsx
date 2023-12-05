import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';  // Importe do pacote 'devtools'

// Crie um novo QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/*" element={<Home key="search" />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Router>
        <Footer />
      </>
    </QueryClientProvider>
  );
}

export default App;
