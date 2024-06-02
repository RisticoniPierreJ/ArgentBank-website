import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authActions";

// Récupérer le token d'authentification du localStorage
const token = localStorage.getItem("token");

// Définir l'état initial du slice d'authentification
const initialState = {
    // L'utilisateur est authentifié si un token est présent
    isAuthenticated: !!token,
    token: token,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        // Définission d'un reducer pour réinitialiser l'état d'authentification à l'état initial
        resetAuth: (state) => {
            // state.isAuthenticated = initialState.isAuthenticated;
            // state.token = initialState.token;
            // state.loading = initialState.loading;
            // state.error = initialState.error;
            state.isAuthenticated = false;
            state.token = null;
            state.loading = false;
            state.error = null;

            // log de contrôle de l'état après réinitialisation
            console.log(
                "resetAuth action called, state reset to:",
                JSON.parse(JSON.stringify(state))
            );
        },
    },

    // extraReducers est utilisé pour gérer les actions qui ont été définies en dehors de ce slice.
    // Dans ce cas, il gère les actions login et logout qui ont été définies dans authActions.
    // Le builder est utilisé pour ajouter des gestionnaires d'actions à l'état.
    extraReducers: (builder) => {
        builder
            // Lorsque la requête d'authentification est en cours, activer l'indicateur de chargement
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // Lorsque la requête d'authentification réussit, mettre à jour l'état
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.loading = false;
                state.error = null;
            })

            // Lorsque la requête d'authentification échoue, mettre à jour l'état
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Invalid credentials";
            });
    },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
