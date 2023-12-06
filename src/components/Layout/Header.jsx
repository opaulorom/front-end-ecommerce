import React, { Fragment } from 'react';
import '../../components/Layout/Header.css'; // Importa o arquivo CSS para estilização
import Search from './Search';
import { Link, BrowserRouter as Router } from 'react-router-dom';

const Header = () => {
  return (
    <Fragment>
      <Router>
        <header className="header">
          
          <Link className="logo" to={"/"} >Logo</Link>
          <Link to="/">Home</Link> {/* Exemplo de link para a rota '/' */}
          
          <Search />
          
          <div className="right-content">
            <Link to="/login" className="user-info">Login</Link>
            <Link className="user-info">Cadastro</Link>

            <div className="cart-icon">
              <i><img src="https://i.ibb.co/mNRCr2j/bag-1.png" alt="" /></i>
            </div>
          </div>
        </header>
      </Router>
    </Fragment>
  );
}

export default Header;
