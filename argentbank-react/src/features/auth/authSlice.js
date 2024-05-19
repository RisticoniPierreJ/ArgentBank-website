import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./authActions";

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

    // Pas de réducteurs supplémentaires
    reducers: {}, 

    // extraReducers est utilisé pour gérer les actions qui ont été définies en dehors de ce slice.
    // Dans ce cas, il gère les actions login et logout qui ont été définies dans authActions.
    // Le builder est utilisé pour ajouter des gestionnaires d'actions à l'état.
    extraReducers: (builder) => {
        builder
            // Lorsque la requête d'authentification est en cours, activer l'indicateur de chargement  
            .addCase(login.pending, (state) => {
                state.loading = true;
            })

            // Lorsque la requête d'authentification réussit, mettre à jour l'état et le localStorage
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.loading = false;
                state.error = null;

                // Stocker le token d'authentification dans le localStorage. 
                // Cela permet de garder l'utilisateur connecté même après le rafraîchissement de la page
                localStorage.setItem("token", action.payload.token);
                
            })

            // Lorsque la requête d'authentification échoue, mettre à jour l'état
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("Login rejected:", action.payload);
            })
            
            // Lorsque la requête de déconnexion réussit, réinitialiser l'état et le localStorage
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.token = null;
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            });
    },
});

export default authSlice.reducer;