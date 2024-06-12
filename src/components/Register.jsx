
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function RegisterUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(null)
  useEffect(() => {
    // O token agora está disponível aqui, você pode usá-lo como desejar
    console.log(token);
  }, [token]);

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
    
    <Header/>
      <Navbar/>
    <div style={{marginTop:"15rem"}}>
      
      <h2>Register User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        {error && <p>{error}</p>}

       <div style={{
        display:"flex",
        flexDirection:"column",
        width:"20vw"
       }}>
       <label>Password:</label>
       <div style={{
        position:"relative"
       }}>
       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
       <div onClick={() => setShowPassword(!showPassword)} style={{
        position:"absolute",
        right:"10px",
        top:"50%",
        transform:"translateY(-50%)",
        cursor:"pointer"

       }}>{showPassword ? <VisibilityIcon/>: <VisibilityOffIcon/>}</div>
       </div>
       </div>
       
    
        <button type="submit">Register</button>
      </form>
    </div>
    </>
  );
}

export default RegisterUser;
