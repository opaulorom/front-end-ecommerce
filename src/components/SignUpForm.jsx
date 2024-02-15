import React, { useState } from 'react';
import { useClerk } from "@clerk/clerk-react";
import axios from 'axios';

const SignUpForm = () => {
  const clerk = useClerk();

  const [formData, setFormData] = useState({
    clerkUserId: clerk.user?.id || '', // Obter o clerkUserId do usuário logado
    firstname: '',
    lastname: '',
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { firstname, lastname, email, telephone, postcode, address_street, address_street_number, address_street_complement, address_street_district, address_city, address_state } = formData;
  
    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        firstname,
        lastname,
        email,
        telephone,
        postcode,
        address_street,
        address_street_number,
        address_street_complement,
        address_street_district,
        address_city,
        address_state
      });
  
      console.log(response.data.message);
      // Você pode redirecionar o usuário ou realizar outras ações após o envio bem-sucedido
    } catch (error) {
      console.error('Erro ao enviar informações do usuário:', error);
      // Trate erros aqui, como exibir uma mensagem para o usuário
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstname" onChange={handleChange} value={formData.firstname} />
      </label>

      <label>
        Last Name:
        <input type="text" name="lastname" onChange={handleChange} value={formData.lastname} />
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUpForm;
