import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post('/api/v1/reset-password', { token, newPassword, confirmPassword });
      alert(response.data.message);
      // Redireciona para a página de login após redefinir a senha com sucesso
      window.location.href = '/login';
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Redefinir Senha</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">Nova Senha:</label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Redefinir Senha</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
