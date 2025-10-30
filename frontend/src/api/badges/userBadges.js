/**
 * API Service para Badges de Usuario
 * Obtener badges obtenidos y progreso
 */

import axios from 'axios';
import { BASE_URL } from '../../settings';

/**
 * Obtener badges y progreso del usuario actual
 * @param {number} userId - ID del usuario
 * @param {string} token - Token JWT
 */
export const getUserBadgesWithProgress = async (userId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}Badges/progress/${userId}/`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener badges del usuario:', error);
    throw error;
  }
};

/**
 * Obtener todos los badges del usuario (solo los obtenidos)
 * @param {number} userId - ID del usuario
 * @param {string} token - Token JWT
 */
export const getUserBadges = async (userId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}UserBadge/?userid=${userId}`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener badges del usuario:', error);
    throw error;
  }
};
