import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../../api/userAPI";
import { fetchUserProfile } from "../user/userActions";

// Action asynchrone pour l'authentification
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await loginUser(email, password);
            const token = data.body.token;

            console.log("Voir si le token est bien recu :", token);

            thunkAPI.dispatch(fetchUserProfile(token));

            return { token };
        } catch (error) {
            console.error("Login error:", error); // Ajoutez ce log
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Action asynchrone pour la déconnexion
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await logoutUser();

        return true;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
