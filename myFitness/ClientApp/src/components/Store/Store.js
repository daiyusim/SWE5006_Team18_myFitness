import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "../redux/appSlice";

const reducer = combineReducers({
  App: appReducer,
});

const store = configureStore({
  reducer,
});

export default store;
