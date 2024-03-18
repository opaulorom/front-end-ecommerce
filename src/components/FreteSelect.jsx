import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const FreteSelect = ({ setTotalAmount }) => {
  const [cep, setCep] = useState(localStorage.getItem('cep') || '');
  const [frete, setFrete] = useState(null);
  const [selectedFreteIndex, setSelectedFreteIndex] = useState(localStorage.getItem('selectedFreteIndex') || 0); // Define o primeiro frete como padrão

  const userId = Cookies.get('userId'); // Obtenha o token do cookie

  useEffect(() => {
    localStorage.setItem('cep', cep);
  }, [cep]);

  useEffect(() => {
    const fetchFrete = async () => {
      try {


        // Faz a solicitação GET para obter os dados atualizados do frete
        const responseGet = await axios.get(`http://localhost:3001/api/frete/${userId}`);
        console.log('log', userId)
        setFrete(responseGet.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFrete();
  }, [cep, userId]);

  useEffect(() => {
    // Atualiza o estado do frete selecionado para o índice do primeiro frete
    if (frete && frete.length > 0) {
      setSelectedFreteIndex(+localStorage.getItem('selectedFreteIndex') || 0);
    }
  }, [frete]);
  
  const handleRadioClick = async (index) => {
    try {

      const freteId = frete[index]._id;
  
      // Faz a solicitação PUT para atualizar o valor do frete no carrinho do cliente
      await axios.put(`http://localhost:3001/api/cart/${userId}/shippingFee/${freteId}`);
  
      // Atualiza o estado do frete selecionado
      setSelectedFreteIndex(index);
      localStorage.setItem('selectedFreteIndex', index);
    } catch (error) {
      console.error('Error updating shipping fee:', error);
    }
  };
  
  return (
    <div>
      <form>
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
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <input
                  type="radio"
                
                  name="selectedFrete"
                  value={index}
                  onClick={() => handleRadioClick(index)}
                  checked={selectedFreteIndex === index}
                />
                <img src={item.logo} alt="logo das transportadoras" style={{ width: "10vw" }} />
                <p>{item.nomeTransportadora}</p>
                <p> {item.dataPrevistaEntrega.split('T')[0].split('-').reverse().join('/')}</p>
                <p> {item.prazoEntrega}</p>
                <p> {item.valorFrete}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreteSelect;
