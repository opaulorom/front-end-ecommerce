import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { useLocation } from 'react-router-dom';
import { logPageView } from './analytics'; // Importa o arquivo de configuração do Google Analytics

function App() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
    <>
                <Home></Home>


    </>
  );
}

export default App;
