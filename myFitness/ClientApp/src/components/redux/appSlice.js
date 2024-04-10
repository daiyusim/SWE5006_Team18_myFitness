import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setUserId(state, { payload }) {
      state.userId = payload;
    },
    clearUserId(state) {
      state.userId = "";
    },
  },
});

export const { setUserId, clearUserId } = AppSlice.actions;

export default AppSlice.reducer;
