import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";

const MyOrders = () => {
  const userId = Cookies.get("userId");
  const { loggedIn } = useAuth();
  const [boletos, setBoletos] = useState([]);
  const credentials = Cookies.get('role');
  const token = Cookies.get('token');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/allOrders/boleto/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Credentials: credentials,
          },
        })
        .then((response) => {
          setBoletos(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
          setLoading(false);
        });
    }
  }, [loggedIn, userId, token, credentials]);

  return (
    <>
      <Header />
      <Navbar />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20rem",
          }}
        >
          <CircularIndeterminate />
        </div>
      ) : (
        <>
          {boletos.length > 0 ? (
            boletos.map((order) => (
              <div
                key={order._id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15rem",
                  marginBottom: "15rem",
                  border: "1px solid rgba(0, 0, 0, 0.10)",
                  width: "60vw",
                  padding: "1rem",
                  position: "relative",
                }}
              >
                <div style={{ flex: 1 }}>
                  {order.products.map((product, prodIndex) => (
                    <div key={prodIndex} style={{ marginBottom: "1rem" }}>
                      <Link to={`/order/${order.customerId}/${order._id}`}>
                        <img
                          src={product.image}
                          alt={`Produto ${product.productId}`}
                          style={{ width: "8vw" }}
                        />
                      </Link>
                      <div>
                        <span>{product.name}</span>
                        <span> - </span>
                        <span>{product.size}</span>
                        <span> - </span>
                        <span>{product.color}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    padding: "1rem",
                  }}
                >
                  <div>
                    <span>Transportadora:</span>
                    <img
                      src={order.shippingFeeData.logo}
                      alt={order.shippingFeeData.transportadora}
                      style={{ width: "5rem", marginLeft: "1rem" }}
                    />
                  </div>
                  <div>
                    <span>Frete: R$ {order.shippingFeeData.shippingFeePrice}</span>
                  </div>
                  <div>
                    <span>Tipo de Pagamento:</span>
                    <span>{order.billingType}</span>
                  </div>
                  <div>
                    <span>Total: R$ {order.value.toFixed(2)}</span>
                  </div>
                  <div>
                    <span>Status:</span>
                    <span>
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
                            return "";
                        }
                      })()}
                    </span>
                  </div>
                  <div>
                    <span>Código de Rastreio:</span>
                    <span>{order.trackingCode}</span>
                  </div>
                  <div>
                    <a href={order.bankSlipUrl} target="_blank" rel="noopener noreferrer">
                      Ver boleto
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <p>Nenhum pedido encontrado.</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyOrders;
