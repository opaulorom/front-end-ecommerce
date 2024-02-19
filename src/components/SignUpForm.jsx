import React, { useEffect, useState } from 'react';
import { useClerk } from "@clerk/clerk-react";
import axios from 'axios';

const SignUpForm = () => {
  const clerk = useClerk();

  const [formData, setFormData] = useState({
    userId: clerk.user?.id || '', // Obter o userId do usuário logado
    firstname: clerk.user?.firstName || '',
    lastname: clerk.user?.lastName || '',
    email: clerk.user?.emailAddresses || '',
    telephone: '',
    postcode: '',
    address_street: '',
    address_street_number: '',
    address_street_complement: '',
    address_street_district: '',
    address_city: '',
    address_state: '',
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
        clerkUserId: clerk.user.id, // Adicione o clerkUserId aqui
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
        address_state,
        // Adicione os outros campos do formulário aqui
      });
      useEffect(() => {
        // Atualizar o estado do formulário com o e-mail do usuário logado
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: clerk.user?.emailAddress || '',
        }));
      }, [clerk.user]);
    
    
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
        Postcode:
        <input type="text" name="postcode" onChange={handleChange} value={formData.postcode} />
      </label>

      <label>
        Address Street:
        <input type="text" name="address_street" onChange={handleChange} value={formData.address_street} />
      </label>

      <label>
        Address Street Number:
        <input type="text" name="address_street_number" onChange={handleChange} value={formData.address_street_number} />
      </label>

      <label>
        Address Street Complement:
        <input type="text" name="address_street_complement" onChange={handleChange} value={formData.address_street_complement} />
      </label>

      <label>
        Address Street District:
        <input type="text" name="address_street_district" onChange={handleChange} value={formData.address_street_district} />
      </label>

      <label>
        Address City:
        <input type="text" name="address_city" onChange={handleChange} value={formData.address_city} />
      </label>

      <label>
        Address State:
        <input type="text" name="address_state" onChange={handleChange} value={formData.address_state} />
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUpForm;
