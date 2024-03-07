import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; // Importe o hook useAuth do contexto de autenticação

const GoogleLoginButton = () => {
  const { login } = useAuth(); // Obtenha a função de login do contexto de autenticação
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    try {
      // Redireciona o usuário para a rota de autenticação do Google no backend
      window.location.href = 'http://localhost:3001/auth/google';
    } catch (error) {
      console.error('Erro ao autenticar com o Google:', error);
    }
  };

  useEffect(() => {
    // Verifique se há um código de autorização no URL após o redirecionamento do Google
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Se houver um código de autorização, faça uma solicitação para o backend para processar o login com o Google
      axios.get(`http://localhost:3001/auth/google/callback?code=${code}`)
        .then(response => {
          // Se o login for bem-sucedido, atualize o estado de autenticação
          const { token, user } = response.data;
          login(token, user); // Chame a função de login do contexto de autenticação
          navigate('/profile'); // Redirecione para a página de perfil
        })
        .catch(error => {
          console.error('Erro ao processar o login com o Google:', error);
        });
    }
  }, [login, navigate]);

  return (
    <button onClick={handleLoginWithGoogle}>
      Login com o Google
    </button>
  );
};

export default GoogleLoginButton;
