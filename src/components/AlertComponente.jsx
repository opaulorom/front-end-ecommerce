import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import axios from "axios"; // Corrigindo a importação do Axios
import styles from "./AlertComponente.module.css";
const AlertComponente = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/orders/${userId}`)
        .then((response) => {
          setOrders(response.data);
          console.log(response.data);
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
      <p>
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
                  case "OVERDUE":
                    return "Cobrança vencida";
                  case "PENDING":
                    return "Pendente";
                  case "RECEIVED":
                    return "pago";
                  case "CONFIRMED":
                    return "Cobrança confirmada";
                  default:
                    return ;
                }
              })()}
            </p>
          </div>
        ))}
    </div>
  );
};

export default AlertComponente;
