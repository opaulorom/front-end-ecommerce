// import React, { useCallback, useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import axios from "axios";
// import Header from "./Header";
// import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import Modal from "@mui/joy/Modal";
// import ModalDialog from "@mui/joy/ModalDialog";
// import Typography from "@mui/joy/Typography";
// import { useCart } from "../context/CartContext";
// import { Link } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import SearchIcon from "@mui/icons-material/Search";
// import styles from "./Cart.module.css";
// import Cookies from "js-cookie";
// import { useAuth } from "../context/AuthContext";

// const Cart = () => {
//   const [getCart, setGetCart] = useState([]);
//   const [handleDeleteProduct, setHandleDeleteProduct] = useState(false);
//   const [open, setOpen] = React.useState(false);
//   const { removeFromCart } = useCart(); // Use a função removeFromCart do contexto do carrinho
//   const [getTotal, setGetTotal] = useState({});
//   const [selectedFreteIndex, setSelectedFreteIndex] = useState(
//     localStorage.getItem("selectedFreteIndex") || null
//   );
//   const userId = Cookies.get("userId"); // Obtenha o token do cookie
//   const [cep, setCep] = useState(localStorage.getItem("cep") || "");
//   const [frete, setFrete] = useState(null);
//   const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie
//   const token = Cookies.get("token"); // Obtenha o token do cookie
//   const [shippingFee, setShippingFee] = useState(0);
//   const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação

//   function handleProducts() {
//     axios
//       .get(`http://localhost:3001/api/cart/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setGetCart(response.data.cart.products);
//       })
//       .catch((error) => {
//         console.log("Erro ao visualizar frete.", error);
//       });
//   }
//   useEffect(() => {
//     handleProducts();
//   }, []);

//   const handleDelete = useCallback(
//     (productId) => {
//       axios
//         .delete(
//           `http://localhost:3001/api/remove-from-cart/${userId}/${productId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then((response) => {
//           // console.log(response.data.message);
//           // // Atualize o estado do carrinho na sua aplicação, se necessário
//           // setGetCart((prevCart) =>
//           //   prevCart.filter((item) => item.productId._id !== productId)
//           // );
//           // removeFromCart(); // Chame a função removeFromCart do contexto do carrinho
//           handleProducts();
//         })
//         .catch((error) => {
//           console.error("Erro ao remover produto do carrinho:", error);
//         });
//     },
//     [userId, removeFromCart]
//   );

//   const handleQuantityChange = useCallback(
//     (productId, newQuantity) => {
//       axios
//         .put(
//           `http://localhost:3001/api/update-quantity/${userId}/${productId}`,
//           { quantity: newQuantity },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Credentials: credentials,
//             },
//           }
//         )
//         .then((response) => {
//           setGetCart((prevCart) => {
//             const newCart = [...prevCart];
//             const index = newCart.findIndex(
//               (item) => item.productId._id === productId
//             );
//             if (index !== -1) {
//               newCart[index].quantity = newQuantity;
//             }
//             return newCart;
//           });
//         })
//         .catch((error) => {
//           console.log(
//             "Erro ao atualizar quantidade do produto no carrinho.",
//             error
//           );
//         });
//     },
//     [userId]
//   );

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/api/cart/${userId}/total-price`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Credentials: credentials,
//         },
//       })
//       .then((response) => {
//         console.log(response.data); // Verifique se o valor totalAmount está presente na resposta
//         if (response.data.totalAmount !== getTotal.totalAmount) {
//           setGetTotal(response.data);
//         }
//       })

//       .catch((error) => {
//         console.log("Erro ao visualizar frete.", error);
//       });
//   }, [userId, getCart, getTotal]);

//   useEffect(() => {
//     localStorage.setItem("cep", cep);
//   }, [cep]);

//   useEffect(() => {
//     const fetchFrete = async () => {
//       try {
//         const responseGet = await axios.get(
//           `http://localhost:3001/api/frete/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Credentials: credentials,
//             },
//           }
//         );
//         setFrete(responseGet.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchFrete();
//   }, [cep, userId]);

//   useEffect(() => {
//     if (frete && frete.length > 0) {
//       setSelectedFreteIndex(
//         +localStorage.getItem("selectedFreteIndex") || null
//       );
//     }
//   }, [frete]);

//   const handleRadioClick = async (index) => {
//     try {
//       const freteId = frete[index]._id;
//       await axios.put(
//         `http://localhost:3001/api/cart/${userId}/shippingFee/${freteId}`,
//         {
//           // Remova as linhas de cabeçalho daqui
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             // Remova 'Credentials: credentials'
//           },
//         }
//       );
//       setSelectedFreteIndex(index);
//       localStorage.setItem("selectedFreteIndex", index);
//       const response = await axios.get(
//         `http://localhost:3001/api/cart/${userId}/total-price`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             // Remova 'Credentials: credentials'
//           },
//         }
//       );

//       if (
//         response &&
//         response.data &&
//         response.data.totalAmount !== getTotal.totalAmount
//       ) {
//         setGetTotal(response.data);
//       }

//       const res = await axios.get(`http://localhost:3001/api/cart/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // Remova 'Credentials: credentials'
//         },
//       });

//       setShippingFee(res.data.cart.shippingFee);
//     } catch (error) {
//       console.error("Error updating shipping fee:", error);
//     }
//   };

//   const handleAddShippingFee = () => {
//     if (selectedFreteIndex !== null) {
//       // Verifica se um frete foi selecionado
//       if (getTotal.totalAmount >= 300) {
//       }
//     } else {
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // Faz a solicitação POST para obter os dados do frete com o novo CEP
//       await axios.post(
//         `http://localhost:3001/api/frete/${userId}`,
//         { cep },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Atualiza o estado do frete com os dados do frete da requisição GET
//       const responseGet = await axios.get(
//         `http://localhost:3001/api/frete/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("log", userId);
//       setFrete(responseGet.data);
//       await axios.get(`http://localhost:3001/api/cart/${userId}/total-price`);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <Header />

//       <Navbar />
//       {getCart.length > 0 && (
//         <>
//           {selectedFreteIndex === null && getTotal.totalAmount < 300 && (
//             <p
//               style={{
//                 position: "absolute",
//                 right: "10px",
//                 top: "10px",
//                 color: "red",
//               }}
//             >
//               Por favor, selecione um frete antes de prosseguir.
//             </p>
//           )}

//           <Link
//             to={
//               selectedFreteIndex !== null || getTotal.totalAmount >= 300
//                 ? "/payment"
//                 : "#"
//             }
//           >
//             <button
//               onClick={handleAddShippingFee}
//               style={{
//                 backgroundColor: "#5070E3",
//                 color: "white",
//                 border: "none",
//                 padding: ".8rem",
//                 borderRadius: "5px",
//                 fontWeight: "500",
//                 fontFamily: "poppins, sans-serif",
//                 cursor: "pointer",
//                 position: "absolute",
//                 right: "10px",
//                 pointerEvents:
//                   selectedFreteIndex !== null || getTotal.totalAmount >= 300
//                     ? "auto"
//                     : "none",
//                 opacity:
//                   selectedFreteIndex !== null || getTotal.totalAmount >= 300
//                     ? 1
//                     : 0.5,
//               }}
//             >
//               Fazer Pedido
//             </button>
//           </Link>
//         </>
//       )}

//       {getCart.length === 0 && !loggedIn && (
//         <>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               marginTop: "15rem",
//             }}
//           >
//             <div
//               style={{
//                 marginTop: "5rem",
//                 fontFamily: "poppins",
//                 fontSize: "1rem",
//                 fontWeight: "400",
//               }}
//             >
//               {" "}
//               Somente os usuários registrados podem acessar esta página faça{" "}
//               <Link
//                 to={"/perfil"}
//                 style={{ color: "inherit", textDecoration: "none" }}
//               >
//                 {" "}
//                 <b
//                   style={{
//                     fontFamily: "poppins",
//                     fontWeight: "600",
//                     fontSize: "1.2rem",
//                   }}
//                 >
//                   {" "}
//                   Login
//                 </b>
//                 .
//               </Link>{" "}
//             </div>
//           </div>
//         </>
//       )}

//       {getCart.length === 0 && loggedIn === true ? (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             marginTop: "15rem",
//           }}
//         >
//           <img
//             src="https://i.ibb.co/x765V9y/bag-4.png"
//             alt=""
//             style={{ width: "15vw" }}
//           />
//           <p>O carrinho está vazio.</p>
//         </div>
//       ) : (
//         <>
//           {getCart.map((item, index) => (
//             <div
//               key={index}
//               style={{
//                 marginTop: "14rem",
//                 marginLeft: "3rem",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "1rem",
//               }}
//             >
//               {item.productId.quantity > 0 ? (
//                 <p>{`Apenas ${item.productId.quantity} unidades em estoque`}</p>
//               ) : (
//                 <p>Produto esgotado</p>
//               )}
//               <div className={styles.ProductsContainer}>
//                 {item.productId.variations && (
//                   <img
//                     src={
//                       item.productId.variations.find(
//                         (variation) => variation.color === item.color
//                       )?.urls[0]
//                     }
//                     alt={item.productId.name}
//                     style={{ width: "10vw", marginBottom: "10px" }}
//                   />
//                 )}
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "1rem",
//                   }}
//                   className={styles.textsContainer}
//                 >
//                   <span> {item.productId.name}</span>
//                   <span> {item.size}</span>
//                   <span> {item.color}</span>
//                   <div>
//                     <React.Fragment>
//                       <Button
//                         variant="outlined"
//                         color="neutral"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setOpen(true);
//                         }}
//                         sx={{
//                           border: "0",
//                         }}
//                       >
//                         Excluir
//                       </Button>
//                       <Modal open={open} onClose={() => setOpen(false)}>
//                         <ModalDialog
//                           aria-labelledby="nested-modal-title"
//                           aria-describedby="nested-modal-description"
//                           sx={(theme) => ({
//                             [theme.breakpoints.only("xs")]: {
//                               top: "unset",
//                               bottom: 0,
//                               left: 0,
//                               right: 0,
//                               borderRadius: 0,
//                               transform: "none",
//                               maxWidth: "unset",
//                             },
//                           })}
//                         >
//                           <Typography id="nested-modal-title" level="h2">
//                             Você tem certeza que quer excluir o produto do
//                             carrinho?
//                           </Typography>
//                           <Typography
//                             id="nested-modal-description"
//                             textColor="text.tertiary"
//                           >
//                             Essa ação não pode ser desfeita.
//                           </Typography>
//                           <Box
//                             sx={{
//                               mt: 1,
//                               display: "flex",
//                               gap: 1,
//                               flexDirection: {
//                                 xs: "column",
//                                 sm: "row-reverse",
//                               },
//                             }}
//                           >
//                             <Button
//                               type="button" // Adicione esta linha para definir o tipo do botão como "button"
//                               variant="solid"
//                               color="primary"
//                               onClick={() => {
//                                 setOpen(false),
//                                   handleDelete(item.productId._id);
//                               }}
//                             >
//                               Exclui
//                             </Button>
//                             <Button
//                               variant="outlined"
//                               color="neutral"
//                               onClick={() => setOpen(false)}
//                             >
//                               Cancelar
//                             </Button>
//                           </Box>
//                         </ModalDialog>
//                       </Modal>
//                     </React.Fragment>
                    
//                 <div className={styles.quantityContainer}>
//                   <RemoveIcon
//                     onClick={() => {
//                       const newQuantity = item.quantity - 1;
//                       if (newQuantity >= 0) {
//                         const newCart = [...getCart];
//                         newCart[index].quantity = newQuantity;
//                         const productId = item.productId._id;
//                         const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie

//                         const token = Cookies.get("token"); // Obtenha o token do cookie
//                         axios
//                           .put(
//                             `http://localhost:3001/api/update-quantity/${userId}/${productId}`,
//                             { quantity: newQuantity },
//                             {
//                               headers: {
//                                 Authorization: `Bearer ${token}`,
//                                 Credentials: credentials,
//                               },
//                             }
//                           )
//                           .then((response) => {
//                             setGetCart((prevCart) => {
//                               const newCart = [...prevCart];
//                               newCart[index].quantity = newQuantity;
//                               return newCart;
//                             });
//                           })
//                           .catch((error) => {
//                             console.log(
//                               "Erro ao atualizar quantidade do produto no carrinho.",
//                               error
//                             );
//                           });
//                       }
//                     }}
//                     style={{ cursor: "pointer" }}
//                   />
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) => {
//                       const newQuantity = parseInt(e.target.value);
//                       const newCart = [...getCart];
//                       newCart[index].quantity = newQuantity;
//                       setGetCart(newCart);
//                       handleQuantityChange(item.productId._id, newQuantity);
//                     }}
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         const newQuantity = parseInt(e.target.value);
//                         const newCart = [...getCart];
//                         newCart[index].quantity = newQuantity;
//                         setGetCart(newCart);
//                         handleQuantityChange(item.productId._id, newQuantity);
//                       }
//                     }}
//                     style={{ width: "2vw" }}
//                   />

//                   <AddIcon
//                     onClick={() => {
//                       const newQuantity = item.quantity + 1;
//                       const newCart = [...getCart];
//                       newCart[index].quantity = newQuantity;

//                       const productId = item.productId._id;
//                       const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie

//                       const token = Cookies.get("token"); // Obtenha o token do cookie
//                       axios
//                         .put(
//                           `http://localhost:3001/api/update-quantity/${userId}/${productId}`,
//                           { quantity: newQuantity },
//                           {
//                             headers: {
//                               Authorization: `Bearer ${token}`,
//                               Credentials: credentials,
//                             },
//                           }
//                         )
//                         .then((response) => {
//                           setGetCart((prevCart) => {
//                             const newCart = [...prevCart];
//                             newCart[index].quantity = newQuantity;
//                             return newCart;
//                           });
//                         })
//                         .catch((error) => {
//                           console.log(
//                             "Erro ao atualizar quantidade do produto no carrinho.",
//                             error
//                           );
//                         });
//                     }}
//                     style={{ cursor: "pointer" }}
//                   />
//                 </div>
//                   </div>
//                 </div>
//              <div>R${item.price}</div>
//               </div>
//             </div>
//           ))}
//         </>
//       )}
//       {getCart.length > 0 && (
//         <div
//           style={{ marginLeft: "14rem", position: "absolute", right: "10px" }}
//         >
//           <div>Taxa de Envio selecionada: R$ {shippingFee.toFixed(2)}</div>
//           {getTotal && typeof getTotal === "object" && getTotal.totalAmount && (
//             <div style={{ marginTop: "10rem" }}>
//               total que muda: {getTotal.totalAmount}
//             </div>
//           )}

//           <form style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//             <input
//               type="text"
//               value={cep}
//               onChange={(event) => setCep(event.target.value)}
//               placeholder="Digite pra pesquisar um cep."
//               style={{ height: "4vh" }}
//             />

//             <button
//               type="submit"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: "#5070E3",
//                 color: "white",
//                 border: "none",
//                 padding: ".4rem",
//                 borderRadius: "5px",
//                 fontWeight: "500",
//                 fontFamily: "poppins, sans-serif",
//                 cursor: "pointer",
//                 width: "8vw",
//                 justifyContent: "center",
//               }}
//               onClick={handleSubmit}
//             >
//               {" "}
//               <SearchIcon /> Buscar{" "}
//             </button>
//           </form>

//           {frete && (
//             <div>
//               {frete.map((item, index) => (
//                 <div key={index}>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "1rem",
//                     }}
//                   >
//                     <input
//                       type="radio"
//                       name="selectedFrete"
//                       value={index}
//                       onClick={() => handleRadioClick(index)}
//                       checked={selectedFreteIndex === index}
//                     />
//                     <img
//                       src={item.logo}
//                       alt="logo das transportadoras"
//                       style={{ width: "10vw" }}
//                     />
//                     <p>{item.nomeTransportadora}</p>
//                     <p>
//                       {" "}
//                       {item.dataPrevistaEntrega
//                         .split("T")[0]
//                         .split("-")
//                         .reverse()
//                         .join("/")}
//                     </p>
//                     <p> {item.prazoEntrega}</p>
//                     <p> valor do frete:{item.valorFrete}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import React, { useEffect, useRef, useState } from "react";
// import styles from "./Header.module.css";
// import SearchBar from "./SearchBar";
// import CategoriesList from "./CategoriesList";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import Cookies from "js-cookie";
// import LogoutIcon from "@mui/icons-material/Logout";
// import SearchIcon from '@mui/icons-material/Search';
// import AlertComponente from "./AlertComponente";
// import { useUnreadCount } from "../context/UnreadContext";
// const Header = () => {
//   const { cartItemCount, addToCart, removeFromCart } = useCart();
//   const [localCartItemCount, setLocalCartItemCount] = useState(0);
//   const userId = Cookies.get("userId"); // Obtenha o token do cookie
//   const [showButton, setShowButton] = useState(false);

//   const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
//   const token = Cookies.get("token"); // Obtenha o token do cookie
//   const modalRef = useRef(null);
//   const [openCartModal, setOpenCartModal] = useState(false);
//   const [openBellModal, setOpenBellModal] = useState(false);
//   const { unreadCount } = useUnreadCount(); // Obter o estado do contexto
//   const [showInput, setShowInput] = useState(false);
//   useEffect(() => {
//     const storedCartItemCount = localStorage.getItem("cartItemCount");
//     if (storedCartItemCount !== null) {
//       setLocalCartItemCount(Number(storedCartItemCount));
//     }
//   }, []);

//   useEffect(() => {
//     if (loggedIn) {
//       axios
//         .get(`http://localhost:3001/api/cart/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           setLocalCartItemCount(
//             Math.max(response.data.cart.products.length, 0)
//           );
//         })
//         .catch((error) => {
//           console.error(
//             "Erro ao obter o número de produtos no carrinho:",
//             error
//           );
//         });
//     } else {
//       setLocalCartItemCount(cartItemCount);
//     }
//   }, [loggedIn, userId, cartItemCount]);

//   useEffect(() => {
//     localStorage.setItem("cartItemCount", localCartItemCount);
//   }, [localCartItemCount]);
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         modalRef.current &&
//         !modalRef.current.contains(event.target) &&
//         (openCartModal || openBellModal || showInput) // Só fecha se um dos modais estiver aberto
//       ) {
//         setOpenCartModal(false);
//         setOpenBellModal(false);
//         setShowInput(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [openCartModal, openBellModal, showInput]); // Adicionei openCartModal e openBellModal como dependências

//   const handleClickOpenModal = () => {
//     setOpenCartModal(true);
//   };

//   const handleClickCloseModal = () => {
//     setOpenCartModal(false);
//   };

//   const handleOpenModalAccount = () => {
//     // Verifica se o tamanho e a cor estão selecionados

//     handleClickOpenModal();
//   };

//   // modal do sino

//   const handleClickOpenBellModal = () => {
//     setOpenBellModal(true);
//   };

//   const handleClickCloseBellModal = () => {
//     setOpenBellModal(false);
//   };

//   const handleOpenBellModal = () => {
//     // Verifica se o tamanho e a cor estão selecionados

//     handleClickOpenBellModal();
//   };

//   useEffect(() => {
//     if (loggedIn) {
//       setShowButton(true);
//     } else {
//       setShowButton(false);
//     }
//   });

//   const handleClickCloseInputModal = () => {
//     setShowInput(false);
//   };
//   const handleClickOpenInputModal = () => {
//     setShowInput(true);
//   };

//   const handleOpenInput = () => {
//     handleClickOpenInputModal();
//   };
//   return (
//     <>
//       <div className={styles.ContainerHeader}>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             position: "relative",
//             marginTop: "-2rem",
//           }}
//         >
//           {/* Ícone à esquerda */}
//           <i
//             style={{
//               position: "absolute",
//               left: "2rem", // Posiciona o elemento no lado esquerdo
//               zIndex: "999999",
//             }}
//           >
//             <Link to={"/home"}>
//               <img
//                 src="https://i.ibb.co/B3xYDzG/Logo-mediewal-1.png"
//                 className={styles.MediewalLogo}
//               />
//             </Link>
//           </i>

//           {/* Componente SearchBar à direita */}
//           <div
//             style={{
//               marginRight: "1.5rem",
//               marginLeft: "30rem",
//               zIndex: "9999",
//             }}
//             className={styles.SearchBar}
//           >
//             <SearchBar />
//           </div>
//           <div>
//             {" "}
        
//             <SearchIcon  onClick={handleOpenInput} className={styles.InputButton} />
//             {showInput && (
//               <div ref={modalRef}>
//                 <SearchBar />
//               </div>
//             )}
//           </div>
//           {loggedIn === true && (
//             <div>
//               <div
//                 style={{
//                   position: "absolute",
//                   width: "5rem",
//                   zIndex: "99999",
//                   top: "5px",
//                   right: "12.5rem",
//                 }}
//               >
//                 <img
//                   src="https://i.ibb.co/98L4Hny/bell-6.png"
//                   alt=""
//                   style={{ fontSize: "14rem", cursor: "pointer" }}
//                   onClick={handleOpenBellModal}
//                 />
//                 <span
//                   style={{
//                     position: "absolute",
//                     top: "-10px",
//                     right: "40px",
//                     width: "20px",
//                     height: "20px",
//                     backgroundColor: "#2196f3",
//                     color: "white",
//                     borderRadius: "50%",
//                     fontSize: "13px",
//                     fontWeight: "bold",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   {unreadCount}{" "}
//                   {/* Substituir 0 pelo valor do estado do contexto */}
//                 </span>
//               </div>
//             </div>
//           )}

//           {openBellModal && loggedIn === true && (
//             <div className={styles.HeaderModal}>
//               <div ref={modalRef} className={styles.BellModalContent}>
//                 <div className={styles.FirstContainer}>
//                   <h4 className={styles.h4}>Alertas</h4>
//                 </div>

//                 {showButton && (
//                   <>
//                     <div className={styles.scroll}>
//                       <AlertComponente />
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}

//           {openCartModal && loggedIn === true && (
//             <div className={styles.HeaderModal}>
//               <div ref={modalRef} className={styles.HeaderModalContent}>
//                 {showButton && (
//                   <>
//                     <div className={styles.FirstContainer}>
//                       <h4 className={styles.h4}>Configurações</h4>
//                     </div>
//                     <nav className={styles.NavContainer}>
//                       <ul style={{ listStyleType: "none" }}>
//                         <li className={styles.li}>
//                           <Link
//                             to={"/perfil"}
//                             style={{ textDecoration: "none" }}
//                           >
//                             <a
//                               style={{
//                                 textDecoration: "none",
//                                 color: "rgb(108, 117, 125)",
//                               }}
//                             >
//                               Minha Conta
//                             </a>
//                           </Link>
//                         </li>
//                         <li className={styles.li}>
//                           <Link
//                             to={"/orders"}
//                             style={{ textDecoration: "none" }}
//                           >
//                             <a style={{ color: "rgb(108, 117, 125)" }}>
//                               Historico de Compras
//                             </a>
//                           </Link>
//                         </li>
//                         <li className={styles.li}>
//                           <Link
//                             to={"/forgotPassword"}
//                             style={{ textDecoration: "none" }}
//                           >
//                             <a style={{ color: "rgb(108, 117, 125)" }}>
//                               Alterar senha
//                             </a>
//                           </Link>
//                         </li>
//                       </ul>
//                     </nav>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         color: "red",
//                         position: "absolute",
//                         bottom: "10px",
//                         left: "10px",
//                         gap: ".2rem",
//                         cursor: "pointer",
//                       }}
//                       onClick={logout}
//                     >
//                       <LogoutIcon />
//                       <span
//                         style={{
//                           fontSize: "1rem",
//                           fontFamily: "poppins",
//                           fontWeight: "400",
//                         }}
//                       >
//                         Sair
//                       </span>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}
//           <div className={styles.desktopContainer}>
//             <Link
//               to={loggedIn === true ? " " : "/perfil"}
//               style={{ zIndex: "99999" }}
//             >
//               {" "}
//               <img
//                 src="https://i.ibb.co/L1tX6LY/user-2.png"
//                 alt=""
//                 onClick={handleOpenModalAccount}
//               />
//             </Link>

//             <Link
//               to={"/favoritos"}
//               style={{
//                 cursor: "pointer",
//                 zIndex: "99999",
//               }}
//             >
//               <img src="https://i.ibb.co/2ZnFQfq/heart-1.png" alt="" />
//             </Link>
//             <Link
//               to={"/cart"}
//               style={{
//                 position: "relative",
//                 display: "inline-block",
//                 zIndex: "99999",
//               }}
//             >
//               <img src="https://i.ibb.co/FwNpdzD/shopping-bag-1.png" alt="" />
//               <span
//                 style={{
//                   position: "absolute",
//                   top: "-10px",
//                   right: "-10px",
//                   width: "20px",
//                   height: "20px",
//                   backgroundColor: "red",
//                   color: "white",
//                   borderRadius: "50%",
//                   fontSize: "13px",
//                   fontWeight: "bold",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 {loggedIn ? localCartItemCount : 0}
//               </span>
//             </Link>
//           </div>
//         </div>
//         <div className={styles.MobileHeader}>
//           <Link
//             to={"/favoritos"}
//             style={{
//               cursor: "pointer",
//               color: "white",
//             }}
//           >
//             <FavoriteBorderIcon style={{ fontSize: "2rem" }} />
//           </Link>
//           <Link to={"/perfil"}>
//             <AccountCircleOutlinedIcon
//               style={{ fontSize: "2rem", color: "white" }}
//             />
//           </Link>

//           <Link
//             to={"/cart"}
//             style={{
//               position: "relative",
//               display: "inline-block",
//               color: "white",
//             }}
//           >
//             <span
//               style={{
//                 position: "absolute",
//                 top: "-10px",
//                 right: "-10px",
//                 width: "20px",
//                 height: "20px",
//                 backgroundColor: "red",
//                 color: "white",
//                 borderRadius: "50%",
//                 fontSize: "13px",
//                 fontWeight: "bold",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               {loggedIn ? localCartItemCount : 0}
//             </span>
//             <ShoppingBagOutlinedIcon
//               style={{ fontSize: "2rem", color: "white" }}
//             />
//           </Link>
//         </div>
//         <div
//           style={{
//             marginTop: "-10rem",
//             zIndex: 1, // Define o z-index para 1
//             position: "absolute",
//           }}
//         >
//           <CategoriesList />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;
