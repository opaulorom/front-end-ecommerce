import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import MetaData from "../Layout/MetaData";
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login, cleanErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

import "./Login.css";
const Login = ({}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/`);
    }

   
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password))
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"login"}></MetaData>
          <div>
            <div className="container">
              <div className="row wrapper">
                <div className="col-10 col-lg-5">
                  <form className="login-form" onSubmit={submitHandler}>
                    <h1 className="mb-3">Login</h1>
                    <div className="form-group">
                      <label htmlFor="email_field">Email</label>
                      <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password_field">Password</label>
                      <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <Link to="/password/forgot" className="forgot-password-link">
                      Forgot Password?
                    </Link>

                    <button
                      id="login_button"
                      type="submit"
                      className="login-button"
                    >
                      LOGIN
                    </button>

                    <Link to="/register" className="new-user-link">
                      New User?
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
