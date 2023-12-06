import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import { register } from "../../actions/userActions";
import { CLEAR_ERRORS } from "../../constants/userContants";
const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: CLEAR_ERRORS });
    dispatch(register(user));
  };


  return (
    <Fragment>
      <MetaData title={"register"} />
      <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            Register
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
    </Fragment>
  );
};

export default Register;
