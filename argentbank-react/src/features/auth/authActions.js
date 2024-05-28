import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../../api/userAPI";
import { resetAuth } from "./authSlice";
import { resetUser } from "../user/userSlice";
import { fetchUserProfile } from "../user/userActions";

// Action asynchrone pour l'authentification de l'utilisateur
// Cette action prend en paramètre l'email et le mot de passe de l'utilisateur
// Elle envoie une requête à l'API pour authentifier l'utilisateur
// Si la requête réussit, elle retourne le token d'authentification
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password, rememberME }, thunkAPI) => {
        try {
            const data = await loginUser(email, password);
            const token = data.body.token;
            thunkAPI.dispatch(fetchUserProfile({ token, rememberME }));

            // Stocker le token d'authentification dans le localStorage, si la checkbox remember me est cochée.
            // Cela permet de garder l'utilisateur connecté même après le rafraîchissement de la page
            const storage = rememberME ? localStorage : sessionStorage;
            storage.setItem("token", token);

            return { token };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Action asynchrone pour la déconnexion de l'utilisateur
// Elle envoie une requête à l'API pour déconnecter l'utilisateur
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await logoutUser();

        // log de contrôle du localStorage avant
        console.log(
            "Before removing items from localStorage:",
            localStorage.getItem("token"),
            localStorage.getItem("user")
        );

        // Réinitialisation du localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // log de contrôle du localStorage après
        console.log(
            "After removing items from localStorage:",
            localStorage.getItem("token"),
            localStorage.getItem("user")
        );

        // Réinitialisation de l'état
        thunkAPI.dispatch(resetAuth());
        thunkAPI.dispatch(resetUser());

        return true;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
