import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./FreteSelect.module.css";
import { useConfig } from "../context/ConfigContext";
import CircularIndeterminate from "./CircularIndeterminate";
import { useAuth } from "../context/AuthContext";

const FreteSelect = () => {
  const [cep, setCep] = useState(localStorage.getItem("cep") || "");
  const [frete, setFrete] = useState(null);
  const [selectedFreteIndex, setSelectedFreteIndex] = useState(
    localStorage.getItem("selectedFreteIndex") || null
  );
  const [isLoading, setIsLoading] = useState(false); // Estado para o loading
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const { apiUrl } = useConfig();
  const { loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação

  useEffect(() => {
    localStorage.setItem("cep", cep);
  }, [cep]);

  useEffect(() => {
    const fetchFrete = async () => {
      try {
        const responseGet = await axios.get(`${apiUrl}/api/frete/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    setIsLoading(true); // Inicia o loading

    try {
      await axios.post(
        `${apiUrl}/api/frete/${userId}`,
        { cep },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseGet = await axios.get(`${apiUrl}/api/frete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFrete(responseGet.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  };

  return (
    <div>
      {loggedIn === true && (
        <>
          {" "}
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
          {isLoading ? (
            <div className={styles.CircularIndeterminate}>
              <CircularIndeterminate />
              <p>Carregando...</p>
            </div>
          ) : (
            frete && (
              <div className={styles.div}>
                {frete.map((item, index) => (
                  <div key={index} className={styles.freteItemContainer}>
                    <div className={styles.interContainer}>
                      <img
                        src={item.logo}
                        alt="logo das transportadoras"
                        className={
                          item.nomeTransportadora === "Jadlog"
                            ? styles.Jadlog
                            : styles.image
                        }
                      />
                      <p className={styles.p}>{item.nomeTransportadora}</p>
                    </div>

                    <div className={styles.interContainer}>
                      <span className={styles.p}>Data de entrega</span>
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
                      <span className={styles.p}>valor do frete: </span>
                      <p className={styles.price}>R$ {item.valorFrete}</p>
                    </div>
                    <div></div>
                  </div>
                ))}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default FreteSelect;
