import { axiosAuth } from './axiosInstances';
import { store } from '../redux/store'; // Importar el store de Redux


export async function listBadgePerUser() {
     const state = store.getState();
     const userId = state.user.userId; // Obtener userId desde Redux
     try {
          const response = await axiosAuth().get(`UserBadge/infobadges/${userId}/`);
          return response.data; // Retorna los datos recibidos
     } catch (error) {
          // Manejo de errores
          if (error.response) {
               console.error('Error en la respuesta del servidor:', error.response.data);
          } else if (error.request) {
               console.error('No se recibió respuesta del servidor:', error.request);
          } else {
               console.error('Error al configurar la solicitud:', error.message);
          }
          throw error; // Relanza el error
     }
}

export async function award_badge_to_user(badge_id) {
     const state = store.getState();
     const userId = state.user.userId; // Obtener userId desde Redux
     try {
          const response = await axiosAuth().post(`UserBadge/award-badge/`, {
               user_id: userId,
               badge_id: badge_id,
          });
          return response.data; // Retorna los datos recibidos
     } catch (error) {
          // Manejo de errores
          if (error.response) {
               console.error('Error en la respuesta del servidor:', error.response.data);
          } else if (error.request) {
               console.error('No se recibió respuesta del servidor:', error.request);
          } else {
               console.error('Error al configurar la solicitud:', error.message);
          }
          throw error; // Relanza el error
     }
}


