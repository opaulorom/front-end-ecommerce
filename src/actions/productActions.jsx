// productsReducer.jsx
import axios from "axios";
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
 PRODUCT_DETAILS_REQUEST,
PRODUCT_DETAILS_SUCCESS,
PRODUCT_DETAILS_FAIL,
} from "../constants/productContants";

export const getProducts = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        });

        const { data } = await axios.get(`http://localhost:3001/api/products?keyword=${keyword}&page=${currentPage}`);
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.error('Error in getProducts:', error);


        dispatch({
            
            type: ALL_PRODUCTS_FAIL,
            payload: error.response ? error.response.data.message : "Erro ao obter produtos da API"
        });
    }
};
// ...
// Action para buscar um produto por ID
export const getProductById = (id) => async (dispatch) => {
  try {
      dispatch({
          type: PRODUCT_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`http://localhost:3001/api/products/${id}`);

      dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: data.product,
      });
  } catch (error) {
      dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.response ? error.response.data.message : 'Erro ao obter produto da API',
      });
  }
};
// ...


export const productDetails = (id) => async (dispatch) => {
  try {
      dispatch({
          type: PRODUCT_DETAILS_REQUEST
      });

      const { data } = await axios.get(`http://localhost:3001/api/product/${id}`);
      console.log("Data from API:", data);

      dispatch({
          type:PRODUCT_DETAILS_SUCCESS,
          payload: data.product,
      });
      
  } catch (error) {
      dispatch({
          type: PRODUCT_DETAILS_FAIL,
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