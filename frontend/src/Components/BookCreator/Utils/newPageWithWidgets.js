import { newPage } from "../../../api/pages";           // Ajusta la ruta según tu estructura
import { newWidgetItem } from "../../../api/widget";     // Ajusta la ruta según tu estructura

/**
 * Crea una nueva página y agrega dos widgetItems por defecto.
 * @param {number} bookid
 * @param {number} type
 * @param {number} template
 * @param {number} elementorder
 * @param {string} gridDirection
 * @param {number} gridNumRows
 * @returns {Promise<{page: object, widgetItems: object[]}>}
 */
export async function newPageWithWidgets(bookid, type, template, elementorder, gridDirection, gridNumRows) {
  // 1. Crear la página
  const pageResponse = await newPage(bookid, type, template, elementorder, gridDirection, gridNumRows);
  const pageid = pageResponse.data.pageid || pageResponse.data.page?.pageid; // Ajusta si el backend responde diferente

  // 2. Crear dos widgetItems básicos (ajusta los datos/value/widgetid según tu lógica real)
  const widgetItem1 = await newWidgetItem(
    pageid,
    2, // widgetid para el primer widget, ajusta según tu lógica
    type,
    { }, // value: estructura según tu app
    1  // elementorder
  );

  // 3. Devuelve todo por si quieres actualizar el estado o usar los datos
  return {
    page: pageResponse.data,
    widgetItems: [widgetItem1.data],
  };
}
