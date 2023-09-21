import React, { useState } from 'react';
import { addProduct } from './api'; // Importe a função addProduct

function AddProductForm() {
  const [productData, setProductData] = useState({
    nome: '',
    preço: 0,
    descrição: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Chame a função addProduct para enviar os dados ao servidor
    addProduct(productData)
      .then((response) => {
        // Trate a resposta, por exemplo, exiba uma mensagem de sucesso
        console.log('Produto adicionado com sucesso!', response.data);

        // Limpe o formulário ou faça qualquer outra ação necessária
        setProductData({
          nome: '',
          preço: 0,
          descrição: '',
        });
      })
      .catch((error) => {
        // Trate erros, por exemplo, exiba uma mensagem de erro
        console.error('Erro ao adicionar o produto', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome do Produto:
        <input
          type="text"
          name="nome"
          value={productData.nome}
          onChange={handleChange}
        />
      </label>
      <label>
        Preço:
        <input
          type="number"
          name="preço"
          value={productData.preço}
          onChange={handleChange}
        />
      </label>
      <label>
        Descrição:
        <textarea
          name="descrição"
          value={productData.descrição}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Adicionar Produto</button>
    </form>
  );
}

export default AddProductForm;
