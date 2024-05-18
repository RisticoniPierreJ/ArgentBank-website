import axios from "axios";

// Définir la base URL de l'API
const API_URL = "http://localhost:3001/api/v1/user";

// Fonction d'authentification de l'utilisateur
export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

// Fonction de déconnexion de l'utilisateur
export const logoutUser = async () => {
    // Peut inclure une requête pour informer le serveur de la déconnexion
    return true;
};

// Fonction pour récupérer les données de l'utilisateur
export const getUserProfile = async (token) => {
    const response = await axios.post(
        `${API_URL}/profile`,
        {}, // Ajoutez un corps de requête vide
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};
