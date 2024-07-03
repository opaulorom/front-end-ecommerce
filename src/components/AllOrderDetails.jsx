import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Importe o Link do React Router
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
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

  const [payload, setPayload] = useState(false);

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
    setPayload(payload)
  };



  const maxLength = 35; // Defina o limite de caracteres desejado

  const truncateName = (name) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...';
    }
    return name;
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
              <div className={styles.TotalAmountContainer}>




                <div className={styles.justifyContent}>
                  <span className={styles.span}>Tipo</span>

                  <span className={styles.span}>Total do pedido

                  </span>
                  {order.shippingFee ?   <span className={styles.span}>Valor da entrega</span> : ""}
                    
            
                  <span className={styles.span}>Quantidade total</span>
                  {order.trackingCode ? <a href="https://www.kangu.com.br/rastreio/" target="_blank" className={styles.span} style={{}} >
                    Rastrear Pedido
                  </a> : ""}

                  <span className={styles.span}>Status</span>
                </div>
                <div className={styles.justifyContent}>
                  <span className={styles.span}>{order.billingType}</span>

                  <span className={styles.value}>R$ {order.value}</span>
                  {order.shippingFee ?   <span className={styles.span}>{order.shippingFee}</span> : ""}
                


                  <span className={styles.span}>{order.totalQuantity} unidades</span>


                  {order.trackingCode ? <span className={styles.span}>{order.trackingCode}</span> : ""
                  }



                  <span className={`${styles.status} ${styles[order.status.toLowerCase()]
                    }`}>
                    {" "}
                    {(() => {
                      switch (order.status) {
                        case "RECEIVED":
                          return "PAGO";
                        case "CONFIRMED":
                          return "COBRANÇA CONFIMADA";
                        case "PENDING":
                          return "PENDENTE";
                        case "OVERDUE":
                          return "COBRANÇA VENCIDA";
                        default:
                          return;
                      }
                    })()}
                  </span>

                </div>



              </div>
              {order.status === "PENDING" ? (

                <div className={styles.boletoContainer__buttonContainer}>
                  <Link to={order.bankSlipUrl} style={{ textDecoration: "none" }}>
                    {" "}
                    <button className={styles.boletoContainer__button}>Ver boleto</button>{" "}
                  </Link>
                  <div className={styles.boletoContainer__span}>
                    <WatchLaterOutlinedIcon />
                    <span >
                      Este Boleto expira em
                      24 horas</span>
                  </div>



                </div>


              ) : (
                ""
              )}


              <div>
                {order.products.map((product, prodIndex) => (
                  <>
                    <div key={prodIndex} className={styles.boletoContainer__card}>
                      <img
                        src={product.image}
                        alt={`Produto ${product.productId}`}
                        className={styles.boletoContainer__img}
                      />
                      <div className={styles.boletoContainer__text}>

                        <span>{truncateName(product.name)}</span>

                        <span className={styles.size}>Tamanho: {product.size}</span>



                        <span className={styles.quantity}>Quantidade: {product.quantity}</span>


                      </div >
                      <div>                      <span className={styles.price}>R${product.price && product.price}</span>
                      </div>

                    </div>
                  </>
                ))}
              </div>







            </div>
          ))}
        {pix &&
          pix.map((order, index) => (
            <div>

              <div
                key={index}
                className={styles.boletoContainer}
              >
                <div className={styles.TotalAmountContainer}>




                  <div className={styles.justifyContent}>
                    <span className={styles.span}>Tipo</span>

                    <span className={styles.span}>Total do pedido

                    </span>
                    {order.shippingFee && <span className={styles.span}>Valor da entrega</span>}

                    <span className={styles.span}>Quantidade total</span>

                    <a href="https://www.kangu.com.br/rastreio/" target="_blank" className={styles.span} style={{}}>
                      Rastrear Pedido
                    </a>
                    <span className={styles.span}>Status</span>
                  </div>
                  <div className={styles.justifyContent}>
                    <span className={styles.span}>{order.billingType}</span>

                    <span className={styles.value}>R$ {order.value}</span>
                    {order.shippingFee && <span className={styles.span}>{order.shippingFee}</span>
                    }


                    <span className={styles.span}>{order.totalQuantity} unidades</span>


                    {order.status === "RECEIVED" || "CONFIRMED" && <span className={styles.span}>{order.trackingCode}</span>
                    }


                    <span className={`${styles.status} ${styles[order.status.toLowerCase()]
                      }`}>
                      {" "}
                      {(() => {
                        switch (order.status) {
                          case "RECEIVED":
                            return "PAGO";
                          case "CONFIRMED":
                            return "COBRANÇA CONFIMADA";
                          case "PENDING":
                            return "PENDENTE";
                          case "OVERDUE":
                            return "COBRANÇA VENCIDA";
                          default:
                            return;
                        }
                      })()}
                    </span>

                  </div>



                </div>
                {order.status === "PENDING" ? (

                  <div >
                    {order.status === "PENDING" ? (
                      <div className={styles.pixCodeContainer}>
                        {order.encodedImage && (
                          <ImageComponent encodedImage={order.encodedImage} className={styles.pixCodeContainer___encodedImage} />
                        )}
                        {order.encodedImage && (
                          <div className={styles.pixCodeContainer___Container} >
                            <p className={styles.pixCodeContainer___p}>{order.payload}</p>
                            <div>
                              <button onClick={() => handleClick(order.payload)} className={styles.pixCodeContainer___button}>
                                {payload ? "Copiado" : "Copiar"}
                              </button>
                            </div>
                            <div className={styles.pixCodeContainer__span}>
                              <WatchLaterOutlinedIcon />
                              <span >
                                Este Boleto expira em
                                24 horas</span>
                            </div>

                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}



                  </div>


                ) : (
                  ""
                )}


                <div>
                  {order.products.map((product, prodIndex) => (
                    <>
                      <div key={prodIndex} className={styles.boletoContainer__card}>
                        <img
                          src={product.image}
                          alt={`Produto ${product.productId}`}
                          className={styles.boletoContainer__img}
                        />
                        <div className={styles.boletoContainer__text}>

                          <span>{truncateName(product.name)}</span>

                          <span className={styles.size}>{product.size}</span>



                          <span className={styles.quantity}> {product.quantity}</span>


                        </div >
                        <div>                      <span className={styles.price}>R${product.price && product.price}</span>
                        </div>

                      </div>
                    </>
                  ))}
                </div>







              </div>


            </div>
          ))}

        {creditCard &&
          creditCard.map((order, index) => (
            <div
              key={index}
              className={styles.boletoContainer}
            >
              <div className={styles.TotalAmountContainer}>




                <div className={styles.justifyContent}>
                  <span className={styles.span}>Tipo</span>
                  <span className={styles.span}>Numero de Parcelas</span>
                  <span className={styles.span}>Total do pedido</span>
                  {order.shippingFee && <span className={styles.span}>Valor da entrega</span>}

                  <span className={styles.span}>Quantidade total</span>


                  <a href="https://www.kangu.com.br/rastreio/" target="_blank" className={styles.span} style={{}}>
                    Rastrear Pedido
                  </a>
                  <span className={styles.span}>Status</span>
                </div>
                <div className={styles.justifyContent}>
                  <span className={styles.span}>{order.billingType === "CREDIT_CARD" && "Cartão de Credito"}</span>

                  <span className={styles.installmentCount}>{order.installmentCount}</span>

                  <span className={styles.value}>R$ {order.value}</span>
                  {order.shippingFee && <span className={styles.span}>{order.shippingFee}</span>}



                  <span className={styles.span}>{order.totalQuantity} unidades</span>



                  {order.status === "RECEIVED" || "CONFIRMED" && <span className={styles.span}>{order.trackingCode}</span>
                  }

                  <span className={`${styles.status} ${styles[order.status.toLowerCase()]
                    }`}>
                    {" "}
                    {(() => {
                      switch (order.status) {
                        case "RECEIVED":
                          return "PAGO";
                        case "CONFIRMED":
                          return "COBRANÇA CONFIMADA";
                        case "PENDING":
                          return "PENDENTE";
                        case "OVERDUE":
                          return "COBRANÇA VENCIDA";
                        default:
                          return;
                      }
                    })()}
                  </span>


                </div>



              </div>
              {order.status === "PENDING" ? (

                <div className={styles.boletoContainer__buttonContainer}>
                  <Link to={order.bankSlipUrl} style={{ textDecoration: "none" }}>
                    {" "}
                    <button className={styles.boletoContainer__button}>Ver boleto</button>{" "}
                  </Link>
                  <div className={styles.boletoContainer__span}>
                    <WatchLaterOutlinedIcon />
                    <span >
                      Este Boleto expira em
                      24 horas</span>
                  </div>



                </div>


              ) : (
                ""
              )}


              <div >






              </div>
              <div>
                {order.products.map((product, prodIndex) => (
                  <>
                    <div key={prodIndex} className={styles.boletoContainer__card}>
                      <img
                        src={product.image}
                        alt={`Produto ${product.productId}`}
                        className={styles.boletoContainer__img}
                      />
                      <div className={styles.boletoContainer__text}>

                        <span>{truncateName(product.name)}</span>

                        <span className={styles.size}>Tamanho: {product.size}</span>



                        <span className={styles.quantity}>Quantidade: {product.quantity}</span>


                      </div >
                      <div>                      <span className={styles.price}>R${product.price && product.price}</span>
                      </div>

                    </div>
                  </>
                ))}
              </div>







            </div>
          ))}



      </>)}

    </>
  );
};

export default AllOrderDetails;
