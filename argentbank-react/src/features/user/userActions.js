import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../../api/userAPI";

// Action asynchrone pour récupérer le profil de l'utilisateur
export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (token, thunkAPI) => {
        try {
            const data = await getUserProfile(token);

            // Stocke les informations de profil de l'utilisateur dans le localStorage.
            //Les données sont converties en chaîne de caractères JSON pour être stockées.
            //Cela permet de garder les informations de l'utilisateur disponibles même après le rafraîchissement de la page.
            localStorage.setItem("user", JSON.stringify(data));

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
