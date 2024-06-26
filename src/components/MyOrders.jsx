import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";
import { Pagination, Stack } from "@mui/material";
import styles from "./MyOrders.module.css";
const MyOrders = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [boletos, setBoletos] = useState([]);
  const [pix, setPix] = useState([]);
  const [creditCard, setCreditCard] = useState([]);
  const credentials = Cookies.get('role');
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const token = Cookies.get('token');
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: newExpanded ? panel : false,
    }));
  };

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/allOrders/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Credentials: credentials,
          },
          params: { page: currentPage, pageSize },
        })
        .then((response) => {
          setBoletos(response.data.boleto);
          setPix(response.data.pix);
          setCreditCard(response.data.creditCard);
          setTotalOrders(response.data.totalOrders);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
        });
    }
  }, [loggedIn, userId, currentPage, pageSize]);

  const handleClick = (payload) => {
    navigator.clipboard.writeText(payload);
  };
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabStyle = {
    color: "#ccc",
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
      ) : (
        <>
          <div >
            {[...boletos, ...pix, ...creditCard].map((order, index) => (
              <div
                key={index}
                className={styles.dataContainer}
              >
                <div >
                  {order.products.slice(0, 1).map((product, prodIndex) => (
                    <div
                      key={prodIndex}

                    >
                      <Link to={`/order/${order.custumerId}/${order._id}`}>
                        <img
                          src={product.image}
                          alt={`Produto ${product.productId}`}
                          className={styles.dataContainer__img}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
                <div

                >
                  {" "}
                  <div className={styles.flex}>
                    <span>{order.billingType}</span>
                    <span>R${order.value}</span>{" "}

                  </div>

                  <div className={styles.flex}>
                    <span>data do pedido: </span>
                    <span>{formatDate(order.dueDate)}</span>

                  </div>

                  <div
                  className={styles.flex}
                >
                  <span className={styles.status}>Status</span>
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
                </div>

                <div

                ></div>
               

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


          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(totalOrders / pageSize)}
                variant="outlined"
                color="primary"
                size="large"
                page={currentPage}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
