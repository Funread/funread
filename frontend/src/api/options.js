import { axiosAuth } from './axiosInstances'
import { BASE_URL } from "../settings";

export const list_options_by_idwidgetitem = async (widgetitemid) => {
  console.log("Llamando a API con widgetitemid:", widgetitemid);
  try {
    // Using the BASE_URL from settings instead of a relative URL
    const response = await fetch(
      `${BASE_URL}Options/list_options_by_idwidgetitem/${widgetitemid}`
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        `Expected JSON response but got ${
          contentType || "unknown content type"
        }`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching options:", error);
    // Return empty array instead of throwing to prevent component failures
    return [];
  }
};

// Función para enviar las respuestas del quiz al backend
export const submit_quiz_responses = async (quizResponses, bookId, userId) => {
  console.log(
    "Enviando respuestas del quiz:",
    quizResponses,
    "bookId:",
    bookId,
    "userId:",
    userId
  );

  try {
    // Formatear los datos para enviarlos al backend
    const formattedData = {
      bookId,
      userId,
      responses: quizResponses,
    };
    console.log("Formatted data:", formattedData);
    // Enviar los datos al endpoint correspondiente
    const response = await axiosAuth.post(
      "/Quizzes/submit_responses/",
      formattedData
    );
    return response.data;
  } catch (error) {
    console.error("Error al enviar respuestas del quiz:", error);
    throw error;
  }
};
export const createMultipleOptions = async (options, idwidgetitem, createdby) => {
  console.log("Enviando opciones:", options);

  try {
     

    return axiosAuth().post("/Options/create_multiple_options/", {
        options,
        idwidgetitem,
        createdby,
      });
  
  
  } catch (error) {
    console.error("Error al crear opciones:", error);
    throw error;
  }
};