import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "../redux/appSlice";
import { ApiSlice } from "../../api/ApiSlice";

const reducer = combineReducers({
  App: appReducer,
  [ApiSlice.reducerPath]: ApiSlice.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
});

export default store;
