import { axiosAuth } from './axiosInstances';
import { store } from '../redux/store'; // Importar el store de Redux

// Se solicita el id de Usuario
export async function newStudentGroup(
) {
  const state = store.getState();
  const userId = state.user.userId; // Obtener userId desde Redux
  if (!userId) {
    throw new Error('El ID del usuario no está configurado en el estado de Redux.');
  }
}
// Función para listar los badges de un usuario por ID dinámico
export async function listBadgePerUser() {
  const state = store.getState();
  const userId = state.user.userId; // Obtener userId desde Redux
  try {
    // Validar si el userId está presente
    if (!userId) {
      throw new Error('El ID de usuario es obligatorio para obtener los badges.');
    }
    const response = await axiosAuth().get(`Badges/listByuser/${userId}/`);
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


// Book Badges
export async function getBadgesPerBook(book_id) {
  try {
    const response = await axiosAuth().get(`bookbadge/get_badges_per_book/`, { params: { book_id: book_id }});
    return response.data; // Retorna los datos recibidos
  } catch (error) {
    throw error; // Relanza el error
  }
}
