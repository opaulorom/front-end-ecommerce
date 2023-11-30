// store.jsx
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import * as reducers from "../reducers/productsReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const preloadedState = {}; // Adicione o estado inicial desejado aqui

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = configureStore({
  reducer: {
    products: reducers.productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production" ? composeEnhancers : false,
  preloadedState,
});

export default store;
