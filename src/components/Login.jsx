import React, { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // Verifica se o usuário está bloqueado
    if (remainingAttempts === 0) {
      setIsBlocked(true);
    } else {
      setIsBlocked(false);
    }
  }, [remainingAttempts]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/loginCustumer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts);
        }
        setErrorMessage(data.error);
      } else {
        // Login bem-sucedido, redirecionar ou executar ação necessária
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <h2 >Login</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {isBlocked && (
        <div className="blocked-message">
          Você foi bloqueado. Tente novamente em 30 minutos.
        </div>
      )}
      {!isBlocked && (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {remainingAttempts !== null && (
            <div className="remaining-attempts">
              Tentativas restantes: {remainingAttempts}
            </div>
          )}
          <button type="submit">Entrar</button>
        </form>
      )}
    </div>
  );
};

export default Login;
