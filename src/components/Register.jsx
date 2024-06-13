
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
function RegisterUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(null)
  const [containsSpecialCharacter, setContainsSpecialCharacter] = useState(false);
  const [containsNumber, setContainsNumber] = useState(false);
  const [containsCapitalLetter, setContainsCapitalLetter] = useState(false);
  const [containsLowerCase, setContainsLowerCase] = useState(false);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  useEffect(() => {
    // O token agora está disponível aqui, você pode usá-lo como desejar
    console.log(token);
  }, [token]);

  useEffect(() => {
    // Verifica se todos os critérios estão atendidos
    if (containsSpecialCharacter && containsNumber && containsCapitalLetter && containsLowerCase) {
      setIsAddButtonDisabled(false);
    } else {
      setIsAddButtonDisabled(true);
    }
  }, [containsSpecialCharacter, containsNumber, containsCapitalLetter, containsLowerCase]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword)
    // Verifica se há algum caractere especial na senha
    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
    setContainsSpecialCharacter(specialCharacterPattern.test(newPassword));

    const OneNumber = /[0-9]/;
    setContainsNumber(OneNumber.test(newPassword));


    const OneCapitalLetter = /[A-Z]/;
    setContainsCapitalLetter(OneCapitalLetter.test(newPassword))

    const OneLowerCase = /[a-z]/;
    setContainsLowerCase(OneLowerCase.test(newPassword))
  }

  const role = 'customer'; // Definindo o papel (role) como 'customer' por padrão


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/register/${token}`, { email, password, role });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>

      <Header />
      <Navbar />
      <div style={{ marginTop: "15rem" }}>

        <h2>Register User</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {error && <p>{error}</p>}

          <div style={{
            display: "flex",
            flexDirection: "column",
            width: "20vw"
          }}>
            <label>Password:</label>
            <div style={{
              position: "relative"
            }}>
              <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange}
                required />
              <div onClick={() => setShowPassword(!showPassword)} style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer"

              }}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</div>
            </div>
          </div>


          <div style={{
            display: "flex",
            flexDirection: "column"
          }}>
            <h4>Sua senha precisa conter
            </h4>
            <span style={{ color: containsSpecialCharacter ? 'green' : 'black' }}> {containsSpecialCharacter ? <CheckIcon /> : <CloseIcon style={{ color: "#ee0d1f" }} />} 1 caractere especial</span>
            <span style={{ color: containsCapitalLetter ? 'green' : 'black' }}>
              <CheckIcon />  1 letra maiúscula
            </span>
            <span style={{ color: containsLowerCase ? 'green' : 'black' }}><CheckIcon /> 1 letra minúscula</span>
            <span style={{ color: containsNumber ? 'green' : 'black' }}><CheckIcon /> 1 número           </span>
          </div>
          <button type="submit" style={{
            backgroundColor: isAddButtonDisabled ? "#ccc" : "#14337C",
          }} disabled={isAddButtonDisabled}
          >Register</button>
        </form>
      </div>
    </>
  );
}

export default RegisterUser;
