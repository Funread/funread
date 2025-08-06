import { useCallback } from "react";
import { updateWidgetItem } from "../../../api/widget";

export function useQuizSaver({
  quizType,
  quizEditorRef,
  quizCompleteEditorRef,
  bookData,
  pagesList,
  currentPage,
  createMultipleOptions
}) {

  const saveQuiz = useCallback(() => {
    if (!pagesList || !pagesList[currentPage] || !pagesList[currentPage].page) {
      alert("Página no disponible");
      return;
    }

    const currentPageId = pagesList[currentPage].page.pageid;
    const widgetItem = pagesList[currentPage].widgetitems[0];
  console.log('asdasdasds')
    console.log(widgetItem)
    if (!widgetItem) {
      alert("No se encontró widgetitem en la página actual.");
      return;
    }

    const widgetId = widgetItem.widgetid;
    const widgetitemid = widgetItem.widgetitemid;
    const elementorder = widgetItem.elementorder ?? 0;
    const type = 4; // Tipo de página para quiz

    if (quizType === "complete") {
      if (widgetId !== 8) {
        alert("Error: Este widget no corresponde a un quiz completo (se esperaba widgetid=8).");
        return;
      }

      const quizCompleteJson = quizCompleteEditorRef.current?.getQuizJson();
      if (!quizCompleteJson) {
        alert("Quiz completo no válido");
        return;
      }

      localStorage.setItem(`quiz-complete-page-${currentPage}`, JSON.stringify(quizCompleteJson));

      updateWidgetItem(widgetitemid, currentPageId, widgetId, type, quizCompleteJson, elementorder)
        .then(() => alert(`Página ${currentPage + 1} guardada correctamente`))
        .catch(e => alert("Error guardando quiz: " + e.message));
    } else {
      if (widgetId !== 9) {
        alert("Error: Este widget no corresponde a un quiz de selección (se esperaba widgetid=9).");
        return;
      }

      const quizJson = quizEditorRef.current?.getQuizJson();
      if (!quizJson) {
        alert("Quiz no válido");
        return;
      }

      localStorage.setItem(`quiz-page-${currentPage}`, JSON.stringify(quizJson));

      updateWidgetItem(widgetitemid, currentPageId, widgetId, type, quizJson, elementorder)
        .then(res => {
          createMultipleOptions(quizJson.options, res.data.widgetitemid, bookData.createdby);
          alert(`Página ${currentPage + 1} guardada correctamente`);
        })
        .catch(e => alert("Error guardando quiz: " + e.message));
    }
  }, [
    quizType,
    quizEditorRef,
    quizCompleteEditorRef,
    bookData,
    pagesList,
    currentPage,
    createMultipleOptions
  ]);

  return { saveQuiz };
}
