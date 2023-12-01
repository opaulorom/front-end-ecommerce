// productsReducer.jsx
import axios from "axios";
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
} from "../constants/productContants";

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        });

        const { data } = await axios.get("http://localhost:3001/api/products");
        console.log(data, "a api ta pegando?")
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response ? error.response.data.message : "Erro ao obter produtos da API"
        });
    }
};

// limpar errors
export const cleanErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
