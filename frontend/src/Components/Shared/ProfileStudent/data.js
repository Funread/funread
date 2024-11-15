import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Cambia esta URL según tu configuración
    headers: {
        'Content-Type': 'application/json',
    }
});

export const fetchUserData = async (userId) => {
    try {
        const response = await api.get(`/UserPoints/api/user-points/details/${1}/`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching user level and points:", error);
        throw error;
    }
};

export const fetchUserBadges = async (userId) => {
    try {
        const response = await api.get(`/UserBadge/api/user-badges/${1}/`);
        return response.data || [];
    } catch (error) {
        console.error("Error fetching user badges:", error);
        throw error;
    }
};

