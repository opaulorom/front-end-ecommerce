import React, { useState } from 'react';
import { useClerk } from "@clerk/clerk-react";
import axios from 'axios';

const SignUpForm = () => {
  const clerk = useClerk();

  const [formData, setFormData] = useState({
    clerkUserId: clerk.user?.id || '', // Obter o clerkUserId do usuário logado
    firstname: clerk.user?.firstName || '',
    lastname: clerk.user?.lastName || '',
    email: clerk.user?.emailAddress || '',
    
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
        
        // Adicione os outros campos do formulário aqui
      });
  
      console.log(response.data);
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

      <label>
        Email:
        <input type="email" name="email" onChange={handleChange} value={formData.email} />
      </label>
      <label>
      Telephone:
        <input type="text" name="telephone" onChange={handleChange} value={formData.telephone} />
      </label>
      <label>
      postcode:
        <input type="text" name="postcode" onChange={handleChange} value={formData.postcode} />
      </label>
      <label>
      address_street:
        <input type="text" name="address_street" onChange={handleChange} value={formData.address_street} />
      </label>
      <label>
      address_street_number:
        <input type="text" name="address_street_number" onChange={handleChange} value={formData.address_street_number} />
      </label>
      <label>
      address_street_complement:
        <input type="text" name="address_street_complement" onChange={handleChange} value={formData.address_street_complement} />
      </label>
      <label>
      address_street_district:
        <input type="text" name="address_street_district" onChange={handleChange} value={formData.address_street_district} />
      </label>
      <label>
      address_city:
        <input type="text" name="address_city" onChange={handleChange} value={formData.address_city} />
      </label>
      <label>
      address_state:
        <input type="text" name="address_state" onChange={handleChange} value={formData.address_state} />
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUpForm;
