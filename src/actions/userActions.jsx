import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
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

export const register = (userData) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_USER_REQUEST,
      });
  
      // C/reate FormData object
      const formData = new FormData();
  
      // Append only name, email, and password to FormData
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:3001/api/register",
        formData,
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
  
  
// limpar errors
export const cleanErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
