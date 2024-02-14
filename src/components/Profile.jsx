import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fazer uma chamada ao backend para obter os dados do usuário após o login bem-sucedido
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao obter perfil do usuário:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h1>Perfil do Usuário</h1>
          <p>Bem-vindo, {user.displayName}!</p>
          {/* Adicione aqui mais informações do perfil que deseja exibir */}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Profile;
