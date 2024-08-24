import { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { useLocation } from 'react-router-dom';
import { logPageView } from "../analytics";

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
