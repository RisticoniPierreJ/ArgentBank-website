import { createSlice } from "@reduxjs/toolkit";
import { changeUserName, fetchUserProfile } from "./userActions";

// Récupérer l'utilisateur du localStorage
const storedUser = localStorage.getItem("user");

// Définir un utilisateur initial vide
let initialUser = {
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    Id: "",
};

// Si un utilisateur est stocké dans le localStorage, essayer de le parser et de l'utiliser comme utilisateur initial
if (storedUser) {
    try {
        initialUser = JSON.parse(storedUser);
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
    }
}

console.log("Initial user state:", initialUser);

// Définir l'état initial du slice d'utilisateur
const initialState = {
    user: initialUser,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        resetUser: (state) => {
            state.user.email = "";
            state.user.firstName = "";
            state.user.lastName = "";
            state.user.userName = "";
            state.user.id = "";
            state.loading = initialState.loading;
            state.error = initialState.error;

            // log de contrôle de l'état après réinitialisation
            console.log(
                "resetUser action called, state reset to:",
                JSON.parse(JSON.stringify(state))
            );
        },
    },

    // extraReducers est utilisé pour gérer les actions qui ont été définies en dehors de ce slice.
    // Dans ce cas, il gère l'action fetchUserProfile qui a été définie dans userActions.
    // Le builder est utilisé pour ajouter des gestionnaires d'actions à l'état.
    extraReducers: (builder) => {
        builder
        
            //
            // Cas pour la recupération de la data de l'utilisateur
            //

            // Lorsque la requête de profil d'utilisateur est en cours, activer l'indicateur de chargement
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
            })

            // Lorsque la requête de profil d'utilisateur réussit, mettre à jour l'état
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = {
                    email: action.payload.email,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    userName: action.payload.userName,
                    id: action.payload.id,
                };
                state.loading = false;
                state.error = null;
            })

            // Lorsque la requête de profil d'utilisateur échoue, mettre à jour l'état
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("fetchUserProfile.rejected: state", state);
            })

            //
            //Cas pour la modification du nom d'utilisateur
            //
            .addCase(changeUserName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(changeUserName.fulfilled, (state, action) => {
                state.user.userName = action.payload.userName;
                state.loading = false;
                state.error = null;
            })

            .addCase(changeUserName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
