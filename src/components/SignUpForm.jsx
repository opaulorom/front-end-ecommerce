import React, { useEffect, useState } from 'react';
import { useClerk } from "@clerk/clerk-react";
import axios from 'axios';

const SignUpForm = () => {
  const clerk = useClerk();

  const [formData, setFormData] = useState({
    userId: clerk.user?.id || '', // Obter o userId do usuário logado
    name: clerk.user?.firstName.lastName  || '',
    cpfCnpj: '',
    email: clerk.user?.emailAddresses || '',
    telephone: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    complement: '',
    province: '',
    city: '',
    state: '',
  });




 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const {    
       name,
      cpfCnpj,
      mobilePhone,
      email,
      postalCode,
      address,
      addressNumber,
      complement,
      province,
      city,
      state, } = formData;
  
    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        clerkUserId: clerk.user.id, // Adicione o clerkUserId aqui
        name,
        cpfCnpj,
        mobilePhone,
        email,
        postalCode,
        address,
        addressNumber,
        complement,
        province,
        city,
        state,
        
        // Adicione os outros campos do formulário aqui
      });
      useEffect(() => {
        // Atualizar o estado do formulário com o e-mail do usuário logado
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: clerk.user?.emailAddresses	 || '',
        }));
      }, [clerk.user]);
    
    
      console.log(response.data);
      // Você pode redirecionar o usuário ou realizar outras ações após o envio bem-sucedido
    } catch (error) {
      console.error('Erro ao enviar informações do usuário:', error);
      // Trate erros aqui, como exibir uma mensagem para o usuário
    }
  };





  const handleCepChange = async (event) => {
    const newCep = event.target.value;
    setFormData({ ...formData, postalCode: newCep });

    if (newCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${newCep}/json/`);
        const data = response.data;

        setFormData((prevFormData) => ({
          ...prevFormData,
          address: data.logradouro,
          complement: data.complemento,
          province: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
        // Trate erros aqui, como exibir uma mensagem para o usuário
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        nome completo:
        <input type="text" name="name" onChange={handleChange} value={formData.name} />
      </label>

      <label>
      cpf:
        <input type="number" name="cpfCnpj" onChange={handleChange} value={formData.cpfCnpj} />
      </label>

      <label>
        Email:
        <input type="email" name="email" onChange={handleChange} value={formData.email} />
      </label>

      <label>
        Telephone:
        <input type="text" name="mobilePhone" onChange={handleChange} value={formData.mobilePhone} />
      </label>

      <label>
        Postcode:
        <input type="text" name="postalCode" onChange={handleCepChange} value={formData.postalCode}  placeholder='digite sem caracteres ex. 01001000  '/>
      </label>

      <label>
        Address:
        <input type="text" name="address" onChange={handleChange} value={formData.address} />
      </label>

      <label>
        Address  Number:
        <input type="text" name="addressNumber" onChange={handleChange} value={formData.addressNumber} />
      </label>

      <label>
        Complement:
        <input type="text" name="complement" onChange={handleChange} value={formData.complement} />
      </label>

      <label>
        province:
        <input type="text" name="province" onChange={handleChange} value={formData.province} />
      </label>

      <label>
        Address City:
        <input type="text" name="city" onChange={handleChange} value={formData.city} />
      </label>

      <label>
        Address State:
        <input type="text" name="state" onChange={handleChange} value={formData.state} />
      </label>
      
     
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUpForm;
