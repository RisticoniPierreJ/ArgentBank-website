import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./userActions";

const storedUser = localStorage.getItem("user");
let initialUser ={
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    userId: "",
};

if (storedUser) {
    try {
        initialUser = JSON.parse(storedUser);
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
    }
}


const initialState = {
    user: initialUser,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
            })
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
                // Ajout du user dans le localStorage
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("Fetch user profile rejected:", action.payload);
            });
    },
});

export default userSlice.reducer;
