import { useCallback } from "react";
import { updateWidgetItem } from "../../../api/widget";
import { updatePageType } from "../../../api/pages";
import { toast } from "react-toastify";

export function useGamesSaver({ elements, pagesList, currentPage, setPagesList }) {
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
          // CRITICAL: Primero actualizar el tipo de página, luego el widget
          updatePageType(currentPageId, type)
            .then(() => updateWidgetItem(widgetitemid, currentPageId, widgetId, type, value, elementorder))
            .then(() => {
              if (setPagesList) {
                const pageIndex = currentPage;
                setPagesList(prev => {
                  // Hacer copia profunda de TODO el array para romper cualquier referencia compartida
                  const updated = JSON.parse(JSON.stringify(prev));
                  if (updated[pageIndex] && updated[pageIndex].widgetitems && updated[pageIndex].widgetitems[0]) {
                    updated[pageIndex].page.type = type;
                    updated[pageIndex].widgetitems[0].widgetid = widgetId;
                    updated[pageIndex].widgetitems[0].value = value;
                  }
                  return updated;
                });
              }
              toast.success(`Sopa de letras guardada correctamente en la página ${currentPage + 1}`);
            })
            .catch((e) => {
              console.error("Error guardando sopa de letras", e);
              alert("Error al guardar la sopa de letras. Por favor, inténtalo nuevamente.");
            });
        } else {
          throw new Error("No hay configuración válida para guardar");
        }
      } catch (error) {
        alert("Error al guardar la sopa de letras. Por favor, asegúrate de completar toda la configuración.");
      } 
    
  }, [elements, pagesList, currentPage, setPagesList]);

  return { saveGame };
}
