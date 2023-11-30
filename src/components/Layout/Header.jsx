import React, { Fragment } from 'react'
import '../../components/Layout/Header.css'; // Importa o arquivo CSS para estilização

const Header = () => {
  return (
    <Fragment>
    <header className="header">
      <div className="logo">Logo</div>
      <div className="center-content">
        <div className="search-container">
          <input type="text" placeholder="Pesquisar" />
        <i className="search-button"><img className='button' src="https://i.ibb.co/fGYcrqs/loupe-3.png" alt="" /></i>
        </div>
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