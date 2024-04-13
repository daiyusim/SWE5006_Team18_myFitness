import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  roleType: "",
};

const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setUserId(state, { payload }) {
      state.userId = payload.UserId;
    },
    clearUserId(state) {
      state.userId = "";
      state.roleType = "";
    },
  },
});

export const { setUserId, clearUserId } = AppSlice.actions;

export default AppSlice.reducer;
