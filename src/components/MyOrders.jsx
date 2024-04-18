import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link do React Router
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ImageComponent from "./ImageComponent";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const MyOrders = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [boletos, setBoletos] = useState([]);
  const [pix, setPix] = useState([]);
  const [creditCard, setCreditCard] = useState([]);

  const [expanded, setExpanded] = React.useState("panel1");
  
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [status, setStatus] = useState("copiar");

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/allOrders/${userId}`)
        .then((response) => {
          setBoletos(response.data.boleto); // Assuming 'boleto' is the key containing
          setPix(response.data.pix); // Assuming 'boleto' is the key containing orders
          setCreditCard(response.data.creditCard);
        })
        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
        });
    }
  }, [loggedIn, userId]);
  //  pix copia e cola

  const handleClick = (payload) => {
    navigator.clipboard.writeText(payload);
  };

  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
      {boletos.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
                <div key={index} style={{ marginTop: "15rem" }}>{index}</div>

          <span>{order.billingType}</span>

          <div>
            {order.products.map((order, prodIndex) => (
              <div key={prodIndex}>
                <img
                  src={order.image}
                  alt={`Produto ${order.productId}`}
                  style={{ width: "10vw" }}
                />

                <div>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Pagar com boleto</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {boletos.map((order, index) => (
                          <div key={index} style={{}}>
                                            <div key={index} style={{ marginTop: "15rem" }}>{index}</div>

                            <span>{order.billingType}</span>
                            <Link to={order.bankSlipUrl}>
                              {order.bankSlipUrl}
                            </Link>
                          </div>
                        ))}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {pix.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
          <div>
            {order.products.map((product, prodIndex) => (
              <div key={prodIndex}>
                <img
                  src={product.image}
                  alt={`Produto ${product.productId}`}
                  style={{ width: "10vw" }}
                />
                <div>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Pagar com Qr code</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {pix.map((order, index) => (
                          <div key={index} style={{}}>
                            <div>
                              {order.encodedImage && (
                                <ImageComponent
                                  encodedImage={order.encodedImage}
                                />
                              )}
                              {order.encodedImage && (
                                <>
                                  <p style={{ width: "10vw" }}>
                                    {order.payload}
                                  </p>
                                  <div>
                                <button onClick={() => handleClick(order.payload)}>
                                  Copiar 
                                </button>
                              </div>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

{creditCard.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
          <div>
            {order.products.map((product, prodIndex) => (
              <div key={prodIndex}>
                <img
                  src={product.image}
                  alt={`Produto ${product.productId}`}
                  style={{ width: "10vw" }}
                />
                <div>
                  cartao
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default MyOrders;
