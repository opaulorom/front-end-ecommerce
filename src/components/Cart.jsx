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
import styles from "./Cart.module.css";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

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
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [updatedQuantity, setUpdatedQuantity] = useState(1);
  const [exceedAvailability, setExceedAvailability] = useState(1);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  const [totalQuantity, setTotalQuantity] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [isRadioButtonEnabled, setIsRadioButtonEnabled] = useState(false);

  useEffect(() => {
    // Atualiza o estado do botão baseado nas condições
    if (selectedFreteIndex !== null || getTotal.totalAmount >= 300) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [selectedFreteIndex, getTotal.totalAmount]);

  useEffect(() => {
    // Atualiza o estado do botão baseado nas condições
    if (selectedFreteIndex !== null || getTotal.totalAmount <= 300) {
      setIsRadioButtonEnabled(true);
    } else {
      setIsRadioButtonEnabled(false);
    }
  }, [selectedFreteIndex, getTotal.totalAmount]);

  const handleClickOpenModal = (uniqueId) => {
    setDeleteProductId(uniqueId);

    setOpenModal(true);
  };

  const handleClickCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        openModal
      ) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  function handleProducts() {
    setLoading(true); // Define o estado de carregamento como falso

    axios
      .get(`http://localhost:3001/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGetCart(response.data.cart.products); // Define os produtos do carrinho
        setGetTotal(response.data.cart); // Define o total do carrinho
        setTotalQuantity(response.data.cart.TotalQuantity);
        setLoading(false); // Define o estado de carregamento como falso
      })
      .catch((error) => {
        setLoading(false); // Define o estado de carregamento como falso

        console.log("Erro ao visualizar frete.", error);
      });
  }

  useEffect(() => {
    handleProducts();
  }, []);

  const handleDelete = useCallback(
    (uniqueId) => {
      axios
        .delete(
          `http://localhost:3001/api/remove-from-cart/${userId}/${uniqueId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          // Atualize o estado do carrinho na sua aplicação, removendo o item correto
          setGetCart((prevCart) =>
            prevCart.filter((item) => item._id !== uniqueId)
          );
          handleProducts(); // Atualize outros dados conforme necessário
          console.log("uniqueId", uniqueId);
          removeFromCart()
        })
        .catch((error) => {
          console.error("Erro ao remover produto do carrinho:", error);
        });
    },
    [userId, removeFromCart]
  );

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
      // After updating the shipping fee, fetch the updated cart data
      const cartResponse = await axios.get(
        `http://localhost:3001/api/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the cart products and total in state variables
      setGetCart(cartResponse.data.cart.products);
      setGetTotal(cartResponse.data.cart);

      setShippingFee(cartResponse.data.cart.shippingFee);
      setGetTotal(cartResponse.data.cart); // Define o total do carrinho
      setTotalQuantity(cartResponse.data.cart.TotalQuantity);
      setLoading(false); // Define o estado de carregamento como falso
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAvailableQuantity = (item) => {
    const variation = item.productId.variations.find(
      (variation) => variation.color === item.color
    );
    const sizeObj = variation?.sizes.find((size) => size.size === item.size);
    return sizeObj ? sizeObj.quantityAvailable : 0;
  };

  return (
    <div style={{ position: "relative" }}>
      <Header />

      <Navbar />
      {loading ? ( // Se estiver carregando, exibimos o CircularProgress
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div
            style={{
              marginTop: "10rem",
            }}
          >
           
            {totalQuantity > 0  &&  <p>Total de {totalQuantity} produtos no carrinho</p>}
          </div>
          {getCart.length > 0 && (
            <>
              {selectedFreteIndex === null && getTotal.totalAmount < 300 && (
                <p
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    color: "red",
                  }}
                >
                  Por favor, selecione um frete antes de prosseguir.
                </p>
              )}

              <Link
                to={
                  selectedFreteIndex !== null || getTotal.totalAmount >= 300
                    ? "/payment"
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
                    right: "10px",
                    pointerEvents: isButtonEnabled ? "auto" : "none",
                    opacity: isButtonEnabled ? 1 : 0.5,
                  }}
                  disabled={!isButtonEnabled}

                >
                  Fazer Pedido
                </button>
              </Link>
            </>
          )}

          {getCart.length === 0 && !loggedIn && (
            <>
              <div
                style={{
                  display: "flex",
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
                marginTop: "2rem",
              }}
            >
              <img
                src="https://i.ibb.co/x765V9y/bag-4.png"
                alt=""
        
              />
              <p>O carrinho está vazio.</p>
            </div>
          ) : (
            <>
              {getCart.map((item, index) => (
                <div
                  key={item._id} // Use o _id do produto como chave
               
                  className={styles.ExternalContainer}
                >
                  <div className={styles.ProductsContainer}>
                    {item.productId &&
                      item.productId.variations && ( // Add null check for productId and variations
                        <img
                          src={
                            item.productId.variations.find(
                              (variation) => variation.color === item.color
                            )?.urls[0]
                          }
                          alt={item.productId.name}
                        
                          className={styles.ProductsContainer__image}
                        />
                      )}

                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                      }}
                      className={styles.textsContainer}
                    >
                      <div className={styles.quantity}>
                        {" "}
                        {item.productId.variations &&
                        item.productId.variations.some((variation) =>
                          variation.sizes.some(
                            (size) => size.quantityAvailable > 0
                          )
                        ) ? (
                          <p>{`Apenas ${getAvailableQuantity(
                            item
                          )} unidades em estoque`}</p>
                        ) : (
                          <p className={styles.p}>0 unidades em estoque</p>
                        )}
                      </div>
                      <span>{item.productId && item.productId.name}</span>
                      <span> {item.size}</span>
                      <span> {item.color}</span>

                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".5rem",
                            color: "rgb(236, 62, 62)",
                            cursor: "pointer",
                          }}
                          onClick={() => handleClickOpenModal(item._id)}
                        >
                          <DeleteIcon style={{}} />
                          <span style={{ fontWeight: "600" }}>Excluir</span>
                        </div>
                        <div className={styles.quantityContainer}>
                          <RemoveIcon
                            onClick={() => {
                              const newQuantity = item.quantity - 1; // Defina newQuantity antes de usá-la
                              if (newQuantity >= 0) {
                                const newCart = [...getCart];
                                newCart[index].quantity = newQuantity;
                                const productId = item.productId._id;
                                const color = item.color;
                                const size = item.size;
                                const token = Cookies.get("token");

                                axios
                                  .put(
                                    `http://localhost:3001/api/update-quantity/${userId}/${productId}/${color}/${size}`,
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
                                    axios
                                    .get(`http://localhost:3001/api/cart/${userId}`, {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    })
                                    .then((response) => {
                                      setGetCart(response.data.cart.products); // Define os produtos do carrinho
                                      setGetTotal(response.data.cart); // Define o total do carrinho
                                      setTotalQuantity(response.data.cart.TotalQuantity);
                                      setLoading(false); // Define o estado de carregamento como falso
                                    })
                                    .catch((error) => {
                                      setLoading(false); // Define o estado de carregamento como falso
                              
                                      console.log("Erro ao visualizar frete.", error);
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
                          <span
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              const newCart = [...getCart];
                              newCart[index].quantity = newQuantity;
                              setGetCart(newCart);
                              handleQuantityChange(
                                item.productId._id,
                                newQuantity
                              );
                            }}
                            style={{}}
                            className={styles.inputContainer}
                          >
                            {" "}
                            {item.quantity}
                          </span>
                          <AddIcon
                            onClick={() => {
                              const newQuantity = item.quantity + 1;
                              const productId = item.productId._id;
                              const color = item.color; // Certifique-se de estar obtendo o variationId corretamente
                              const size = item.size; // Certifique-se de estar obtendo o variationId corretamente

                              const token = Cookies.get("token");

                              axios
                                .put(
                                  `http://localhost:3001/api/update-quantity/${userId}/${productId}/${color}/${size}`,
                                  { quantity: newQuantity },
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                )
                                .then((response) => {
                                  const products = response.data.cart.products;

                                  console.log(
                                    "Produtos no carrinho:",
                                    products
                                  );

                                  // Verifica se a quantidade de algum produto excede a disponibilidade
                                  const exceedAvailability = products.some(
                                    (product) => {
                                      console.log(
                                        "Excede disponibilidade?",
                                        product.availableQuantity
                                      );
                                      setExceedAvailability(
                                        product.exceedAvailability
                                      );

                                      console.log(
                                        "Verificando produto:",
                                        product.productId
                                      );
                                      return (
                                        product.quantity >
                                        product.availableQuantity
                                      );
                                    }
                                  );

                                  console.log(
                                    "Excede disponibilidade?",
                                    exceedAvailability
                                  );

                                  if (exceedAvailability) {
                                    console.log(
                                      "A quantidade no carrinho excede a disponibilidade de algum produto. Botão desabilitado."
                                    );
                                    // Não continua com a atualização do carrinho
                                    return;
                                  }

                                  console.log(
                                    "Excede disponibilidade?",
                                    exceedAvailability
                                  );

                                  if (exceedAvailability) {
                                    return; // Não continua com a atualização do carrinho
                                  }

                                  if (exceedAvailability) {
                                    return; // Não continua com a atualização do carrinho
                                  }

                                  // Atualiza o estado apenas se a quantidade for válida
                                  setGetCart((prevCart) => {
                                    const newCart = [...prevCart];

                                    const productIndex = newCart.findIndex(
                                      (product) =>
                                        product.productId._id === productId &&
                                        product.color === color &&
                                        product.size === size
                                    ); // Certifique-se de verificar também o variationId
                                    if (productIndex !== -1) {
                                      newCart[productIndex].quantity =
                                        newQuantity;
                                    }
                                    return newCart;
                                  });

                                  axios
                                  .get(`http://localhost:3001/api/cart/${userId}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  })
                                  .then((response) => {
                                    setGetCart(response.data.cart.products); // Define os produtos do carrinho
                                    setGetTotal(response.data.cart); // Define o total do carrinho
                                    setTotalQuantity(response.data.cart.TotalQuantity);
                                    setLoading(false); // Define o estado de carregamento como falso
                                  })
                                  .catch((error) => {
                                    setLoading(false); // Define o estado de carregamento como falso
                            
                                    console.log("Erro ao visualizar frete.", error);
                                  });
                                })
                                .catch((error) => {
                                  console.log(
                                    "Erro ao atualizar quantidade do produto no carrinho.",
                                    error
                                  );
                                });
                              setUpdatedQuantity(newQuantity);
                              console.log("quantidade", newQuantity);
                            }}
                            style={{
                              cursor: "pointer",
                              color:
                                item.quantity === getAvailableQuantity(item)
                                  ? "rgb(189, 189, 189)"
                                  : "rgb(33, 33, 33)",
                            }}
                          />
                        </div>
                      </div>
                      <div className={styles.texts}>
                        <span
                          className={styles.spanName}
                          style={{
                            color:
                              item.quantity === getAvailableQuantity(item)
                                ? "#E71E1E"
                                : "#21BF45",
                          }}
                        >
                          {item.quantity === getAvailableQuantity(item)
                            ? "Produto fora de estoque"
                            : "Produto em estoque"}
                        </span>
                      </div>
                    </div>
                    <div>R${item.price}</div>
                  </div>
                </div>
              ))}
            </>
          )}

          {openModal && (
            <div className={styles.Modal}>
              <div ref={modalRef} className={styles.ModalContent}>
                <span className={styles.Close} onClick={handleClickCloseModal}>
                  <CloseIcon />
                </span>
                <h1 style={{ fontSize: "1.5rem" }}>
                  Essa ação e irreversível você quer Excluir essa Cor e todos os
                  tamanhos?
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1.5rem",
                    marginTop: "3rem",
                  }}
                >
                  <button
                    onClick={() => {
                      handleDelete(deleteProductId);
                      handleClickCloseModal();
                    }}
                    style={{
                      backgroundColor: "#14337c",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      width: "11vw",
                      padding: "1rem",
                      borderRadius: "5px",
                      fontSize: "1.2rem",
                    }}
                  >
                    SIM
                  </button>

                  <button
                    type="button"
                    onClick={handleClickCloseModal}
                    style={{
                      backgroundColor: "#14337c",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      width: "11vw",
                      padding: "1rem",
                      borderRadius: "5px",
                      fontSize: "1.2rem",
                    }}
                  >
                    NÃO
                  </button>
                </div>
              </div>
            </div>
          )}

          {getCart.length > 0 && (
            <div
              style={{
                marginLeft: "14rem",
                position: "absolute",
                right: "10px",
              }}
            >
              <div>Taxa de Envio selecionada: R$ {shippingFee.toFixed(2)}</div>
              {getTotal &&
                typeof getTotal === "object" &&
                getTotal.totalAmount && (
                  <div style={{ marginTop: "10rem" }}>
                    Total do Carrinho: R$ {getTotal.totalAmount.toFixed(2)}
                  </div>
                )}

              <form
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <input
                  type="text"
                  value={cep}
                  onChange={(event) => setCep(event.target.value)}
                  placeholder="Digite pra pesquisar um cep."
                  style={{ height: "4vh" }}
                />

                <button
                  type="submit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#5070E3",
                    color: "white",
                    border: "none",
                    padding: ".4rem",
                    borderRadius: "5px",
                    fontWeight: "500",
                    fontFamily: "poppins, sans-serif",
                    cursor: "pointer",
                    width: "8vw",
                    justifyContent: "center",
                  }}
                  onClick={handleSubmit}
                >
                  {" "}
                  <SearchIcon /> Buscar{" "}
                </button>
              </form>

              {frete && (
                <div>
                  {frete.map((item, index) => (
                    <div key={index}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <input
                          type="radio"
                          name="selectedFrete"
                          value={index}
                          onClick={() => handleRadioClick(index)}
                          checked={selectedFreteIndex === index}
                          style={{
                            pointerEvents: isRadioButtonEnabled ? "auto"  :"none"  ,
                    opacity: isRadioButtonEnabled ? 1  : 0.5,
                          }}
                          disabled={!isRadioButtonEnabled}
                        />
                        <img
                          src={item.logo}
                          alt="logo das transportadoras"
                          style={{ width: "10vw" }}
                        />

                        <p>{item.nomeTransportadora}</p>
                        <p>
                          {" "}
                          {item.dataPrevistaEntrega
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")}
                        </p>
                        <p> {item.prazoEntrega}</p>
                        <p> valor do frete:{item.valorFrete}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
