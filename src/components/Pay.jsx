import React, { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import FreteSelect from "./FreteSelect";
const Pay = () => {
  const [paymentMethod, setPaymentMethod] = useState('pix');

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  
  return (
    <div>
      <Header />
      <Navbar />
      <div style={{marginTop:"15rem"}}>
        <FreteSelect/>
      </div>
      <div>
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
        {paymentMethod === 'pix' && <p>Conteúdo para PIX</p>}
        {paymentMethod === 'boleto' && <p>Conteúdo para Boleto</p>}
        {paymentMethod === 'cartao' && <p>Conteúdo para Cartão de Crédito</p>}
      </div>
    </div>
    </div>
  );
};

export default Pay;
