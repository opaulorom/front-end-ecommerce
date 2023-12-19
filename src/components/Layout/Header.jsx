import React, { Fragment } from "react";
import "../../components/Layout/Header.css"; // Importa o arquivo CSS para estilização
import Search from "./Search";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userActions";
const Header = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.userAuth);

  const logoutHandler = () => {
    dispatch(logoutUser());
  }
  return (
    <Fragment>
      <Router>
        <header className="header">
          <Link className="logo link" to={"/"}>
            Logo
          </Link>
          <Link className="link" to="/">
            Home
          </Link>{" "}
          {/* Exemplo de link para a rota '/' */}
          <Search />
          <div className="right-content">
            {user ? (
              <div className="dropDown">
                <button className="link" type="button" id="dropDownButton">
                  Minha conta
                </button>

                <div className="dropdownMenu" id="dropdownMenuBtn">
                <Link to={"/orders"} >Pedidos</Link>
                <Link to={"/profile"} >Profile</Link>
                  <Link className=" dropdownItem textDanger" to="/" onClick={logoutHandler}>
                    Deslogar
                  </Link>
                </div>
              </div>
            ) : (
              !loading && (
                <>
                
                <Link to="/login" className="user-info link">
                  Login
                </Link>
                </>
              )
            )}

            <Link to={"/cart"} className="link cart">
              <div className="cart-icon">
                <i>
                  <img src="https://i.ibb.co/mNRCr2j/bag-1.png" alt="" />
                </i>
              </div>
            </Link>
          </div>
        </header>
      </Router>
    </Fragment>
  );
};

export default Header;
