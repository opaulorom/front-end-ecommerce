import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link do React Router
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";
import { logPageView } from "../../analytics";
import { Helmet } from "react-helmet";

const OrderDetails = () => {
  const { id } = useParams(); // Certifique-se de que o parâmetro corresponde ao nome na URL
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [boleto, setBoleto] = useState(""); // Usando useState para um único boleto
  const { apiUrl } = useConfig();
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);
  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`${apiUrl}/api/boleto/${id}/${userId}`)
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
      <Helmet>
        <title>Histórico de Compras - Loja Mediewal</title>
        <meta
          name="description"
          content="Veja as últimas novidades em nossa loja, com uma seleção de produtos novos."
        />
      </Helmet>
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
        <p><CircularIndeterminate/></p>
      )}
    </>
  );
  
};

export default OrderDetails;
