import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Corrigindo a importação do Axios
import styles from "./AlertComponente.module.css"
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
                    console.error(
                        "Erro ao obter os pedidos:",
                        error
                    );
                });
        }
    }, [loggedIn, userId]);

    return (
        //     border-top: 1px solid rgb(206, 212, 218);
        <div className={styles.ordersContainer}>
            {orders && orders.map((order, index) => (
                <div key={index} className={styles.ordersContent}>
                    <h2>Detalhes do Pedido {index + 1}</h2>
                    <p>tipo do pagamento: {order.payment.billingType && order.payment.billingType}</p>
                    <p>valor do pagamento: { order.payment.value && order.payment.value}</p>
                    <p>{order.payment.installmentNumber && 'numero de parcelas: '}  { order.payment.installmentNumber && order.payment.installmentNumber}</p>
                    <p>status de pagamento: {
                     
                    order.payment.status &&  order.payment.status}</p>

                    {/* Adicione mais detalhes do pagamento conforme necessário */}
                </div>
            ))}
        </div>
    );
}

export default AlertComponente;
