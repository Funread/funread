import { axiosAuth } from './axiosInstances';
import { store } from '../redux/store'; // Importamos el store para acceder al estado global

// Obtener el nivel y puntos totales de un usuario
export async function getUserLevelAndPoints() {
  try {
    const state = store.getState(); // Obtenemos el estado global de Redux
    const userId = state.user.userId; // Extraemos el userId del estado global
    if (!userId) {
      throw new Error('No user ID found in Redux state');
    }

    // Ajustamos la ruta para que coincida con la definida en el backend
    const response = await axiosAuth().get(`UserPoints/api/user-points/details/${userId}/`);
    return response.data; // Retornamos los datos del usuario
  } catch (error) {
    console.error('Error fetching user level and points:', error.response?.data || error.message);
    throw error; // Relanzamos el error para manejo adicional si es necesario
  }
}

// Obtener las insignias de un usuario
export async function getUserBadges() {
  try {
    const state = store.getState(); // Obtenemos el estado global de Redux
    const userId = state.user.userId; // Extraemos el userId del estado global
    if (!userId) {
      throw new Error('No user ID found in Redux state');
    }

    // Ajustamos la ruta para que coincida con la definida en el backend
    const response = await axiosAuth().get(`UserBadge/api/user-badges/user/${userId}/`);
    return response.data; // Retornamos las insignias del usuario
  } catch (error) {
    console.error('Error fetching user badges:', error.response?.data || error.message);
    throw error; // Relanzamos el error para manejo adicional si es necesario
  }
}
