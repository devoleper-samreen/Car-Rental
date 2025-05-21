import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    userToken: localStorage.getItem('userToken') || null,
    adminToken: localStorage.getItem('adminToken') || null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload.user;
            state.userToken = action.payload.userToken;
            localStorage.setItem('userToken', action.payload.userToken);
        },
        adminLogin: (state, action) => {
            state.user = action.payload.user;
            state.adminToken = action.payload.adminToken;
            localStorage.setItem('adminToken', action.payload.adminToken);
        },
        logout: (state) => {
            state.user = null;
            state.userToken = null;
            state.adminToken = null;
            localStorage.removeItem('userToken');
            localStorage.removeItem('adminToken');
        }
    }
})

export const { userLogin, adminLogin, logout } = authSlice.actions;
export default authSlice.reducer;