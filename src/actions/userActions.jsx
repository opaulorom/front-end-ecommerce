import axios from "axios"
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS
} from "../constants/userContants";

// login
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type:LOGIN_REQUEST
        })

        const config = {
            headers:{
                "Content-type":"Aplication/Json"
            }
        }

        const { data} = await axios.post("http://localhost:3001/api/login", email, password, config) 

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
}

// limpar errors
export const cleanErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
  };