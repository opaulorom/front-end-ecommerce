import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Header from "./Header";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FreteSelect from "./FreteSelect";


const Cart = () => {
  const [getCart, setGetCart] = useState([]);
  const [handleDeleteProduct, setHandleDeleteProduct] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const [open, setOpen] = React.useState(false);
  const { removeFromCart } = useCart(); // Use a função removeFromCart do contexto do carrinho
  const [getTotal, setGetTotal] = useState([]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const clerkUserId = user.id;
      axios
        .get(`http://localhost:3001/api/cart/${clerkUserId}`)
        .then((response) => {
          setGetCart(response.data.cart.products);
        })
        .catch((error) => {
          console.log("Erro ao visualizar frete.", error);
        });
    }
  }, [isLoaded, isSignedIn, user]);

  const handleDelete = useCallback(
    (productId) => {
      const clerkUserId = user.id;
      axios
        .delete(
          `http://localhost:3001/api/remove-from-cart/${clerkUserId}/${productId}`
        )
        .then((response) => {
          console.log(response.data.message);
          // Atualize o estado do carrinho na sua aplicação, se necessário
          setGetCart((prevCart) =>
            prevCart.filter((item) => item.productId._id !== productId)
          );
          removeFromCart(); // Chame a função removeFromCart do contexto do carrinho
        })
        .catch((error) => {
          console.error("Erro ao remover produto do carrinho:", error);
        });
    },
    [user, removeFromCart]
  );

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const clerkUserId = user.id;
      axios
        .get(`http://localhost:3001/api/cart/${clerkUserId}/total-price`)
        .then((response) => {
          setGetTotal(response.data);
        })
        .catch((error) => {
          console.log("Erro ao visualizar frete.", error);
        });
    }
  }, [isLoaded, isSignedIn, user]);
  return (
    <div>
      <Header />
      <Navbar />
      {getCart.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-5rem",
          }}
        >
          <img
            src="<https://i.ibb.co/x765V9y/bag-4.png>"
            alt=""
            style={{ width: "15vw" }}
          />
          <p>O carrinho está vazio.</p>
        </div>
      ) : (
        <>
          {getCart.map((item, index) => (
            <div key={index} style={{ marginTop: "10rem", marginLeft: "1rem", display:"flex", alignItems:"center" }}>

              <Link to={`/products/${item._id}`}>
                {item.productId.variations[0] &&
                  item.productId.variations[0].urls &&
                  item.productId.variations[0].urls[0] &&
                  item.productId.variations[0].urls[0] && (
                    <img
                      src={item.productId?.variations?.[0]?.urls?.[0]}
                      alt={item.productId?.name}
                      style={{ width: "20%", marginBottom: "10px" }}
                    />
                  )}
              </Link>
             {item.productId.name}
               {item.productId.price}
              {item.productId.size}
             
              <RemoveIcon  onClick={() => {
                  const newQuantity = item.quantity - 1;
                  if (newQuantity >= 0) {
                    const newCart = [...getCart];
                    newCart[index].quantity = newQuantity;
                    const clerkUserId = user.id;
                    const productId = item.productId._id;
                    axios
                      .put(
                        `http://localhost:3001/api/update-quantity/${clerkUserId}/${productId}`,
                        { quantity: newQuantity }
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
                }}/>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value);
                  const newCart = [...getCart];
                  newCart[index].quantity = newQuantity;
                  setGetCart(newCart);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const newQuantity = parseInt(e.target.value);
                    const newCart = [...getCart];
                    newCart[index].quantity = newQuantity;
                    const clerkUserId = user.id;
                    const productId = item.productId._id;
                    axios
                      .put(
                        `http://localhost:3001/api/update-quantity/${clerkUserId}/${productId}`,
                        { quantity: newQuantity }
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
                style={{width:"2vw"}}
              />
          
              <AddIcon  onClick={() => {
                  const newQuantity = item.quantity + 1;
                  const newCart = [...getCart];
                  newCart[index].quantity = newQuantity;
                  const clerkUserId = user.id;
                  const productId = item.productId._id;
                  axios
                    .put(
                      `http://localhost:3001/api/update-quantity/${clerkUserId}/${productId}`,
                      { quantity: newQuantity }
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
                }}/>
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
                  Excluir
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
                      Você tem certeza que quer excluir o produto do carrinho?
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
          ))}
        </>
      )}

      {typeof getTotal === "object" && <div>{getTotal.totalAmount}</div>}
      <Link to={"/payment"}>
        <button>Fazer Pedido</button>
      </Link>
      <FreteSelect/>

    </div>
  );
};

export default Cart;
