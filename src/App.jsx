import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { useLocation } from 'react-router-dom';
import { logPageView } from "../analytics";
import { Helmet } from "react-helmet";

function App() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);
  return (
    <>
  
  {location.pathname === "/" && (
             <Helmet>
             <title>Home - Loja Mediewal</title>
             <meta
               name="description"
               content="Veja as últimas novidades em nossa loja, com uma seleção de produtos novos."
             />
           </Helmet>
      )}
                <Home></Home>


    </>
  );
}

export default App;
