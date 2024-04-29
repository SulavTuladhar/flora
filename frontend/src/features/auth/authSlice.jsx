/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { checkLocalStorage, login } from './reducers';

const initialState = {
    user: {},
    token: null,
    isLoading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        // function to check token & user in localStorage
        [checkLocalStorage.pending]: (state) => {
            state.isLoading = true;
        },
        [checkLocalStorage.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        [checkLocalStorage.rejected]: (state, action) => {
            state.isLoading = false;
            state.user(null);
            state.token(null);
        },
        // Login
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            console.log('====================================');
            console.log("error is >> ", action);
            console.log('====================================');
            state.user(null);
        },
    },
});

export default authSlice.reducer;
