import React, { Fragment } from 'react'
import '../../components/Layout/Header.css'; // Importa o arquivo CSS para estilização

const Header = () => {
  return (
    <Fragment>
        <header className="header">
      <div className="logo">Logo</div>
      <div className="center-content">
        <input type="text" placeholder="Pesquisar" />
      </div>
      <div className="right-content">
        <div className="user-info">Login / Cadastro</div>
        <div className="cart-icon">&#128722;</div>
      </div>
    </header>
    </Fragment>
  )
}

export default Header