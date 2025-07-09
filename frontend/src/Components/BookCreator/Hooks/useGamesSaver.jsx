import { useCallback } from "react";
import { newWidgetItem } from "../../../api/widget";


export function useGamesSaver({ elements, pagesList, currentPage, updatePageType }) {
  const saveGame = useCallback(() => {
    if (!pagesList || !pagesList[currentPage] || !pagesList[currentPage].page) {
      alert("Página no disponible");
      return;
    }
    const currentPageId = pagesList[currentPage].page.pageid;
    const widgetId = 9;
    updatePageType(currentPageId, 5)
      .then(() => {
        if (elements && elements.words && elements.words.length >= 3) {
          return newWidgetItem(currentPageId, widgetId, 4, elements, 0);
        } else {
          throw new Error("No hay configuración válida para guardar");
        }
      })
      .then(() => {
        alert(`Sopa de letras guardada correctamente en la página ${currentPage + 1}`);
      })
      .catch(error => {
        alert("Error al guardar la sopa de letras. Por favor, asegúrate de completar toda la configuración.");
      });
  }, [elements, pagesList, currentPage, updatePageType]);

  return { saveGame };
}
