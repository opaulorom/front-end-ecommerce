import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

const MyOrders = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/pedidos/${userId}`)
        .then((response) => {
          setOrders(response.data.boleto);
          console.log(response.data.boleto);
        })
        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
        });
    }
  }, [loggedIn, userId]);
  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
      {orders.map((order, index) => (
        <div key={index} style={{marginTop:"15rem"}}>
        <span>{order.products.productId}</span>
        </div>
      ))}
    </>
  );
};

export default MyOrders;
