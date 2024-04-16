import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link do React Router
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams(); // Certifique-se de que o parâmetro corresponde ao nome na URL
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [boleto, setBoleto] = useState(""); // Usando useState para um único boleto

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/boleto/${id}/${userId}`)
        .then((response) => {
          console.log("Resposta da API:", response); // Verificar a resposta completa da API
          console.log("Dados recebidos:", response.data); // Verificar os dados recebidos no console
          setBoleto(response.data.boleto);
        })
        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
        });
    }
    console.log("id", id);
    console.log("userId", userId);
  }, [loggedIn, userId]);
  

  return (
    <>
      <Header />
      <Navbar />
      {boleto ? (
        <div style={{ marginTop: "15rem" }}>
          <span>{boleto.billingType}</span>
          <span href>{boleto.bankSlipUrl}</span><br/>
          value: {boleto.value}
          <div>
            {boleto.products.map((product, prodIndex) => (
              <div key={prodIndex}>
                color: {product.color}<br/>
                tamanho: {product.size}
                <img src={product.image} alt="" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
  
};

export default OrderDetails;
