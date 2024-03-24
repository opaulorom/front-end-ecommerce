import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Cookies from 'js-cookie';

const FreteComponent = () => {
  const [cep, setCep] = useState(localStorage.getItem('cep') || '');
  const [frete, setFrete] = useState(null);
  const userId = Cookies.get('userId'); // Obtenha o token do cookie

  useEffect(() => {
    localStorage.setItem('cep', cep);
  }, [cep]);

  useEffect(() => {
    const fetchFrete = async () => {
      try {
     

        // Faz a solicitação GET para obter os dados atualizados do frete
        const responseGet = await axios.get(`http://localhost:3001/api/frete/${userId}`);
        setFrete(responseGet.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFrete();
  }, [cep, userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      // Faz a solicitação POST para obter os dados do frete com o novo CEP
      await axios.post(`http://localhost:3001/api/frete/${userId}`, { cep });

      // Atualiza o estado do frete com os dados do frete da requisição GET
      const responseGet = await axios.get(`http://localhost:3001/api/frete/${userId}`);
      console.log('log', userId)
      setFrete(responseGet.data);
      await axios.get(`http://localhost:3001/api/cart/${userId}/total-price`);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{marginTop:"2rem"}}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cep}
          onChange={(event) => setCep(event.target.value)}
          placeholder="Digite o CEP"
        />
        <button type="submit">Salvar</button>
      </form>

      {frete && (
        <div>
          {frete.map((item, index) => (
            <div key={index}>
              <b></b> <img src={item.logo} alt="logo das transportadoras" style={{ width: "10vw" }} />

              <p>{item.nomeTransportadora}</p>
              <p>Data Prevista de Entrega: {item.dataPrevistaEntrega.split('T')[0].split('-').reverse().join('/')}</p>
              <p>Prazo de Entrega: {item.prazoEntrega}</p>
              <p>Valor do Frete: R$  {item.valorFrete}</p>

            </div>
          ))}
        </div>
      )}
     
    </div>
  );
};

export default FreteComponent;
