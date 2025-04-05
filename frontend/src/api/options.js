import { axiosAuth } from './axiosInstances'

export const list_options_by_idwidgetitem = async (widgetitemid) => {
  console.log('Llamando a API con widgetitemid:', widgetitemid);
  const response = await fetch(`/Options/list_options_by_idwidgetitem/${widgetitemid}`);
  return response.json();
};

// Función para enviar las respuestas del quiz al backend
export const submit_quiz_responses = async (quizResponses, bookId, userId) => {
  console.log('Enviando respuestas del quiz:', quizResponses, 'bookId:', bookId, 'userId:', userId);
  
  try {
    // Formatear los datos para enviarlos al backend
    const formattedData = {
      bookId,
      userId,
      responses: quizResponses
    };
    
    // Enviar los datos al endpoint correspondiente
    const response = await axiosAuth.post('/Quizzes/submit_responses/', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error al enviar respuestas del quiz:', error);
    throw error;
  }
};




