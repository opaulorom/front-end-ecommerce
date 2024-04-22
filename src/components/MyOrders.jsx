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
    backgroundColor: "#ccc", // Cor de fundo das tabs ativas
    // Outros estilos conforme necessário
  };

  return (
    <>
      <Header />
      <Navbar />

      {boletos && boletos.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
          <span>{order.billingType}</span>
          <div>
            <div className="tab-buttons">
              <button
                style={activeTab === 0 ? tabStyle : {}}
                onClick={() => handleTabClick(0)}
              >
                Pagar Boleto
              </button>
              <button
                style={activeTab === 1 ? tabStyle : {}}
                onClick={() => handleTabClick(1)}
              >
                Tab 2
              </button>
              <button
                style={activeTab === 2 ? tabStyle : {}}
                onClick={() => handleTabClick(2)}
              >
                Tab 3
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 0 && (
                <div>
                  {" "}
                  <div>
                    {order._id}
                    <Link to={order.bankSlipUrl}>{order.bankSlipUrl}</Link>
                  </div>
                </div>
              )}
              {activeTab === 1 && <div>Conteúdo da aba 2</div>}
              {activeTab === 2 && <div>Conteúdo da aba 3</div>}
            </div>
          </div>
          <div>
            {order.products.map((product, prodIndex) => (
              <div key={prodIndex}>
                <img
                  src={product.image}
                  alt={`Produto ${product.productId}`}
                  style={{ width: "10vw" }}
                />
                <div>{order.status}</div>
                <div>{order.trackingCode}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {pix && pix.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
          <div>
            <div className="tab-buttons">
              <button
                style={activeTab === 0 ? tabStyle : {}}
                onClick={() => handleTabClick(0)}
              >
                Pagar Pix
              </button>
              <button
                style={activeTab === 1 ? tabStyle : {}}
                onClick={() => handleTabClick(1)}
              >
                Tab 2
              </button>
              <button
                style={activeTab === 2 ? tabStyle : {}}
                onClick={() => handleTabClick(2)}
              >
                Tab 3
              </button>
            </div>
            <div className="tab-content">
              {order._id}

              {activeTab === 0 && (
                <div>
                  {" "}
                  <div>
                    {order.encodedImage && (
                      <ImageComponent encodedImage={order.encodedImage} />
                    )}
                    {order.encodedImage && (
                      <>
                        <p style={{ width: "10vw" }}>{order.payload}</p>
                        <div>
                          <button onClick={() => handleClick(order.payload)}>
                            Copiar
                          </button>
                        </div>
                      </>
                    )}
                  </div>{" "}
                </div>
              )}
              {activeTab === 1 && <div>Conteúdo da aba 2</div>}
              {activeTab === 2 && <div>Conteúdo da aba 3</div>}
            </div>
          </div>
          <div>
            {order.products.map((product, prodIndex) => (
              <div key={prodIndex}>
                <img
                  src={product.image}
                  alt={`Produto ${product.productId}`}
                  style={{ width: "10vw" }}
                />
                <div>{order.status}</div>
                <div>{order.trackingCode}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {creditCard && creditCard.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
          <div>
            {order.products.map((product, prodIndex) => (
              <div key={prodIndex}>
                <img
                  src={product.image}
                  alt={`Produto ${product.productId}`}
                  style={{ width: "10vw" }}
                />
                <div>{order.status}</div>
                <div>{order.trackingCode}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default MyOrders;
