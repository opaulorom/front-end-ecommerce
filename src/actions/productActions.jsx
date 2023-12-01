import axios from "axios"

// productsReducer.jsx
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/productContants";
  
  export const getProducts = () => async (dispatch) => {
    try {
        dispatch({
            type:ALL_PRODUCTS_REQUEST
        })

        const { data } = await  axios.get("/api/products")


        dispatch({
            type:ALL_PRODUCTS_SUCCESS,
            payload:data
        })
    } catch {
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
  }


// limpar errors
export const cleanErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}
