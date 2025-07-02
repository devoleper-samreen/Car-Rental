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
        userLogout: (state) => {
            state.user = null;
            state.userToken = null;
            localStorage.removeItem('userToken');
            localStorage.removeItem('user');
        },
        adminLogout: (state) => {
            state.admin = null;
            state.adminToken = null;
            localStorage.removeItem('adminToken');
            localStorage.removeItem('admin');
        },
        userProfile: (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        adminProfile: (state, action) => {
            state.admin = action.payload.admin;
            localStorage.setItem('admin', JSON.stringify(action.payload.admin));
        }
    }
})

export const { userLogin, adminLogin, userLogout, adminLogout, userProfile, adminProfile } = authSlice.actions;
export default authSlice.reducer;