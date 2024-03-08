import React, { useState } from "react";
import axios from "axios";

const RegisterCustomerForm = ({ match }) => { // Adicionando match para acessar os parâmetros da URL
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, role: "customer" };
      const token = match.params.token;
      await axios.post(`http://localhost:3001/register/${token}`, newUser);
      setEmail("");
      setPassword("");
      setError("");
      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error); // Usar err.response.data.error se disponível
      } else {
        setError("Erro desconhecido ao cadastrar usuário"); // Se não houver resposta ou dados disponíveis
      }
    }
  };
  

  return (
    <div>
      <h2>Cadastrar Usuário (Customer)</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default RegisterCustomerForm;
