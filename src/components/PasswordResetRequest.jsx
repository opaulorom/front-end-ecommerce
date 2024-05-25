import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
    <Header/>
      <Navbar/>
    <div style={{marginTop:"15rem"}}>
   
  
      <h2>Solicitar Redefinição de Senha</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <button type="submit">Enviar Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </>
  );
};

export default PasswordResetRequest;
