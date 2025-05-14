import { axiosAuth } from "./axiosInstances";

/**
 * Obtiene el progreso de un libro específico para un usuario.
 * @param {number} userId - ID del usuario
 * @param {number} bookId - ID del libro
 * @returns {Promise} - Promesa con la respuesta de la API
 */
export async function getBookProgress(userId, bookId) {
  try {
    const response = await axiosAuth().get(
      `userbookprogress/get-progress/${userId}/${bookId}/`
    );
    return response;
  } catch (error) {
    console.error("Error al obtener el progreso del libro:", error);
    throw error;
  }
}

/**
 * Marca un libro como completado con calificación 100.
 * @param {number} userId - ID del usuario
 * @param {number} bookId - ID del libro
 * @returns {Promise} - Promesa con la respuesta de la API
 */
export async function markBookAsCompleted(userId, bookId) {
  try {
    const response = await axiosAuth().post(
      "userbookprogress/mark-as-completed/",
      {
        userId: userId,
        bookId: bookId,
      }
    );
    return response;
  } catch (error) {
    console.error("Error al marcar el libro como completado:", error);
    throw error;
  }
}

/**
 * Crea o actualiza el progreso de un libro para un usuario.
 * @param {number} userId - ID del usuario
 * @param {number} bookId - ID del libro
 * @returns {Promise} - Promesa con la respuesta de la API
 */
export async function getOrCreateProgress(userId, bookId) {
  try {
    const response = await axiosAuth().post("userbookprogress/get-or-create/", {
      userId: userId,
      bookId: bookId,
    });
    return response;
  } catch (error) {
    console.error("Error al obtener o crear el progreso del libro:", error);
    throw error;
  }
}

/**
 * Actualiza el estado de progreso de un libro.
 * @param {number} id - ID del registro de progreso
 * @param {number} status - Nuevo estado (0: TODO, 1: Completado, 2: En progreso)
 * @returns {Promise} - Promesa con la respuesta de la API
 */
export async function updateBookStatus(id, status) {
  try {
    const response = await axiosAuth().put("userbookprogress/update-status/", {
      id: id,
      status: status,
    });
    return response;
  } catch (error) {
    console.error("Error al actualizar el estado del libro:", error);
    throw error;
  }
}

/**
 * Actualiza la calificación del libro.
 * @param {number} id - ID del registro de progreso
 * @param {number} calificacion - Nueva calificación (0-100)
 * @returns {Promise} - Promesa con la respuesta de la API
 */
export async function updateBookCalificacion(id, calificacion) {
  try {
    const response = await axiosAuth().put(
      "userbookprogress/update-calificacion/",
      {
        id: id,
        calificacion: calificacion,
      }
    );
    return response;
  } catch (error) {
    console.error("Error al actualizar la calificación del libro:", error);
    throw error;
  }
}

/**
 * Elimina el registro de progreso de un libro.
 * @param {number} id - ID del registro de progreso
 * @returns {Promise} - Promesa con la respuesta de la API
 */
export async function deleteBookProgress(id) {
  try {
    const response = await axiosAuth().delete("userbookprogress/delete/", {
      data: { id: id },
    });
    return response;
  } catch (error) {
    console.error("Error al eliminar el progreso del libro:", error);
    throw error;
  }
}

/**
 * Obtiene la cantidad total de libros completados por un usuario.
 * @param {number} userId - ID del usuario
 * @returns {Promise} - Promesa con la respuesta de la API
 */
export async function getBooksCompleted(userId) {
  try {
    const response = await axiosAuth().get(
      `userbookprogress/books-completed/${userId}/`
    );
    return response;
  } catch (error) {
    console.error("Error al obtener la cantidad de libros completados:", error);
    throw error;
  }
}
