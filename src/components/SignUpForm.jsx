import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUpForm = () => {
  const userId = Cookies.get("userId"); // Obtenha o token do cookie
  const [showCEP, setShowCEP] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  const [formData, setFormData] = useState({
    custumerId: userId, // Usando o userId do usuário logado
    name: "",
    cpfCnpj: "",
    email: "",
    mobilePhone: "",
    postalCode: "",
    address: "",
    addressNumber: "",
    complement: "",
    province: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const numericValue = value.replace(/\D/g, "");

    // Atualizar o estado com o valor numérico
    setFormData({ ...formData, [name]: numericValue });
    const formDataWithoutSymbols = {
      ...formData,
      cpfCnpj: formData.cpfCnpj.replace(/\D/g, ""),
      mobilePhone: formData.mobilePhone.replace(/\D/g, ""),
    };
    // Aplicar máscara para o CPF
    if (name === "cpfCnpj") {
      const maskedValue = value
        .replace(/\D/g, "") // Remove caracteres não numéricos
        .replace(/(\d{3})(\d)/, "$1.$2") // Coloca ponto entre o terceiro e o quarto dígitos
        .replace(/(\d{3})(\d)/, "$1.$2") // Coloca ponto entre o sexto e o sétimo dígitos
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca hífen entre o nono e o décimo primeiro dígitos

      setFormData({ ...formData, [name]: maskedValue });
    }
    // Aplicar máscara para o número de telefone
    else if (name === "mobilePhone") {
      const maskedValue = value
        .replace(/\D/g, "") // Remove caracteres não numéricos
        .replace(/(\d{2})(\d)/, "($1) $2") // Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/(\d{4,5})(\d{4})/, "$1-$2"); // Coloca hífen entre o quarto ou quinto e o nono dígitos

      setFormData({ ...formData, [name]: maskedValue });
    }
    // Outros campos
    else {
      setFormData({ ...formData, [name]: value });
    }
    // Verifica se todos os campos obrigatórios estão preenchidos
    const requiredFields = [
      "name",
      "cpfCnpj",
      "email",
      "mobilePhone",
      "postalCode",
      "address",
      "addressNumber",
      "province",
      "city",
      "state",
    ];
    const isComplete = requiredFields.every((field) => formData[field]);
    setFormComplete(isComplete);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remover todos os caracteres não numéricos do CPF e do número de telefone

    // Verifica se todos os campos obrigatórios estão preenchidos
    const requiredFields = [
      "name",
      "cpfCnpj",
      "email",
      "mobilePhone",
      "postalCode",
      "address",
      "addressNumber",
      "province",
      "city",
      "state",
    ];
    const isComplete = requiredFields.every((field) => formData[field]);

    if (!isComplete) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    toast.success("Usuario cadastrado com sucesso.");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/signup",
        formData
      );
      console.log("Dados enviados com sucesso:", response.data);
      // Você pode redirecionar o usuário ou realizar outras ações após o envio bem-sucedido
    } catch (error) {
      console.error("Erro ao enviar informações do usuário:", error);
      // Trate erros aqui, como exibir uma mensagem para o usuário
    }
  };

  const handleCepChange = async (event) => {
    const newCep = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    setFormData({ ...formData, postalCode: newCep });

    if (newCep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${newCep}/json/`,
          {}
        );
        const data = response.data;

        setFormData((prevFormData) => ({
          ...prevFormData,
          address: data.logradouro,
          complement: data.complemento,
          province: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
        setShowCEP(true);
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
        // Trate erros aqui, como exibir uma mensagem para o usuário
      }
    }
  };

  const formatCep = (cep) => {
    // Remove todos os caracteres não numéricos
    const numericCep = cep.replace(/\D/g, "");

    // Aplica a máscara
    if (numericCep.length > 5) {
      return `${numericCep.slice(0, 5)}-${numericCep.slice(5, 8)}`;
    } else {
      return numericCep;
    }
  };

  const inputStyle = {
    border: Object.values(formData).some((val) => val !== "")
      ? "1px solid #ccc"
      : "1px solid red",
  };
  return (
    <>
      <Header />
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ marginTop: "8rem" }}
      />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", marginTop: "15rem" }}
      >
        <label>
          nome completo:
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            style={inputStyle}
          />
        </label>

        <label>
          cpf:
          <input
            type="text"
            name="cpfCnpj"
            onChange={handleChange}
            value={formData.cpfCnpj}
            style={inputStyle}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            style={inputStyle}
          />
        </label>

        <label>
          Telephone:
          <input
            type="text"
            name="mobilePhone"
            onChange={handleChange}
            value={formData.mobilePhone}
            style={inputStyle}
          />
        </label>

        <label>
          Postcode:
          <input
            type="text"
            name="postalCode"
            onChange={handleCepChange}
            value={formatCep(formData.postalCode)}
            placeholder="Digite o CEP"
            style={inputStyle}
          />
        </label>
        {showCEP && (
          <>
            <label>
              Address:
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={formData.address}
                style={inputStyle}
              />
            </label>

            <label>
              Address Number:
              <input
                type="text"
                name="addressNumber"
                onChange={handleChange}
                value={formData.addressNumber}
                style={inputStyle}
              />
            </label>

            <label>
              Complement:
              <input
                type="text"
                name="complement"
                onChange={handleChange}
                value={formData.complement}
              />
            </label>

            <label>
              province:
              <input
                type="text"
                name="province"
                onChange={handleChange}
                value={formData.province}
                style={inputStyle}
              />
            </label>

            <label>
              Address City:
              <input
                type="text"
                name="city"
                onChange={handleChange}
                value={formData.city}
                style={inputStyle}
              />
            </label>

            <label>
              Address State:
              <input
                type="text"
                name="state"
                onChange={handleChange}
                value={formData.state}
                style={inputStyle}
              />
            </label>
          </>
        )}
        {Object.values(formData).filter((val) => val !== "").length > 1 && (
          <button type="submit">Submit</button>
        )}
      </form>
    </>
  );
};

export default SignUpForm;
