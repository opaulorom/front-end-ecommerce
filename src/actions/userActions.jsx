import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL
} from "../constants/userContants";

// login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:3001/api/login",
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response ? error.response.data.message : "Unknown error",
    });
  }
};

// Register user
// Register user
export const register = (userData) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_USER_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:3001/api/register",
        // Use userData.name, userData.email, userData.password here
        { name: userData.name, email: userData.email, password: userData.password },
        config
      );
  
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      console.error('Registration error:', error);
  
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response
          ? error.response.data.message
          : "Unknown error",
      });
    }
  };
  

// load user
export const loadUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      "http://localhost:3001/api/users",
      // Use userData.name, userData.email, userData.password here
      { email: userData.email, password: userData.password },
      config
    );

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.error('Registration error:', error);

    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error",
    });
  }
};

// logout user
// logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:3001/api/logout");

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.error('Logout error:', error);

    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error",
    });
  }
};


// load user
export const updatePasswordUser = (password) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      "http://localhost:3001/api/users",
      // Use userData.name, userData.email, userData.password here
      password,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.error('Registration error:', error);

    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response
        ? error.response.data.message
        : "Unknown error",
    });
  }
};

// limpar errors
export const cleanErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
