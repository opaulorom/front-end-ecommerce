// store.jsx
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { productsReducer } from "../reducers/productsReducer";  // Importe o reducer diretamente
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const preloadedState = {}; // Adicione o estado inicial desejado aqui

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = configureStore({
  reducer: {
    products: productsReducer,  // Use o reducer diretamente
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production" ? composeEnhancers : false,
  preloadedState,
});

export default store;
