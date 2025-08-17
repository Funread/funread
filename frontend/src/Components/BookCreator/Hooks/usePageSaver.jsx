import { useQuizSaver } from "./useQuizSaver";
import { useKonvaSaver } from "./useKonvaSaver";
import { useGamesSaver } from "./useGamesSaver";
import { updatePageType } from "../../../api/pages";

export function usePageSaver(params) {
  const { pagesList, pagesType, currentPage } = params;

  // Creamos ambos hooks de quiz de una vez (aunque usemos solo uno después)
  const quizSaverComplete = useQuizSaver({
    ...params,
    quizType: "complete"
  });

  const quizSaverSingle = useQuizSaver({
    ...params,
    quizType: "singleChoice"
  });

  const { saveKonva } = useKonvaSaver(params, updatePageType);
  const { saveGame } = useGamesSaver(params, updatePageType);

  const savePage = () => {
    const currentPageId = pagesList[currentPage]?.page?.pageid;
    const widgetItem = pagesList[currentPage]?.widgetitems?.[0];

    if (!currentPageId) {
      alert("No se encontró información de la página.");
      return;
    }

    // Actualizar tipo de página
    updatePageType(currentPageId, pagesType);

    if (pagesType === 2) return saveKonva();
    if (pagesType === 5) return saveGame();

    if (pagesType === 4) {
      if (!widgetItem) {
        alert('No se encontró widget en la página para guardar el quiz.');
        return;
      }
      // Selecciona el tipo de guardado dinámicamente
      if (widgetItem.widgetid === 8) {
        return quizSaverComplete.saveQuiz();
      } else {
        return quizSaverSingle.saveQuiz();
      }
    }

    alert("Tipo de página no soportado");
  };

  return { savePage };
}
