import { useQuizSaver } from "./useQuizSaver";
import { useKonvaSaver } from "./useKonvaSaver";
import { useGamesSaver } from "./useGamesSaver";
import { updatePageType } from "../../../api/pages";

export function usePageSaver(params) {
  const { pagesList, pagesType, currentPage } = params;
console.log('usePageSaver',params)
  // Creamos ambos hooks de quiz de una vez (aunque usemos solo uno después)
  const quizSaverComplete = useQuizSaver({
    ...params,
    quizType: "complete",
    widgetId: 8 // Asumiendo que 8 es el ID del widget de quiz completo
  });

  const quizSaverSingle = useQuizSaver({
    ...params,
    quizType: "singleChoice",
    widgetId:9 // Asumiendo que 9 es el ID del widget de quiz completo
  });

  const { saveKonva } = useKonvaSaver(params, updatePageType);
  const { saveGame } = useGamesSaver(params, updatePageType);

  const savePage = () => {
    const currentPageId = pagesList[currentPage]?.page?.pageid;
    const widgetItem = pagesList[currentPage]?.widgetitems?.[0];

    if (!currentPageId || !widgetItem) {
      alert("No se encontró información de la página o el widget.");
      return;
    }

    // Actualizar tipo de página
    updatePageType(currentPageId, pagesType);

    if (pagesType === 2) return saveKonva();
    if (pagesType === 5) return saveGame();

    if (pagesType === 4) {
      // Selecciona el tipo de guardado dinámicamente
      if (widgetItem.widgetid === 8) {
        return quizSaverComplete.saveQuiz();
      } else {
        return quizSaverSingle.saveQuiz();
      }
    }

  
  };

  return { savePage };
}
