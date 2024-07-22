import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./FreteSelect.module.css";

const FreteSelect = () => {
  const [cep, setCep] = useState(localStorage.getItem("cep") || "");
  const [frete, setFrete] = useState(null);
  const [selectedFreteIndex, setSelectedFreteIndex] = useState(
    localStorage.getItem("selectedFreteIndex") || null
  );
  const token = Cookies.get("token"); // Obtenha o token do cookie

  const userId = Cookies.get("userId");

  useEffect(() => {
    localStorage.setItem("cep", cep);
  }, [cep]);

  useEffect(() => {
    const fetchFrete = async () => {
      try {
        const responseGet = await axios.get(
          `http://localhost:3001/api/frete/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFrete(responseGet.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFrete();
  }, [cep, userId]);

  useEffect(() => {
    if (frete && frete.length > 0) {
      setSelectedFreteIndex(
        +localStorage.getItem("selectedFreteIndex") || null
      );
    }
  }, [frete]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Faz a solicitação POST para obter os dados do frete com o novo CEP
      await axios.post(
        `http://localhost:3001/api/frete/${userId}`,
        { cep },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Adicionando content-type
          },
        }
      );

      // Atualiza o estado do frete com os dados do frete da requisição GET
      const responseGet = await axios.get(
        `http://localhost:3001/api/frete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("log", userId);
      setFrete(responseGet.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form className={styles.formContainer}>
        <input
          type="text"
          value={cep}
          onChange={(event) => setCep(event.target.value)}
          placeholder="Digite pra pesquisar um cep."
          className={styles.formContainer__input}
        />

        <button
          type="submit"
          className={styles.formContainer__button}
          onClick={handleSubmit}
        >
          <SearchIcon /> Buscar
        </button>
      </form>

      {frete && (
        <div >
          {frete.map((item, index) => (
            <div key={index} className={styles.freteItemContainer}>
              <div className={styles.interContainer}>
                <img
                  src={item.logo}
                  alt="logo das transportadoras"
            
                  className={item.nomeTransportadora === 'Jadlog'?  styles.Jadlog : styles.image}
                />
                <p className={styles.p}>{item.nomeTransportadora}</p>
              </div>

              <div className={styles.interContainer}>
                <span>Data de entrega</span>
                <p className={styles.p}>
                  {item.dataPrevistaEntrega
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}{" "}
                  ({item.prazoEntrega} dias)
                </p>
              </div>

              <div className={styles.interContainer}>
                <span>valor do frete: </span>
                <p className={styles.p}>R$ {item.valorFrete}</p>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreteSelect;
