import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from "@mui/icons-material/Search";
import Cookies from 'js-cookie';

const FreteComponent = () => {
  const [cep, setCep] = useState(localStorage.getItem('cep') || '');
  const [frete, setFrete] = useState(null);
  const userId = Cookies.get('userId'); // Obtenha o token do cookie
  const credentials = Cookies.get('role'); // Obtenha as credenciais do cookie

  const token = Cookies.get('token'); // Obtenha o token do cookie
  useEffect(() => {
    localStorage.setItem('cep', cep);
  }, [cep]);

  useEffect(() => {
    const fetchFrete = async () => {
      try {
     

        // Faz a solicitação GET para obter os dados atualizados do frete
        const responseGet = await axios.get(`http://localhost:3001/api/frete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Credentials: credentials,
          },
        }
      );
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
      await axios.post(`http://localhost:3001/api/frete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Credentials: credentials,
        },
      }, { cep }
     );

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
    <div style={{marginTop:"2rem", position:"relative"}}>
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
        <input
          type="text"
          value={cep}
          onChange={(event) => setCep(event.target.value)}
          placeholder="Digite o CEP"
          style={{ height: "4vh" }}
        />
        <button type="submit"
         style={{
          backgroundColor: "#5070E3",
          color: "white",
          border: "none",
          padding: ".8rem",
          borderRadius: "5px",
          fontWeight: "500",
          fontFamily: "poppins, sans-serif",
          cursor: "pointer",
          position: "absolute",
          right: "10px",
          width:"8vw", 
          display:"flex",
          alignItems:"center",
          gap:".3rem"
        }}
        
        ><SearchIcon />Salvar</button>
      </form>

      {frete && (
        <div>
          {frete.map((item, index) => (
            <div key={index}>
              <b></b> <img src={item.logo && item.logo} alt="logo das transportadoras" style={{ width: "10vw" }} />

              <p>{item.nomeTransportadora}</p>
              <p>Data Prevista de Entrega: { item.dataPrevistaEntrega && item.dataPrevistaEntrega.split('T')[0].split('-').reverse().join('/')}</p>
              <p>Prazo de Entrega: {item.prazoEntrega && item.prazoEntrega}</p>
              <p>Valor do Frete: R$  {item.valorFrete && item.valorFrete}</p>

            </div>
          ))}
        </div>
      )}
     
    </div>
  );
};

export default FreteComponent;
