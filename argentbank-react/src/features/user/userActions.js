import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../../api/userAPI";

// Action asynchrone pour récupérer les données de l'utilisateur
export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (token, thunkAPI) => {
        try {
            const data = await getUserProfile(token);
            console.log("fetchUserProfile data:", data.body); // Nouveau log
            return data.body;
        } catch (error) {
            console.error("fetchUserProfile error:", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
