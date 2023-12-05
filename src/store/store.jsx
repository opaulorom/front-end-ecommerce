// store.jsx
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productReducer, productDetailsReducer } from "../reducers/productsReducer";  // Importe o reducer diretamente
import { composeWithDevTools } from "redux-devtools-extension";
import {authReducer} from "../reducers/userReducers"
const middleware = [thunk];

const preloadedState = {}; // Adicione o estado inicial desejado aqui

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const rootReducer = combineReducers({
  products: productReducer,
  productDetails:productDetailsReducer,
  userAuth:authReducer
  // outros reducers aqui, se houver
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production' ? composeEnhancers : false,
  preloadedState,
});



export default store;
