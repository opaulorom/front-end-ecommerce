import React, { useState } from "react";
import axios from "axios";

const RegisterCustomerForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, role: "customer" };
      await axios.post("http://localhost:3001/user", newUser);
      // Limpar o formulário após o envio bem-sucedido
      setEmail("");
      setPassword("");
      setError("");
      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      setError(err.response.data.message);
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
