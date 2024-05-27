import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileDetails from './ProfileDetails';
import "./LoginForm.css"
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { loggedIn, isCustomer, login, remainingAttempts } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleLogin = () => {
    if (validateForm()) {
      login(email, password);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Campo obrigatório';
    }

    if (!password.trim()) {
      errors.password = 'Campo obrigatório';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  if (loggedIn) {
    return (
      <div className='logout-container'>
        {isCustomer ? <ProfileDetails /> : null}
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className='loginStyle'>
          <h1>Login</h1>
          {remainingAttempts && <div>
            Tentativas restantes: {remainingAttempts !== undefined ? remainingAttempts : 'N/A'}
          </div>}
          <div className='loginStyle__inputLabel'>

            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Digite o email..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormErrors((prevErrors) => ({ ...prevErrors, email: '' }));
              }}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className='error-message'>{formErrors.email}</span>}
            <br />
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              placeholder="Digite a senha..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFormErrors((prevErrors) => ({ ...prevErrors, password: '' }));
              }}
              className={formErrors.password ? 'error' : ''}
            />
    

            <div className='loginStyle__button'>

              {formErrors.password && <span className='error-message'>{formErrors.password}</span>}
          
              <button className="loginButton" onClick={handleLogin}>
                Login
              </button>
              <div>
                Ainda nao tem uma conta  <Link to={"/register"}>Cadastre-se</Link><br />
                Esqueceu a senha   <Link to={"/forgotPassword"}>clique aqui</Link>

              </div>
            </div>
          </div>




        </div>

      </div>




    </>
  );
};

export default LoginForm;