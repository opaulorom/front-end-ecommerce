import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";

const FreteSelect = () => {
  const [cep, setCep] = useState(localStorage.getItem('cep') || '');
  const [frete, setFrete] = useState(null);
  const [selectedFrete, setSelectedFrete] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    localStorage.setItem('cep', cep);
  }, [cep]);

  useEffect(() => {
    const fetchFrete = async () => {
      try {
        const clerkUserId = user.id;

        // Faz a solicitação GET para obter os dados atualizados do frete
        const responseGet = await axios.get(`http://localhost:3001/api/frete/${clerkUserId}`);
        setFrete(responseGet.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFrete();
  }, [cep, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const clerkUserId = user.id;

      // Faz a solicitação POST para obter os dados do frete com o novo CEP
      await axios.post(`http://localhost:3001/api/frete/${clerkUserId}`, { cep });

      // Atualiza o estado do frete com os dados do frete da requisição GET
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
              <input
                type="radio"
                name="selectedFrete"
                value={index}
                checked={selectedFrete === index}
                onChange={() => setSelectedFrete(index)}
              />
              <div>
              <img src={item.logo} alt="logo das transportadoras" style={{ width: "10vw" }} />

              <p>Nome da Transportadora: {item.nomeTransportadora}</p>
              <p>Data Prevista de Entrega: {item.dataPrevistaEntrega.split('T')[0].split('-').reverse().join('/')}</p>
              <p>Prazo de Entrega: {item.prazoEntrega}</p>
              <p>Valor do Frete: {item.valorFrete}</p>

              </div>


            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreteSelect;
