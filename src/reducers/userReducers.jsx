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

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST: 
      
      return {
        loading: true,
        isAuthenticated: false,
      };
      case LOGOUT_SUCCESS:
        return {
          loading:false,
          isAuthenticated:false,
          user:null,
        }
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

      case LOAD_USER_FAIL:
        return {
          loading:false,
          isAuthenticated: false,
          user: null,
          error:action.payload
        }
        case LOGOUT_FAIL:
          return {
            ...state,
            error:action.payload
          }

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const updatePasswordReducer = (state = {}, action) => {
  switch(action.type){

    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading:true,
        isUpdated:action.payload
      }


    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading:false,
        isUpdated:action.payload,

      }
   
      case UPDATE_PASSWORD_RESET:
        return {
          ...state,
          loading:false,
          isUpdated:false,
  
        }
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        error:action.payload

      }

    default:
      return state
  }
}