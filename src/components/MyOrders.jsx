import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link do React Router
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";


const MyOrders = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [boletos, setBoletos] = useState([]);
  const [pix, setPix] = useState([]);
  const [creditCard, setCreditCard] = useState([]);
  const credentials = Cookies.get('role'); // Obtenha as credenciais do cookie

      const token = Cookies.get('token'); // Obtenha o token do cookie
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
        .get(`http://localhost:3001/api/allOrders/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Credentials: credentials,
          },
        })
        .then((response) => {
          setBoletos(response.data.boleto);
          setPix(response.data.pix);
          setCreditCard(response.data.creditCard);
          console.log("creditCard", response.data.creditCard);
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
          <div
            key={index}
            style={{
              position: "reative",
              display: "flex",
              margin: "0 auto",
              marginTop: "15rem",
              marginBottom: "15rem",
              border: "1px solid rgba(0, 0, 0, 0.10)",
              width: "60vw",
              height: "50vh",
            }}
          >
            <div style={{ padding: "7rem 3rem" }}>
              {order.products.slice(0, 1).map((product, prodIndex) => (
                <div
                  key={prodIndex}
                  style={{
                    marginBottom: "10rem",
                  }}
                >
                  <Link to={`/order/${order.custumerId}/${order._id}`}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "8vw" }}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "3rem",
                gap: "2rem",
              }}
            >
              {" "}
              <span>{order.billingType}</span>
              <span>{order.value}</span>{" "}
            </div>

            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "8rem",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "5rem",
              }}
            >
              <span>Status</span>
              <span>
                {" "}
                {(() => {
                  switch (order.status) {
                    case "RECEIVED":
                      return "pago";
                    case "CONFIRMED":
                      return "Cobrança confirmada";
                    case "PENDING":
                      return "Pendente";
                    case "OVERDUE":
                      return "Cobrança vencida";
                    default:
                      return;
                  }
                })()}
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "15rem",
              }}
            >
              <div>{order.trackingCode}</div>
            </div>
          </div>
        ))}

      {pix &&
        pix.map((order, index) => (
          <div
            key={index}
            style={{
              position: "reative",
              display: "flex",
              margin: "0 auto",
              marginTop: "15rem",
              marginBottom: "15rem",
              border: "1px solid rgba(0, 0, 0, 0.10)",
              width: "60vw",
              height: "50vh",
            }}
          >
            <div style={{ padding: "7rem 3rem" }}>
              {order.products.slice(0, 1).map((product, prodIndex) => (
                <div
                  key={prodIndex}
                  style={{
                    marginBottom: "10rem",
                  }}
                >
                  <Link to={`/order/${order.custumerId}/${order._id}`}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "8vw" }}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "3rem",
                gap: "2rem",
              }}
            >
              {" "}
              <span>{order.billingType}</span>
              <span>{order.value}</span>{" "}
            </div>

            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "8rem",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "5rem",
              }}
            >
              <span>Status</span>
              <span>
                {" "}
                {(() => {
                  switch (order.status) {
                    case "RECEIVED":
                      return "pago";
                    case "CONFIRMED":
                      return "Cobrança confirmada";
                    case "PENDING":
                      return "Pendente";
                    case "OVERDUE":
                      return "Cobrança vencida";
                    default:
                      return;
                  }
                })()}
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "15rem",
              }}
            >
              <div>{order.trackingCode}</div>
            </div>
          </div>
        ))}

      {creditCard &&
        creditCard.slice(0, 1).map((order, index) => (
          <div
            key={index}
            style={{
              position: "reative",
              display: "flex",
              margin: "0 auto",
              marginTop: "15rem",
              marginBottom: "15rem",
              border: "1px solid rgba(0, 0, 0, 0.10)",
              width: "60vw",
              height: "50vh",
            }}
          >
            <div style={{ padding: "7rem 3rem" }}>
              {order.products.slice(0, 1).map((product, prodIndex) => (
                <div
                  key={prodIndex}
                  style={{
                    marginBottom: "10rem",
                  }}
                >
                  <Link to={`/order/${order.custumerId}/${order._id}`}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "8vw" }}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "3rem",
                gap: "2rem",
              }}
            >
              {" "}
              <span>
                {order.billingType === "CREDIT_CARD" && "Cartão de Crédito"}
              </span>
              <span>{order.value}</span>{" "}
            </div>

            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "8rem",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "5rem",
              }}
            >
              <span>Status</span>
              <span>
                {" "}
                {(() => {
                  switch (order.status) {
                    case "RECEIVED":
                      return "pago";
                    case "CONFIRMED":
                      return "Cobrança confirmada";
                    case "PENDING":
                      return "Pendente";
                    case "OVERDUE":
                      return "Cobrança vencida";
                    default:
                      return;
                  }
                })()}
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                right: "22rem",
                marginTop: "15rem",
              }}
            >
              <div>
                <span>código de rastreio</span>
                <span>{order.trackingCode}</span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default MyOrders;
