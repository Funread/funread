/**
 * API Service para gestión de Badges (Administrador)
 * FunRead - Admin Badges Management
 */

import axios from 'axios';
import { BASE_URL } from '../../settings';

/**
 * Obtener todos los badges con estadísticas (Admin)
 */
export const getAllBadgesAdmin = async (token, filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    if (filters.type) {
      params.append('type', filters.type);
    }
    
    const response = await axios.get(
      `${BASE_URL}Badges/admin/?${params.toString()}`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener badges:', error);
    throw error;
  }
};

/**
 * Obtener detalle de un badge (Admin)
 */
export const getBadgeDetail = async (badgeId, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}Badges/admin/detail/${badgeId}/`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalle del badge:', error);
    throw error;
  }
};

/**
 * Crear un nuevo badge (Admin)
 */
export const createBadgeAdmin = async (badgeData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}Badges/admin/create/`,
      badgeData,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al crear badge:', error);
    throw error;
  }
};

/**
 * Actualizar un badge existente (Admin)
 */
export const updateBadgeAdmin = async (badgeId, badgeData, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}Badges/admin/update/${badgeId}/`,
      badgeData,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al actualizar badge:', error);
    throw error;
  }
};

/**
 * Eliminar un badge (Admin)
 */
export const deleteBadgeAdmin = async (badgeId, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}Badges/admin/delete/${badgeId}/`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al eliminar badge:', error);
    throw error;
  }
};

/**
 * Asignar badges a todos los usuarios (Admin - Masivo)
 */
export const assignBadgesToAll = async (token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}Badges/admin/assign-all/`,
      {},
      {
        headers: {
          'Authorization': token
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error en asignación masiva de badges:', error);
    throw error;
  }
};

/**
 * Subir icono de badge
 */
export const uploadBadgeIcon = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('galleryType', '1'); // CustomIMG según el proyecto
    
    const response = await axios.post(
      `${BASE_URL}Media/upload/`,
      formData,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al subir icono:', error);
    throw error;
  }
};
