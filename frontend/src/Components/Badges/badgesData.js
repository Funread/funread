import axios from 'axios';
import { useId } from 'react';

// Crear una instancia de axios configurada para la URL base del backend
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',  
    headers: {
        'Content-Type': 'application/json',
    }
});

// Función para establecer el token de autorización
/* export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
}; */

// Función para obtener la lista de badges de un usuario específico
export const getUserBadgesWithStatus = async (userId) => {
    try {
        const response = await api.get(`/Badges/api/badges/user/${1}/`);
        
        // Retornar la lista de badges desde la respuesta
        return response.data.badges;
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error fetching user badges:', error.response.status, error.response.data);
        } else if (error.request) {
            // La solicitud fue realizada pero no hubo respuesta
            console.error('No response received:', error.request);
        } else {
            // Algo salió mal en la configuración de la solicitud
            console.error('Error', error.message);
        }
        throw error;
    }
};

