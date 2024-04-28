import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Header from "./Header";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./CartB.module.css";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const [getCart, setGetCart] = useState([]);
  const [handleDeleteProduct, setHandleDeleteProduct] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { removeFromCart } = useCart(); // Use a função removeFromCart do contexto do carrinho
  const [getTotal, setGetTotal] = useState({});
  const [selectedFreteIndex, setSelectedFreteIndex] = useState(
    localStorage.getItem("selectedFreteIndex") || null
  );
  const userId = Cookies.get("userId"); // Obtenha o token do cookie
  const [cep, setCep] = useState(localStorage.getItem("cep") || "");
  const [frete, setFrete] = useState(null);
  const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie
  const token = Cookies.get("token"); // Obtenha o token do cookie
  const [shippingFee, setShippingFee] = useState(0);
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  const productsContainerRef = useRef(null);

  function handleProducts() {
    axios
      .get(`http://localhost:3001/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGetCart(response.data.cart.products);
      })
      .catch((error) => {
        console.log("Erro ao visualizar frete.", error);
      });
  }
  useEffect(() => {
    handleProducts();
  }, []);

  const handleDelete = useCallback(
    (productId) => {
      axios
        .delete(
          `http://localhost:3001/api/remove-from-cart/${userId}/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // console.log(response.data.message);
          // // Atualize o estado do carrinho na sua aplicação, se necessário
          // setGetCart((prevCart) =>
          //   prevCart.filter((item) => item.productId._id !== productId)
          // );
          // removeFromCart(); // Chame a função removeFromCart do contexto do carrinho
          handleProducts();
        })
        .catch((error) => {
          console.error("Erro ao remover produto do carrinho:", error);
        });
    },
    [userId, removeFromCart]
  );

  const handleQuantityChange = useCallback(
    (productId, newQuantity) => {
      axios
        .put(
          `http://localhost:3001/api/update-quantity/${userId}/${productId}`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Credentials: credentials,
            },
          }
        )
        .then((response) => {
          setGetCart((prevCart) => {
            const newCart = [...prevCart];
            const index = newCart.findIndex(
              (item) => item.productId._id === productId
            );
            if (index !== -1) {
              newCart[index].quantity = newQuantity;
            }
            return newCart;
          });
        })
        .catch((error) => {
          console.log(
            "Erro ao atualizar quantidade do produto no carrinho.",
            error
          );
        });
    },
    [userId]
  );

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/cart/${userId}/total-price`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Credentials: credentials,
        },
      })
      .then((response) => {
        console.log(response.data); // Verifique se o valor totalAmount está presente na resposta
        if (response.data.totalAmount !== getTotal.totalAmount) {
          setGetTotal(response.data);
        }
      })

      .catch((error) => {
        console.log("Erro ao visualizar frete.", error);
      });
  }, [userId, getCart, getTotal]);

  useEffect(() => {
    localStorage.setItem("cep", cep);
  }, [cep]);

  useEffect(() => {
    const fetchFrete = async () => {
      try {
        const responseGet = await axios.get(
          `http://localhost:3001/api/frete/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Credentials: credentials,
            },
          }
        );
        setFrete(responseGet.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFrete();
  }, [cep, userId]);

  useEffect(() => {
    if (frete && frete.length > 0) {
      setSelectedFreteIndex(
        +localStorage.getItem("selectedFreteIndex") || null
      );
    }
  }, [frete]);

  const handleRadioClick = async (index) => {
    try {
      const freteId = frete[index]._id;
      await axios.put(
        `http://localhost:3001/api/cart/${userId}/shippingFee/${freteId}`,
        {
          // Remova as linhas de cabeçalho daqui
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Remova 'Credentials: credentials'
          },
        }
      );
      setSelectedFreteIndex(index);
      localStorage.setItem("selectedFreteIndex", index);
      const response = await axios.get(
        `http://localhost:3001/api/cart/${userId}/total-price`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Remova 'Credentials: credentials'
          },
        }
      );

      if (
        response &&
        response.data &&
        response.data.totalAmount !== getTotal.totalAmount
      ) {
        setGetTotal(response.data);
      }

      const res = await axios.get(`http://localhost:3001/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Remova 'Credentials: credentials'
        },
      });

      setShippingFee(res.data.cart.shippingFee);
    } catch (error) {
      console.error("Error updating shipping fee:", error);
    }
  };

  const handleAddShippingFee = () => {
    if (selectedFreteIndex !== null) {
      // Verifica se um frete foi selecionado
      if (getTotal.totalAmount >= 300) {
      }
    } else {
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Faz a solicitação POST para obter os dados do frete com o novo CEP
      await axios.post(
        `http://localhost:3001/api/frete/${userId}`,
        { cep },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Atualiza o estado do frete com os dados do frete da requisição GET
      const responseGet = await axios.get(
        `http://localhost:3001/api/frete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("log", userId);
      setFrete(responseGet.data);
      await axios.get(`http://localhost:3001/api/cart/${userId}/total-price`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ position: "relative"}}>




      {getCart.length === 0 && !loggedIn && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "15rem",
              
            }}
          >
            <div
              style={{
                marginTop: "5rem",
                fontFamily: "poppins",
                fontSize: "1rem",
                fontWeight: "400",
              }}
            >
              {" "}
              Somente os usuários registrados podem acessar esta página faça{" "}
              <Link
                to={"/perfil"}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {" "}
                <b
                  style={{
                    fontFamily: "poppins",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                  }}
                >
                  {" "}
                  Login
                </b>
                .
              </Link>{" "}
            </div>
          </div>
        </>
      )}

      {getCart.length === 0 && loggedIn === true ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15rem",
          }}
     

        >
          <img
            src="https://i.ibb.co/x765V9y/bag-4.png"
            alt=""
            style={{ width: "15vw" }}
          />
          <p>O carrinho está vazio.</p>
        </div>
      ) : (
        <div  className={styles.verticalScroll} ref={productsContainerRef}>
        
          {getCart.map((item, index) => (
            <div
              key={index}
              className={styles.product}
            >
             
            
              <div
                style={{
                  border: "1px solid #e9e9e9",
                  display: "flex",
                  flexDirection: "column",
                  width: "20vw",
                  justifyContent: "space-between",
                  padding:"16px 24px 16px 16px",
                  marginBottom:"3rem"
               
                }}
                
              >
                 <div className={styles.quantity} >  {item.productId.quantity > 0 ? (
                <p>{`Apenas ${item.productId.quantity} unidades em estoque`}</p>
              ) : (
                <p className={styles.p}>Produto esgotado so temos 1 no estoque</p>


                
              )}
              </div>
              <div style={{display:"flex",flexDirection:"row"}}>


                <div >
                  {item.productId.variations && (
                    <img
                      src={
                        item.productId.variations.find(
                          (variation) => variation.color === item.color
                        )?.urls[0]
                      }
                      alt={item.productId.name}
                      className={styles.image}
                    />
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className={styles.texts}

                >
                  <span  className={styles.spanName}> {item.productId.name}</span>
                  <span className={styles.spanSize}> Tamanho: {item.size}</span>
                  <span className={styles.spanColor}> Cor: {item.color}</span>
                  <span className={styles.spanPrice}> Preço: R${item.price.toFixed(2)}</span>
                </div>
               <div className={styles.deleteIcon}>
                  {" "}
                  <React.Fragment>
                    <Button
                      variant="outlined"
                      color="neutral"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(true);
                      }}
                      sx={{
                        border: "0",
                      }}
                    >
                      <img src="https://i.ibb.co/bsZVKbf/trash-2.png" alt="" />
                    </Button>
                    <Modal open={open} onClose={() => setOpen(false)}>
                      <ModalDialog
                        aria-labelledby="nested-modal-title"
                        aria-describedby="nested-modal-description"
                        sx={(theme) => ({
                          [theme.breakpoints.only("xs")]: {
                            top: "unset",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderRadius: 0,
                            transform: "none",
                            maxWidth: "unset",
                          },
                        })}
                      >
                        <Typography id="nested-modal-title" level="h2">
                          Você tem certeza que quer excluir o produto do
                          carrinho?
                        </Typography>
                        <Typography
                          id="nested-modal-description"
                          textColor="text.tertiary"
                        >
                          Essa ação não pode ser desfeita.
                        </Typography>
                        <Box
                          sx={{
                            mt: 1,
                            display: "flex",
                            gap: 1,
                            flexDirection: { xs: "column", sm: "row-reverse" },
                          }}
                        >
                          <Button
                            type="button" // Adicione esta linha para definir o tipo do botão como "button"
                            variant="solid"
                            color="primary"
                            onClick={() => {
                              setOpen(false), handleDelete(item.productId._id);
                            }}
                          >
                            Exclui
                          </Button>
                          <Button
                            variant="outlined"
                            color="neutral"
                            onClick={() => setOpen(false)}
                          >
                            Cancelar
                          </Button>
                        </Box>
                      </ModalDialog>
                    </Modal>
                  </React.Fragment>
                </div>

                <div className={styles.PlusAndRemoveIcons}>
                  <RemoveIcon
                    onClick={() => {
                      const newQuantity = item.quantity - 1;
                      if (newQuantity >= 0) {
                        const newCart = [...getCart];
                        newCart[index].quantity = newQuantity;
                        const productId = item.productId._id;
                        const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie

                        const token = Cookies.get("token"); // Obtenha o token do cookie
                        axios
                          .put(
                            `http://localhost:3001/api/update-quantity/${userId}/${productId}`,
                            { quantity: newQuantity },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                          .then((response) => {
                            setGetCart((prevCart) => {
                              const newCart = [...prevCart];
                              newCart[index].quantity = newQuantity;
                              return newCart;
                            });
                          })
                          .catch((error) => {
                            console.log(
                              "Erro ao atualizar quantidade do produto no carrinho.",
                              error
                            );
                          });
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      const newCart = [...getCart];
                      newCart[index].quantity = newQuantity;
                      setGetCart(newCart);
                      handleQuantityChange(item.productId._id, newQuantity);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const newQuantity = parseInt(e.target.value);
                        const newCart = [...getCart];
                        newCart[index].quantity = newQuantity;
                        setGetCart(newCart);
                        handleQuantityChange(item.productId._id, newQuantity);
                      }
                    }}
                    style={{ width: "2vw" }}
                  />

                  <AddIcon
                    onClick={() => {
                      const newQuantity = item.quantity + 1;
                      const newCart = [...getCart];
                      newCart[index].quantity = newQuantity;

                      const productId = item.productId._id;
                      const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie

                      const token = Cookies.get("token"); // Obtenha o token do cookie
                      axios
                        .put(
                          `http://localhost:3001/api/update-quantity/${userId}/${productId}`,
                          { quantity: newQuantity },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                              Credentials: credentials,
                            },
                          }
                        )
                        .then((response) => {
                          setGetCart((prevCart) => {
                            const newCart = [...prevCart];
                            newCart[index].quantity = newQuantity;
                            return newCart;
                          });
                        })
                        .catch((error) => {
                          console.log(
                            "Erro ao atualizar quantidade do produto no carrinho.",
                            error
                          );
                        });
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
       
            
              </div>

              </div>
            </div>
          ))}
        </div>
      )}
      {getCart.length > 0 && (
        <div
          style={{ marginLeft: "14rem", position: "absolute", right: "10px" }}
        >
          {getTotal && typeof getTotal === "object" && getTotal.totalAmount && (
            <div style={{ marginTop: "10rem" }}>
              total que muda: {getTotal.totalAmount}
            </div>
          )}

        
         
    
    
        </div>
      )}

      {getCart.length > 0 && (
        <div className={styles.buttonCart}>
         
          <Link
            to={
              selectedFreteIndex !== null || getTotal.totalAmount >= 300
                ? "/cart"
                : "#"
            }
            
          >
            <button
              onClick={handleAddShippingFee}
              style={{
                backgroundColor: "#5070E3",
                color: "white",
                border: "none",
                padding: ".8rem",
                borderRadius: "5px",
                fontWeight: "500",
                fontFamily: "poppins, sans-serif",
                cursor: "pointer",
                position: "absolute",
                marginTop:"3rem",
                left: "50%",
                transform: "translateX(-50%)",
                pointerEvents:
                  selectedFreteIndex !== null || getTotal.totalAmount >= 300
                    ? "auto"
                    : "none",
                opacity:
                  selectedFreteIndex !== null || getTotal.totalAmount >= 300
                    ? 1
                    : 0.5,
              }}
            >
              Ir pra a sacola
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
