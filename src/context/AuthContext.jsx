import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false); // Renomeado para isCustomer
  const [userId, setUserId] = useState(null); // Adicionado userId

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedRole = Cookies.get('role');
    const storedUserId = Cookies.get('userId'); // Obtendo o ID do usuário
    setLoggedIn(Boolean(storedToken));
    setIsCustomer(storedRole === 'customer');
    setUserId(storedUserId); // Definindo o ID do usuário
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      const { role, _id } = user;

      setLoggedIn(true);
      setIsCustomer(role === 'customer');
      setUserId(_id); // Definindo o ID do usuário após o login
      Cookies.set('token', token);
      Cookies.set('role', role);
      Cookies.set('userId', _id); // Salvando o ID do usuário nos cookies
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Erro, email ou senha inválidos!', { position: toast.POSITION.TOP_CENTER });
      } else {
        console.error('Erro na solicitação de login', error);
      }
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('userId'); // Removendo o ID do usuário dos cookies ao fazer logout
    setLoggedIn(false);
    setIsCustomer(false);
    setUserId(null); // Resetando o ID do usuário ao fazer logout
  };

  const values = {
    loggedIn,
    isCustomer,
    userId, // Incluindo userId nos valores do contexto
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
