import React from "react";
import "../components/Home.css";
const Home = () => {
  return (
    <div className="clothes-card">
      <i className="imageContainer">
        {" "}
        <img
          src="https://i.ibb.co/sbsVxrN/pietra-schwarzler-l-SLq-x-Qd-FNI-unsplash.jpg"
          alt=""
          className="card-image"
        />
      </i>
      <div className="card-details">
        <h3 className="card-title">Vestido Floral</h3>
        <p className="card-price">Preço:R$56.99</p>
        <button className="btn-saiba-mais">Saiba Mais</button>
      </div>
    </div>
  );
};

export default Home;
