import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "../reducers/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const preloadedState = {}; // Adicione o estado inicial desejado aqui

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

export default store;
