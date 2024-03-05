// LoginForm.js
import { useAuth } from '@clerk/clerk-react';
import React, { useState } from 'react';

const LoginForm = () => {
  const { login } = useAuth(); // Usando o hook useAuth para acessar o contexto de autenticação
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password); // Chamando a função login do contexto de autenticação
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
