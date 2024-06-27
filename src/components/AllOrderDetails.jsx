import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Importe o Link do React Router
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

import ImageComponent from "./ImageComponent";
import CircularIndeterminate from "./CircularIndeterminate";
import styles from "./AllOrderDetails.module.css"
const AllOrderDetails = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [boletos, setBoletos] = useState([]);
  const [pix, setPix] = useState([]);
  const [creditCard, setCreditCard] = useState([]);
  const { id } = useParams(); // Certifique-se de que o parâmetro corresponde ao nome na URL

  const [expanded, setExpanded] = useState({});

  const token = Cookies.get('token'); // Obtenha o token do cookie
  const [loading, setLoading] = useState(true);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: newExpanded ? panel : false,
    }));
  };

  useEffect(() => {
    setLoading(true); // Define o estado de carregamento como true antes de fazer a chamada à API

    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/allOrders/${userId}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,

            },
          })
        .then((response) => {
          setBoletos(response.data.boleto);
          setPix(response.data.pix);
          setCreditCard(response.data.creditCard);
          setLoading(false); // Define o estado de carregamento como true antes de fazer a chamada à API
          console.log(response.data.boleto)
        })
        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
        });
    }
  }, [loggedIn, userId]);

  const handleClick = (payload) => {
    navigator.clipboard.writeText(payload);
  };



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
          <CircularIndeterminate />;
        </div>
      ) : (<>

        {boletos &&
          boletos.map((order, index) => (
            <div
              key={index}
              className={styles.boletoContainer}
            >

              {order.status === "PENDING" ? (

                <div className={styles.boletoContainer__buttonContainer}>
                   <Link to={order.bankSlipUrl} style={{ textDecoration: "none" }}>
                    {" "}
                    <button className={styles.boletoContainer__button}>Ver boleto</button>{" "}
                  </Link>
                  <div className={styles.boletoContainer__span}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.49998 0.5C5.49998 0.223858 5.72383 0 5.99998 0H7.49998H8.99998C9.27612 0 9.49998 0.223858 9.49998 0.5C9.49998 0.776142 9.27612 1 8.99998 1H7.99998V2.11922C9.09832 2.20409 10.119 2.56622 10.992 3.13572C11.0116 3.10851 11.0336 3.08252 11.058 3.05806L11.858 2.25806C12.1021 2.01398 12.4978 2.01398 12.7419 2.25806C12.986 2.50214 12.986 2.89786 12.7419 3.14194L11.967 3.91682C13.1595 5.07925 13.9 6.70314 13.9 8.49998C13.9 12.0346 11.0346 14.9 7.49998 14.9C3.96535 14.9 1.09998 12.0346 1.09998 8.49998C1.09998 5.13362 3.69904 2.3743 6.99998 2.11922V1H5.99998C5.72383 1 5.49998 0.776142 5.49998 0.5ZM2.09998 8.49998C2.09998 5.51764 4.51764 3.09998 7.49998 3.09998C10.4823 3.09998 12.9 5.51764 12.9 8.49998C12.9 11.4823 10.4823 13.9 7.49998 13.9C4.51764 13.9 2.09998 11.4823 2.09998 8.49998ZM7.99998 4.5C7.99998 4.22386 7.77612 4 7.49998 4C7.22383 4 6.99998 4.22386 6.99998 4.5V9.5C6.99998 9.77614 7.22383 10 7.49998 10C7.77612 10 7.99998 9.77614 7.99998 9.5V4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    <span >
                      Este Boleto expira em
                      24 horas</span>
                  </div>
                 


                </div>


              ) : (
                ""
              )}


              <div >
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>
                  

                    <div>{order.trackingCode}</div>
                  </div>
                ))}

              </div>
              <div >
                {order.products.map((product, prodIndex) => (
                  <>
                    <div key={prodIndex} className={styles.boletoContainer__texts}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      className={styles.boletoContainer__img}
                    />
                      <span>{product.name}</span>
                      <span>tamanho {product.size}</span>
                      <span>quantidade {product.quantity}</span>

                    </div>
                  </>
                ))}
              </div>
              <div className={styles.boletoContainer__price}>
                {order.products.map((product, prodIndex) => (
                  <>
                    <div key={prodIndex}>
                      <span>{product.price}</span>


                    </div>
                  </>
                ))}
              </div>
              <div className={styles.status}>
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
              <span>{order.billingType}</span>




            </div>
          ))}
        {pix &&
          pix.map((order, index) => (
            <div>
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
              <div>{order.trackingCode}</div>
              {order.status === "PENDING" ? (
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
                </div>
              ) : (
                ""
              )}

              <div>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "10vw" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

        {creditCard &&
          creditCard.map((order, index) => (
            <div key={index} style={{ marginTop: "15rem" }}>
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
              <div>{order.trackingCode}</div>
              <div>
                {order.products.map((product, prodIndex) => (
                  <div key={prodIndex}>
                    <img
                      src={product.image}
                      alt={`Produto ${product.productId}`}
                      style={{ width: "10vw" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}



      </>)}

    </>
  );
};

export default AllOrderDetails;
