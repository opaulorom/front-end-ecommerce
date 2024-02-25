import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const Frete = () => {
  const [getFrete, setGetFrete] = useState([]);
  const [showForm, setShowForm] = useState(true); // Novo estado para controlar a exibição do formulário
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const clerkUserId = user.id;
      axios
        .get(`http://localhost:3001/api/frete/${clerkUserId}`)
        .then((response) => {
          setGetFrete(response.data);
          console.log("data", data);
        })
        .catch((error) => {
          console.log("Erro ao visualizar frete.", error);
        });
    }
  }, [isLoaded, isSignedIn, user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const cep = formData.get("cep");
    const clerkUserId = user.id;

    axios
      .post(`http://localhost:3001/api/frete/${clerkUserId}`, { cep })
      .then((response) => {
        setGetFrete(response.data);
        setShowForm(false); // Esconde o formulário após a pesquisa
      })
      .catch((error) => {
        console.log("Erro ao calcular frete.", error);
      });
  };

  const handleTrocarFrete = () => {
    setShowForm(true); // Mostra o formulário novamente
    setGetFrete([]); // Limpa os resultados do frete
  };

  return (
    <div>
      {showForm ? (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="">CEP</label>
          <div>
            <input type="text" name="cep" placeholder="pesquisar frete" />
            <button type="submit">Calcular frete</button>
          </div>
        </form>
      ) : (
        <>
          <button onClick={handleTrocarFrete}>Trocar frete</button>
          {getFrete.map((frete) => (
            <div key={frete._id} style={{ marginTop: "2rem", marginLeft: "1rem" }}>
              <b>valor:</b> {frete.valorFrete}
              <b>praso:</b> {frete.prazoEntrega}
              <b>data:</b> {frete.dataPrevistaEntrega}
              <b> tipo:</b> {frete.nomeTransportadora}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Frete;
