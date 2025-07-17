import { useCallback } from "react";
import { updateWidgetItem } from "../../../api/widget";

export function useGamesSaver({ elements, pagesList, currentPage }) {
  const saveGame = useCallback(() => {
    if (!pagesList || !pagesList[currentPage] || !pagesList[currentPage].page) {
      alert("Página no disponible");
      return;
    }
    const currentPageId = pagesList[currentPage].page.pageid;
    const widgetId = 9;
    const widgetitemid = pagesList[currentPage].widgetitems[0].widgetitemid;
      try {
        if (elements && elements.words && elements.words.length >= 3) {
          const type=5
          const value= elements
          const elementorder=0
          updateWidgetItem(widgetitemid, currentPageId, widgetId, type, value, elementorder)
           alert(`Sopa de letras guardada correctamente en la página ${currentPage + 1}`);
        } else {
          throw new Error("No hay configuración válida para guardar");
        }
      } catch (error) {
        alert("Error al guardar la sopa de letras. Por favor, asegúrate de completar toda la configuración.");
      } 
    
  }, [elements, pagesList, currentPage]);

  return { saveGame };
}
