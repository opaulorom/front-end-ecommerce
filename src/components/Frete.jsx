import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";
const FreteComponent = () => {
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(null);
  const {  user } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const clerkUserId = user.id;

      // Faz a solicitação POST para obter os dados do frete com o novo CEP
      const responsePost = await axios.post(`http://localhost:3001/api/frete/${clerkUserId}`, { cep });
      setFrete(responsePost.data);

      // Faz a solicitação GET para obter os dados atualizados do frete
      const responseGet = await axios.get(`http://localhost:3001/api/frete/${clerkUserId}`);
      setFrete(responseGet.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={cep}
          onChange={(event) => setCep(event.target.value)}
          placeholder="Digite o CEP"
        />
        <button type="submit">Buscar</button>
      </form>

      {frete && (
        <div>
          {frete.map((item, index) => (
            <div key={index}>
              <p>Nome da Transportadora: {item.nomeTransportadora}</p>
              <p>Data Prevista de Entrega: {item.dataPrevistaEntrega}</p>
              <p>Prazo de Entrega: {item.prazoEntrega}</p>
              <p>Valor do Frete: {item.valorFrete}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreteComponent;
