import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Biblioteca para fazer solicitações HTTP
import style from './Produto.module.scss'
function Produto() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Fazer uma solicitação HTTP para o servidor back-end
    axios.get('/api/produto').then((response) => {
      setProdutos(response.data);
    });
  }, []);

  

  return (
    <div className={style.listaProdutos}>
      <h2>Produtos Disponíveis</h2>
      <ul>
        {produtos.map((produto) => (
          <li key={produto._id} className={style.produto}>
            <h3>{produto.nome}</h3>
            <p className="preco-produto">${produto.preco.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Produto;
