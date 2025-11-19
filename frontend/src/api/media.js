import { axiosAuth } from './axiosInstances'
import axios from 'axios';
import { BASE_URL } from '../settings';

export async function upload(name) {
  return axiosAuth().post('Media/upload/', {
    name: name,
  })
}

export async function save_Image(file, galleryType) {
  const formFile = new FormData();
  formFile.append('file', file);
  if (galleryType !== undefined) {
    formFile.append('galleryType', galleryType);
  }
  return axiosAuth().post('Media/save/', formFile);
}

export async function list() {
  return axiosAuth().get('Media/list/')
}

export async function getImage(imageRoute) {
  return axiosAuth().get('Media/' + imageRoute)
}

/**
 * Obtener imágenes por tipo de galería
 */
export const getMediaByType = async (galleryType, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}Media/by-type/${galleryType}/`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching media by type:', error);
    throw error;
  }
};

/**
 * Subir múltiples imágenes
 */
export const uploadMediaBulk = async (files, galleryType, token, onProgress) => {
  const successResults = [];
  const failedResults = [];
  
  for (let i = 0; i < files.length; i++) {
    try {
      const file = files[i];
      
      // Paso 1: Guardar archivo
      const formData = new FormData();
      formData.append('file', file);
      formData.append('galleryType', galleryType);
      
      const saveResponse = await axios.post(
        `${BASE_URL}Media/save/`,
        formData,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Paso 2: Upload (obtener ruta)
      const uploadResponse = await axios.post(
        `${BASE_URL}Media/upload/`,
        { name: saveResponse.data.id },
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
      );

      successResults.push({
        fileName: file.name,
        data: uploadResponse.data
      });

    } catch (error) {
      console.error(`Error uploading ${files[i].name}:`, error);
      failedResults.push({
        fileName: files[i].name,
        error: error.message
      });
    }

    // Actualizar progreso
    if (onProgress) {
      const progress = Math.round(((i + 1) / files.length) * 100);
      onProgress(progress);
    }
  }

  return {
    successCount: successResults.length,
    failedCount: failedResults.length,
    successful: successResults,
    failed: failedResults
  };
};

/**
 * Eliminar una imagen
 */
export const deleteMedia = async (mediaId, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}Media/delete/${mediaId}/`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
};

/**
 * Obtener todas las imágenes (admin)
 */
export const getAllMedia = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}Media/all/`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching all media:', error);
    throw error;
  }
};

