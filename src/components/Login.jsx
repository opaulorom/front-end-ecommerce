import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      // Fazer a chamada para o backend para iniciar o processo de login com o Google
      const response = await axios.get('http://localhost:3001/auth/google');
      console.log(response.data);

      // Redirecionar para a página de perfil após o login bem-sucedido
      navigate('/perfil');
    } catch (error) {
      console.error('Erro no login:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Login com Google</button>
    </div>
  );
};

export default Login;
