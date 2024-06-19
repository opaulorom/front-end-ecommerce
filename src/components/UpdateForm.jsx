import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import styles from "./UpdateForm.module.css"
const UpdateForm = () => {
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  const token = Cookies.get('token'); // Obtenha o token do cookie
  const userId = Cookies.get('userId'); // Obtenha o token do cookie
  const [formData, setFormData] = useState({
    userId: userId,
    name: '',
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
  console.log('formData:', formData);

  useEffect(() => {

    const fetchUserData = async () => {
      try {

        const token = Cookies.get('token'); // Obtenha o token do cookie


        const response = await axios.get(`http://localhost:3001/api/custumer/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        });
        const userData = response.data || response.data.customers;

        setFormData((prevFormData) => ({
          ...prevFormData,
          name: userData.name || '',
          cpfCnpj: userData.cpfCnpj || '',
          email: userData.email || '',
          mobilePhone: userData.mobilePhone || '',
          postalCode: userData.postalCode || '',
          address: userData.address || '',
          addressNumber: userData.addressNumber || '',
          complement: userData.complement || '',
          province: userData.province || '',
          city: userData.city || '',
          state: userData.state || '',
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
      const response = await axios.put(`http://localhost:3001/api/update/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      }, formData);

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
        const response = await axios.get(`https://viacep.com.br/ws/${newCep}/json/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,

            },
          });
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
    <>
      <Navbar />








      {loggedIn === true &&

        <form onSubmit={handleSubmit} className={styles.formContainer}>

          <h1  className={styles.dados}>DADOS PESSOAIS</h1>
          <div className={styles.childContainerA}>


            <div className={styles.child}>
              <label className={styles.label}>

                Nome completo:
              </label>

              <input type="text" name="name" className={styles.input} onChange={handleChange} value={formData.name} />
            </div>

            <div className={styles.child}>
              <label className={styles.label}>
                CPF:
              </label>

              <input type="text" name="cpfCnpj" className={styles.input} onChange={handleChange} value={formData.cpfCnpj} />
            </div>

            <div className={styles.child}>
              <label className={styles.label}>

                Email:
              </label>

              <input type="email" name="email" className={styles.input} onChange={handleChange} value={formData.email} />
            </div>

            <div className={styles.child}>
              <label className={styles.label}>

                Telefone:
              </label>

              <input type="text" name="mobilePhone" className={styles.input} onChange={handleChange} value={formData.mobilePhone} />
            </div>

          </div>

          <h1 className={styles.endereco}>ENDEREÇO</h1>
          <div className={styles.childContainerB}>

            <div className={styles.child}>
              <label className={styles.label}>

                CEP:
              </label>

              <input type="text" name="postalCode" className={styles.input} onChange={handleCepChange} value={formData.postalCode} placeholder='digite sem caracteres ex. 01001000  ' />
            </div>

            <div className={styles.child}>
              <label className={styles.label}>

                Endereço:
              </label>

              <input type="text" name="address" className={styles.input} onChange={handleChange} value={formData.address} />
            </div>

            <div className={styles.child}>
              <label className={styles.label}>

                Número do endereço:
              </label>

              <input type="text" name="addressNumber" className={styles.input} onChange={handleChange} value={formData.addressNumber} />
            </div>

            <div className={styles.child}>
              <label className={styles.label}>

                Complemento:
              </label>

              <input type="text" name="complement" className={styles.input} onChange={handleChange} value={formData.complement} />
            </div>

            <div className={styles.child}>
              <label className={styles.label}>

                Bairro:
              </label>

              <input type="text" name="province" className={styles.input} onChange={handleChange} value={formData.province} />
            </div>

            <div className={styles.child}>
              <label className={styles.label}>

                Cidade:
              </label>

              <input type="text" name="city" className={styles.input} onChange={handleChange} value={formData.city} />
            </div>

            <div className={styles.child}>
              <label className={styles.label}>

                Estado:
              </label>

              <input type="text" name="state" className={styles.input} onChange={handleChange} value={formData.state} />
            </div>

            <div>          <button type="submit" className={styles.ButtonDataCustomer}>Salvar</button>
            </div>
          </div>


        </form>}

    </>
  );
};

export default UpdateForm;
