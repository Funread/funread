import { useQuizSaver } from "./useQuizSaver";
import { useKonvaSaver } from "./useKonvaSaver";
import { useGamesSaver } from "./useGamesSaver";
import { updatePageType } from "../../../api/pages";
export function usePageSaver(params) {
  const { pagesList } = params;
  const { pagesType } = params; 
  const { currentPage } = params;
  const { saveQuiz } = useQuizSaver(params,updatePageType);
  const { saveKonva } = useKonvaSaver(params,updatePageType);
  const { saveGame } = useGamesSaver(params,updatePageType);

  // Devuelve la función central que elige según el tipo
  const savePage = () => {
   const currentPageId =  pagesList[currentPage].page.pageid
    console.log(params)
    updatePageType(currentPageId, pagesType)
    if (pagesType === 2) return saveKonva();
    if (pagesType === 4) return saveQuiz();
    if (pagesType === 5) return saveGame();

    alert("Tipo de página no soportado");
  };

  return { savePage };
}
