import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Biblioteca para fazer solicitações HTTP
import './components/Produto.module.css'
function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Fazer uma solicitação HTTP para o servidor back-end
    axios.get('/api/produtos').then((response) => {
      setProdutos(response.data);
    });
  }, []);

  return (
    <div className="lista-produtos">
      <h2>Produtos Disponíveis</h2>
      <ul>
        {produtos.map((produto) => (
          <li key={produto._id} className="produto">
            <h3>{produto.nome}</h3>
            <p className="descricao-produto">{produto.descricao}</p>
            <p className="preco-produto">${produto.preco.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProdutos;
