import { useQuizSaver } from "./useQuizSaver";
import { useKonvaSaver } from "./useKonvaSaver";
import { useGamesSaver } from "./useGamesSaver";
import { updatePageType } from "../../../api/pages";

export function usePageSaver(params) {
  const { pagesList, pagesType, currentPage, widget } = params;
  
  const quizSaverComplete = useQuizSaver({
    ...params,
    quizType: "complete",
    widgetId: 8
  });

  const quizSaverSingle = useQuizSaver({
    ...params,
    quizType: "singleChoice",
    widgetId:9
  });

  const { saveKonva } = useKonvaSaver(params);
  const { saveGame } = useGamesSaver(params);

  const savePage = () => {
    const currentPageId = pagesList[currentPage]?.page?.pageid;
    const widgetItem = pagesList[currentPage]?.widgetitems?.[0];

    if (!currentPageId || !widgetItem) {
      alert("No se encontró información de la página o el widget.");
      return Promise.reject(new Error("No se encontró información de la página o el widget."));
    }

    if (pagesType === 4) {
      if (widget === 8) {
        return quizSaverComplete.saveQuiz();
      } else if (widget === 9) {
        return quizSaverSingle.saveQuiz();
      } else {
        if (widgetItem.widgetid === 8) {
          return quizSaverComplete.saveQuiz();
        } else {
          return quizSaverSingle.saveQuiz();
        }
      }
    }

    // NO llamar updatePageType aquí - cada saver lo hace internamente
    // updatePageType(currentPageId, pagesType);

    if (pagesType === 2) return saveKonva();
    if (pagesType === 5) return saveGame();
    
    // Retornar una Promise resuelta si no hay acción específica
    return Promise.resolve();
  };

  return { savePage };
}
