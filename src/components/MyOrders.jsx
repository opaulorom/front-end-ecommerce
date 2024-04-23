import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link do React Router
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

import ImageComponent from "./ImageComponent";

const MyOrders = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [boletos, setBoletos] = useState([]);
  const [pix, setPix] = useState([]);
  const [creditCard, setCreditCard] = useState([]);

  const [expanded, setExpanded] = useState({});

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: newExpanded ? panel : false,
    }));
  };

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/allOrders/${userId}`)
        .then((response) => {
          setBoletos(response.data.boleto);
          setPix(response.data.pix);
          setCreditCard(response.data.creditCard);
        })
        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
        });
    }
  }, [loggedIn, userId]);

  const handleClick = (payload) => {
    navigator.clipboard.writeText(payload);
  };
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabStyle = {
    color: "#ccc", // Cor de fundo das tabs ativas
    // Outros estilos conforme necessário
  };

  return (
    <>
      <Header />
      <Navbar />

      {boletos &&
        boletos.map((order, index) => (
          <div key={index} style={{ marginTop: "15rem" }}>
            
            <span>{order.billingType}</span>
            <div>{order.status}</div>

            <div></div>
            <div>
              {order.products.slice(0, 1).map((product, prodIndex) => (
                <div key={prodIndex}>
                  <Link to={`/order/${order.custumerId}/${order._id}`}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "10vw" }}
                    />
                  </Link>
                  <div>{order.status}</div>
                  <div>{order.trackingCode}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      {pix &&
        pix.map((order, index) => (
          <div key={index} style={{ marginTop: "15rem" }}>
            {order.billingType}
            <div>{order.status}</div>

            <div>
              {order.products.slice(0, 1).map((product, prodIndex) => (
                <div key={prodIndex}>
                  <Link to={`/order/${order.custumerId}/${order._id}`}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "10vw" }}
                    />
                  </Link>
                 
                </div>
              ))}
            </div>
          </div>
        ))}

      {creditCard &&
        creditCard.slice(0, 1).map((order, index) => (
          <div key={index} style={{ marginTop: "15rem" }}>
                        {order.billingType}
                        {order._id}

                        <div>{order.status}</div>
                  <div>{order.trackingCode}</div>
            <div>
              {order.products.slice(0, 1).map((product, prodIndex) => (
                <div key={prodIndex} style={{
                  marginBottom:"10rem"
                }}>
                  <Link to={`/order/${order.custumerId}/${order._id}`}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "10vw" }}
                    />
                    
                  </Link>
               
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default MyOrders;
