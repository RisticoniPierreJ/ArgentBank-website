import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, updateUser } from "../../api/userAPI";

// Action asynchrone pour récupérer le profil de l'utilisateur
export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async ({ token, rememberME }, thunkAPI) => {
        try {
            const data = await getUserProfile(token);

            // Stocke les informations de profil de l'utilisateur dans le localStorage, si la checkbox remember me est cochée.
            //Les données sont converties en chaîne de caractères JSON pour être stockées.
            //Cela permet de garder les informations de l'utilisateur disponibles même après le rafraîchissement de la page.
            const storage = rememberME ? localStorage : sessionStorage;
            storage.setItem("user", JSON.stringify(data));

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Action asynchrone pour mettre à jour le nom d'utilisateur
export const changeUserName = createAsyncThunk(
    "user/updateUserName",
    async ({ token, userName }, thunkAPI) => {
        try {
            const data = await updateUser(token, userName);

            // Meise à jour du localStorage
            const storedUser = JSON.parse(localStorage.getItem("user"));
            storedUser.userName = data.userName;
            localStorage.setItem("user", JSON.stringify(storedUser));

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
