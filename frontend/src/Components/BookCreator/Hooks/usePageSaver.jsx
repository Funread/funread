import { useQuizSaver } from "./useQuizSaver";
import { useKonvaSaver } from "./useKonvaSaver";
import { useGamesSaver } from "./useGamesSaver";

export function usePageSaver(params) {
  const { pagesType } = params;
  const { saveQuiz } = useQuizSaver(params);
  const { saveKonva } = useKonvaSaver(params);
  const { saveGame } = useGamesSaver(params);

  // Devuelve la función central que elige según el tipo
  const savePage = () => {
    if (pagesType === 2) return saveKonva();
    if (pagesType === 4) return saveQuiz();
    if (pagesType === 5) return saveGame();
    alert("Tipo de página no soportado");
  };

  return { savePage };
}
