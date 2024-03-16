import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { useUser } from "@clerk/clerk-react";
import Cookies from "js-cookie";
import ImageComponent from "./ImageComponent";
import axios from "axios";

const Pay = () => {
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const { isSignedIn, user, isLoaded } = useUser();
  const userId = Cookies.get("userId"); // Obtenha o token do cookie
  const [encodedImage, setEncodedImage] = useState(null);
  const [pixCode, setPixCode] = useState(null);
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
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

  // pagar boleto com checkout transparente
  const handleBoletoPaymentCustom = async () => {
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

  // pagar com cartao de credito sem checkout transparente
  const handleCartaoDeCreditoPayment = async () => {
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
      window.location.href = data.invoiceUrl;
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
    installmentCount: '',
    holderName: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    ccv: '',
    
  });

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3001/api/creditCardWithoutTokenization/${userId}`, formData);
      console.log(response.data);
      // Você pode redirecionar o usuário ou realizar outras ações após o envio bem-sucedido
    } catch (error) {
      console.error('Erro ao enviar informações do usuário:', error);
      // Trate erros aqui, como exibir uma mensagem para o usuário
    }
  };







  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Header />
      <Navbar />
      <div style={{ marginTop: "8rem" }}>
        <h1>Escolha o método de pagamento:</h1>
        <div>
          <input
            type="radio"
            id="pix"
            name="paymentMethod"
            value="pix"
            checked={paymentMethod === "pix"}
            onChange={handleChange}
          />
          <label htmlFor="pix">PIX</label>
        </div>
        <div>
          <input
            type="radio"
            id="boleto"
            name="paymentMethod"
            value="boleto"
            checked={paymentMethod === "boleto"}
            onChange={handleChange}
          />
          <label htmlFor="boleto">Boleto</label>
        </div>
        <div>
          <input
            type="radio"
            id="cartao"
            name="paymentMethod"
            value="cartao"
            checked={paymentMethod === "cartao"}
            onChange={handleChange}
          />
          <label htmlFor="cartao">Cartão de Crédito</label>
        </div>
        <div>
          {paymentMethod === "pix" && (
            <p>
              <button onClick={handlePixPayment}>Pagar com Pix</button>
              {encodedImage && <ImageComponent encodedImage={encodedImage} />}
              {encodedImage && (
                <>
                  <p>{pixCode}</p>
                  <div>
                    <button onClick={handleClick}>
                      {status === "copiar" ? "Copiar" : "Copiado"}
                    </button>
                  </div>
                </>
              )}
            </p>
          )}
          {paymentMethod === "boleto" && (
            <p>
              <button onClick={handleBoletoPayment}>Pagar com Boleto</button>
            </p>
          )}
          {paymentMethod === "cartao" && (
            <p>
              {" "}
              <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
        <label>
      nome do titular:
        <input type="text" name="holderName" onChange={handleChange} value={formData.holderName} />
      </label>

      <label>
        numero do cartão:
        <input type="number" name="number" onChange={handleChange} value={formData.number} />
      </label>

  
      <label>
      expiryMonth:
        <input type="text" name="expiryMonth" onChange={handleChange} value={formData.expiryMonth} />
      </label>

      <label>
      expiryYear:
        <input type="text" name="expiryYear" onChange={handleChange} value={formData.expiryYear} />
      </label>
      <label>
        CVV:
        <input type="text" name="ccv" onChange={handleChange} value={formData.ccv} />
      </label>
      <label>
      installmentCount:
        <input type="number" name="installmentCount" onChange={handleChange} value={formData.installmentCount} />
      </label>
      
      <label for="cars">Choose a car:</label>
  <select name="pacelas" id="cars">
    <option value="1">1 x de </option>
    <option value="2">2 x de </option>
    <option value="3">3 x de</option>
    <option value="4">4 x de</option>
    <option value="5">5 x de</option>
    <option value="6">6 x de</option>
    <option value="7">7 x de</option>
    <option value="8">8 x de</option>
    <option value="9">9 x de</option>
    <option value="10">10 x de</option>
  </select>
      <button type="submit">Finalisar Compra</button>
    </form>
            </p>
          )}
        </div>


      
      </div>
    </div>
  );
};

export default Pay;
