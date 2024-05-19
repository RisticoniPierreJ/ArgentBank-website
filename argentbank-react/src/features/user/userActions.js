import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../../api/userAPI";

// Action asynchrone pour récupérer les données de l'utilisateur
// Cette action prend en paramètre le token d'authentification de l'utilisateur
// Elle envoie une requête à l'API pour récupérer les données de l'utilisateur
export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (token, thunkAPI) => {
        try {
            const data = await getUserProfile(token);
            return data.body;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
