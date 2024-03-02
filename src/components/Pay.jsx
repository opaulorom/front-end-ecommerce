import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import FreteSelect from "./FreteSelect";

const Pay = () => {
  const [paymentMethod, setPaymentMethod] = useState('pix');

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePixPayment = async () => {
    try {
      const clerkUserId = 'user_2d3LzruiZ0VvbjKQYij4QIFh5pv';
      const response = await fetch(`http://localhost:3001/api/pix/user_2d3LzruiZ0VvbjKQYij4QIFh5pv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Adicione aqui o token de acesso, se necessário
        },
      });
      const data = await response.json();
      console.log(data);
  
      // Redirecionar para a URL de pagamento PIX
      window.location.href = data.invoiceUrl;
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            checked={paymentMethod === 'pix'}
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
            checked={paymentMethod === 'boleto'}
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
            checked={paymentMethod === 'cartao'}
            onChange={handleChange}
          />
          <label htmlFor="cartao">Cartão de Crédito</label>
        </div>
        <div>
          {paymentMethod === 'pix' && <p><button onClick={handlePixPayment}>Pagar com Pix</button></p>}
          {paymentMethod === 'boleto' && <p>Conteúdo para Boleto</p>}
          {paymentMethod === 'cartao' && <p>Conteúdo para Cartão de Crédito</p>}
        </div>
      </div>
    </div>
  );
};

export default Pay;
