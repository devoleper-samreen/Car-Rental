import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    admin: JSON.parse(localStorage.getItem("admin")) || null,
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
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        adminLogin: (state, action) => {
            state.user = action.payload.user;
            state.adminToken = action.payload.adminToken;
            localStorage.setItem('adminToken', action.payload.adminToken);
            localStorage.setItem('admin', JSON.stringify(action.payload.user));

        },
        logout: (state) => {
            state.user = null;
            state.admin = null;
            state.userToken = null;
            state.adminToken = null;
            localStorage.removeItem('userToken');
            localStorage.removeItem('adminToken');
            localStorage.removeItem('user');
            localStorage.removeItem('admin');
        }
    }
})

export const { userLogin, adminLogin, logout } = authSlice.actions;
export default authSlice.reducer;