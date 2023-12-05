import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
import { Fragment, useState, useEffect } from "react";
import {link} from "react-router-dom"
import {login, cleanErrors} from "../../actions/userActions"
import "./Login"
const Login = () => {

    
  return (
    <div>
     <div className="container">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="login-form">
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value=""
              />
            </div>

            <a href="#" className="forgot-password-link">
              Forgot Password?
            </a>

            <button
              id="login_button"
              type="submit"
              className="login-button"
            >
              LOGIN
            </button>

            <a href="#" className="new-user-link">
              New User?
            </a>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login