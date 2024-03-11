import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

const UpdateForm = () => {
  const userId = Cookies.get('userId'); // Obtenha o token do cookie

  const [formData, setFormData] = useState({
    userId: userId,
    name:  '',
    cpfCnpj: '',
    email: '',
    mobilePhone: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    complement: '',
    province: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/custumer/${userId}`);
        const userData = response.data;

        setFormData((prevFormData) => ({
          ...prevFormData,
          name: userData.name,
          cpfCnpj: userData.cpfCnpj,
          email: userData.email,
          mobilePhone: userData.mobilePhone,
          postalCode: userData.postalCode,
          address: userData.address,
          addressNumber: userData.addressNumber,
          complement: userData.complement,
          province: userData.province,
          city: userData.city,
          state: userData.state,
        }));
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(`http://localhost:3001/api/update/${userId}`, formData);
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
    <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
      <label>
        Nome completo:
        <input type="text" name="name" onChange={handleChange} value={formData.name} />
      </label>

      <label>
        CPF:
        <input type="text" name="cpfCnpj" onChange={handleChange} value={formData.cpfCnpj} />
      </label>

      <label>
        Email:
        <input type="email" name="email" onChange={handleChange} value={formData.email} />
      </label>

      <label>
        Telefone:
        <input type="text" name="mobilePhone" onChange={handleChange} value={formData.mobilePhone} />
      </label>

      <label>
        CEP:
        <input type="text" name="postalCode" onChange={handleCepChange} value={formData.postalCode}  placeholder='digite sem caracteres ex. 01001000  '/>
      </label>

      <label>
        Endereço:
        <input type="text" name="address" onChange={handleChange} value={formData.address} />
      </label>

      <label>
        Número do endereço:
        <input type="text" name="addressNumber" onChange={handleChange} value={formData.addressNumber} />
      </label>

      <label>
        Complemento:
        <input type="text" name="complement" onChange={handleChange} value={formData.complement} />
      </label>

      <label>
        Bairro:
        <input type="text" name="province" onChange={handleChange} value={formData.province} />
      </label>

      <label>
        Cidade:
        <input type="text" name="city" onChange={handleChange} value={formData.city} />
      </label>

      <label>
        Estado:
        <input type="text" name="state" onChange={handleChange} value={formData.state} />
      </label>
      
      <button type="submit">Atualizar</button>
    </form>
  );
};

export default UpdateForm;
