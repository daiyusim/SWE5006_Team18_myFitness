import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: ''

}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUserId(state, { payload }) {
            state.userId = payload;
        }
    }
})

export const { setUserId } = AppSlice.actions;

export default AppSlice.reducer;