import { configureStore, compose } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  initialState,
  composeEnhancers: window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
});

export default store;
