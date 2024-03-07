import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Extrai o token da URL

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Verifica se o token está presente na URL
    if (!token) {
      setMessage('Token inválido.');
    }
  }, [token]);

  const handleResetPassword = async () => {
    try {alert
      // Verificar se as senhas coincidem
      if (newPassword !== confirmPassword) {
        setMessage('As senhas não coincidem.');
        return;
      }

      // Enviar a solicitação para redefinir a senha
      const response = await axios.post('http://localhost:3001/reset-password/:token', {
        token,
        newPassword,
        confirmPassword,
      });

      // Exibir a mensagem de sucesso
      setMessage(response.data.message);
    } catch (error) {
      // Exibir mensagens de erro
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Redefinir Senha</h2>
      <div>
        <label>Nova Senha:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirmar Senha:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleResetPassword}>Redefinir Senha</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
