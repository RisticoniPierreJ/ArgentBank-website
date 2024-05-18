import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./authActions";

const token = localStorage.getItem("token");

const initialState = {
    isAuthenticated: !!token,
    // user: user,
    token: token,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.loading = false;
                state.error = null;

                // Mise en place du token dans le localStorage
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("Login rejected:", action.payload);
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                // state.user = null;
                state.token = null;
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            });
    },
});

export default authSlice.reducer;
