import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./userActions";

// Récupérer l'utilisateur du localStorage
const storedUser = localStorage.getItem("user");

// Définir un utilisateur initial vide
let initialUser = {
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    userId: "",
};

// Si un utilisateur est stocké dans le localStorage, essayer de le parser et de l'utiliser comme utilisateur initial
if (storedUser) {
    try {
        initialUser = JSON.parse(storedUser);
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
    }
}


// Définir l'état initial du slice d'utilisateur
const initialState = {
    user: initialUser,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,

    // Pas de réducteurs supplémentaires
    reducers: {},

    // extraReducers est utilisé pour gérer les actions qui ont été définies en dehors de ce slice.
    // Dans ce cas, il gère l'action fetchUserProfile qui a été définie dans userActions.
    // Le builder est utilisé pour ajouter des gestionnaires d'actions à l'état.
    extraReducers: (builder) => {
        builder

            // Lorsque la requête de profil d'utilisateur est en cours, activer l'indicateur de chargement
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
            })

            // Lorsque la requête de profil d'utilisateur réussit, mettre à jour l'état et le localStorage
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = {
                    email: action.payload.email,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    userName: action.payload.userName,
                    userId: action.payload.id,
                };
                state.loading = false;
                state.error = null;

                // Stocke les informations de profil de l'utilisateur dans le localStorage.
                //Les données sont converties en chaîne de caractères JSON pour être stockées.
                //Cela permet de garder les informations de l'utilisateur disponibles même après le rafraîchissement de la page.
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            
            // Lorsque la requête de profil d'utilisateur échoue, mettre à jour l'état
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("Fetch user profile rejected:", action.payload);
            });
    },
});

export default userSlice.reducer;
