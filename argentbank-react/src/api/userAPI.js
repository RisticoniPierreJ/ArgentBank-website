// Importer le module axios pour effectuer des requêtes HTTP
import axios from "axios";

// Définir la base URL de l'API
const API_URL = "http://localhost:3001/api/v1/user";

// Fonction d'authentification de l'utilisateur
// Envoie une requête POST à l'API pour authentifier l'utilisateur
export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

// Fonction de déconnexion de l'utilisateur
// Ne fait rien pour le moment, mais pourrait être étendue pour informer l'API que l'utilisateur s'est déconnecté
export const logoutUser = async () => {
    return true;
};

// Fonction pour récupérer les données de l'utilisateur
// Envoie une requête POST à l'API pour récupérer les données de l'utilisateur
export const getUserProfile = async (token) => {
    const response = await axios.post(
        `${API_URL}/profile`,

        // Ajout d'un corps de requête vide
        {},

        // Envois du token d'authentification dans les headers de la requête
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const { email, firstName, lastName, userName, id } = response.data.body;
    return { email, firstName, lastName, userName, id };
};

// Fonction pour mettre à jour le nom d'utilisateur
export const updateUser = async (token, newUserNamee) => {
    const response = await axios.put(
        `${API_URL}/profile`,
        { userName: newUserNamee },

        // Envois du token d'authentification dans les headers de la requête
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const { userName, id } = response.data.body;
    return { userName, id };
};
