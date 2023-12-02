import Header from "./components/Layout/Header";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header></Header>
      <Router>
        <Routes>
      
        <Route path="/" element={<Home />} />
     

        </Routes>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
