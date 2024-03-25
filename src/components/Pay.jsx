import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import ImageComponent from "./ImageComponent";
import axios from "axios";

const Pay = () => {
  const [paymentMethod, setPaymentMethod] = useState("pix");

  const userId = Cookies.get("userId"); // Obtenha o token do cookie
  const [encodedImage, setEncodedImage] = useState(null);
  const [pixCode, setPixCode] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;


    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...(name === "pacelas" && { installmentCount: value }),
    }));
  };


  const handleChangePixAndBoleto = (event) => {
    const { name, value } = event.target;
    setPaymentMethod(value);

  
  };

  const handleCreditCardPayment = (event) => {
    const { name, value } = event.target;
    setPaymentMethod(value);
  }
  
  // pagar com pix sem checkout transparente
  const handlePixPayment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/pixQRcodeStatico/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Adicione aqui o token de acesso, se necessário
          },
        }
      );
      const data = await response.json();
      console.log(data);

      // Redirecionar para a URL de pagamento PIX
      setEncodedImage(data.encodedImage);
      setPixCode(data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  // pagar boleto sem checkout transparente
  const handleBoletoPayment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/boleto/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Adicione aqui o token de acesso, se necessário
          },
        }
      );
      const data = await response.json();
      console.log(data);

      // Redirecionar para a URL de pagamento PIX
      window.location.href = data.bankSlipUrl;
    } catch (error) {
      console.error(error);
    }
  };


  //  pix copia e cola
  const [status, setStatus] = useState("copiar");

  const handleClick = () => {
    setStatus("copiado");
    // Aqui você pode adicionar qualquer lógica adicional que deseja executar quando o botão for clicado
    // Por exemplo, copiar algum texto para a área de transferência
    navigator.clipboard.writeText(pixCode);
  };

  const [formData, setFormData] = useState({
    custumerId: userId, // Usando o userId do usuário logado
    installmentCount: "",
    holderName: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    ccv: "",
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        ...formData,
        installmentCount: formData.pacelas,
      };

      const response = await axios.post(
        `http://localhost:3001/api/creditCardWithoutTokenization/${userId}`,
        formData,
        updatedFormData
      );
      console.log(response.data);
      // Você pode redirecionar o usuário ou realizar outras ações após o envio bem-sucedido
    } catch (error) {
      console.error("Erro ao enviar informações do usuário:", error);
      // Trate erros aqui, como exibir uma mensagem para o usuário
    }
  };

  const [getCart, setGetCart] = useState([]);
  const [getTotal, setGetTotal] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/cart/${userId}/total-price`)
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

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Header />
      <Navbar />

      <div style={{ marginTop: "8rem" }}>
        <h1
          style={{
            fontFamily: "poppins",
            fontWeight: "500",
            fontSize: "1.1rem",
          }}
        >
          Escolha o método de pagamento:
        </h1>
     
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <input
            type="radio"
            id="pix"
            name="paymentMethod"
            value="pix"
            checked={paymentMethod === "pix"}
            onChange={handleChangePixAndBoleto}
          />
          <label
            htmlFor="pix"
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              fontFamily: "poppins",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            <img
              src="https://i.ibb.co/dfvK4s0/icons8-foto-48.png"
              alt=""
              style={{
                maxWidth: "14vw",
              }}
            />{" "}
            PIX
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <input
            type="radio"
            id="boleto"
            name="paymentMethod"
            value="boleto"
            checked={paymentMethod === "boleto"}
            onChange={handleChangePixAndBoleto}
          />
          <label
            htmlFor="boleto"
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              fontFamily: "poppins",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            <img
              src="https://i.ibb.co/LNrSsZt/icons8-boleto-bankario-48.png"
              alt=""
              style={{ maxWidth: "14vw" }}
            />{" "}
            Boleto
          </label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <input
            type="radio"
            id="cartao"
            name="paymentMethod"
            value="cartao"
            checked={paymentMethod === "cartao"}
            onClick={handleCreditCardPayment}
            onChange={handleChange}
          />
          <label
            htmlFor="cartao"
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              fontFamily: "poppins",
              fontWeight: "600",
              fontSize: "1.1rem",
            }}
          >
            {" "}
            <img
              src="https://i.ibb.co/HtWhHR0/icons8-emoji-de-cart-o-de-cr-dito-48.png"
              alt=""
            />{" "}
            Cartão de Crédito
          </label>
        </div>
        <div>
          {paymentMethod === "pix" && (
            <p>
              <button onClick={handlePixPayment}>Pagar com Pix</button>

              <div>
                {encodedImage && <ImageComponent encodedImage={encodedImage} />}
                {encodedImage && (
                  <>
                    <p style={{width:"10vw"}}>{pixCode}</p>
                    <div>
                      <button onClick={handleClick}>
                        {status === "copiar" ? "Copiar" : "Copiado"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </p>
          )}

          {paymentMethod === "boleto" && (
            <p>
              <button onClick={handleBoletoPayment}>Pagar com Boleto</button>
            </p>
          )}
          {paymentMethod === "cartao" && (
            <>
         
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: "poppins",
                  fontWeight: "400",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
                
              >
                <label style={{ display: "flex", flexDirection: "column" }}>
                  nome do titular:
                  <input
                    type="text"
                    name="holderName"
                    onChange={handleChange}
                    value={formData.holderName}
                    
                  />
                </label>

                <label style={{ display: "flex", flexDirection: "column" }}>
                  numero do cartão:
                  <input
                    type="number"
                    name="number"
                    onChange={handleChange}
                    value={formData.number}
                  />
                </label>

                <label style={{ display: "flex", flexDirection: "column" }}>
                  mês de vencimento:
                  <input
                    type="text"
                    name="expiryMonth"
                    onChange={handleChange}
                    value={formData.expiryMonth}
                  />
                </label>

                <label style={{ display: "flex", flexDirection: "column" }}>
                  Ano de vencimento:
                  <input
                    type="text"
                    name="expiryYear"
                    onChange={handleChange}
                    value={formData.expiryYear}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column" }}>
                  CVV:
                  <input
                    type="text"
                    name="ccv"
                    onChange={handleChange}
                    value={formData.ccv}
                  />
                </label>

                <label>Parcelas:</label>
                <select
                  name="pacelas"
                  onChange={handleChange}
                  value={formData.installmentCount} // Definindo o valor do select
                >
                  <option value="1">1 x de {getTotal.totalAmount / 1}</option>
                  <option value="2">2 x de {getTotal.totalAmount / 2}</option>
                  <option value="3">3 x de {getTotal.totalAmount / 3}</option>
                  <option value="4">4 x de {getTotal.totalAmount / 4}</option>
                  <option value="5">5 x de {getTotal.totalAmount / 5}</option>
                  <option value="6">6 x de {getTotal.totalAmount / 6}</option>
                  <option value="7">7 x de {getTotal.totalAmount / 7}</option>
                  <option value="8">8 x de {getTotal.totalAmount / 8}</option>
                  <option value="9">9 x de {getTotal.totalAmount / 9}</option>
                  <option value="10">
                    10 x de {getTotal.totalAmount / 10}
                  </option>
                </select>

                <button type="submit">Finalisar Compra</button>
              </form>
            </>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Pay;
