import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import axios from "axios"; // Corrigindo a importação do Axios
import styles from "./AlertComponente.module.css";
import { useUnreadCount } from "../context/UnreadContext";
const AlertComponente = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const { updateUnreadCount } = useUnreadCount(); // Obter função para atualizar o estado do contexto

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/orders/${userId}`)
        .then((response) => {
          setOrders(response.data);
          console.log(response.data);
          const newOrders = response.data.filter(
            (order) => order.payment.status !== "RECEIVED"
          );
          updateUnreadCount(newOrders.length); // Atualizar o estado do contexto
        })

        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
        });
    }
  }, [loggedIn, userId]);

  return (
    //     border-top: 1px solid rgb(206, 212, 218);
    <div className={styles.ordersContainer}>
      {orders &&
        orders.map((order, index) => (
          <div key={index} className={styles.ordersContent}>
            <p style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              {order.payment.billingType === "PIX" && (
                <img
                  src="https://i.ibb.co/dfvK4s0/icons8-foto-48.png"
                  alt=""
                  style={{
                    maxWidth: "14vw",
                  }}
                />
              )}
              {order.payment.billingType === "BOLETO" && (
                <img
                  src="https://i.ibb.co/LNrSsZt/icons8-boleto-bankario-48.png"
                  alt=""
                  style={{ maxWidth: "14vw" }}
                />
              )}

              {order.payment.billingType === "CREDIT_CARD" && (
                <img
                  src="https://i.ibb.co/HtWhHR0/icons8-emoji-de-cart-o-de-cr-dito-48.png"
                  alt=""
                />
              )}
              {order.payment.billingType && ""}
              {order.payment.billingType === "CREDIT_CARD"
                ? "Cartão de Crédito"
                : order.payment.billingType}
            </p>
            <p>
              {order.payment.value && "valor: R$"}{" "}
              {order.payment.value && order.payment.value}
            </p>
            <p>
              {order.payment.installmentNumber && "parcela: "}{" "}
              {order.payment.installmentNumber &&
                order.payment.installmentNumber}
            </p>

            <p
              className={`${styles.status} ${
                styles[order.payment.status.toLowerCase()]
              }`}
            >
              <span style={{ color: "black" }}> status: </span>
              {(() => {
                switch (order.payment.status) {
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
            </p>
          </div>
        ))}
    </div>
  );
};

export default AlertComponente;
