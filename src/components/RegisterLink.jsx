import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";

const RegisterLink = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, role: "customer" };
      await axios.post("http://localhost:3001/register/request", newUser);
      // Limpar o formulário após o envio bem-sucedido
      setEmail("");
      setPassword("");
      setError("");
      alert("Link enviado com sucesso!");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
    <Header/>
    <Navbar/>
    
    <div style={{marginTop:"15rem"}}>
      <h2>Enviar link (Customer)</h2>
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
    
        <button type="submit">enviar</button>
      </form>
    </div>
    </>
  );
};

export default RegisterLink;
