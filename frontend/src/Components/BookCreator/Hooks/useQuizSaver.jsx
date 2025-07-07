import { useCallback } from "react";
import { newWidgetItem } from "../../../api/widget";

export function useQuizSaver({ quizType, quizEditorRef, quizCompleteEditorRef, bookData, pagesList, currentPage, updatePageType, createMultipleOptions }) {
  const saveQuiz = useCallback(() => {
    if (!pagesList || !pagesList[currentPage] || !pagesList[currentPage].page) {
      alert("Página no disponible");
      return;
    }
    const currentPageId = pagesList[currentPage].page.pageid;
    const widgetId = 9;
    if (quizType === "complete") {
      const quizCompleteJson = quizCompleteEditorRef.current?.getQuizJson();
      if (!quizCompleteJson) {
        alert("Quiz completo no válido");
        return;
      }
      localStorage.setItem(`quiz-complete-page-${currentPage}`, JSON.stringify(quizCompleteJson));
      newWidgetItem(currentPageId, widgetId, 4, quizCompleteJson, 0)
        .then(() => updatePageType(currentPageId, 4))
        .catch(e => alert("Error guardando quiz: " + e.message));
    } else {
      const quizJson = quizEditorRef.current?.getQuizJson();
      if (!quizJson) {
        alert("Quiz no válido");
        return;
      }
      localStorage.setItem(`quiz-page-${currentPage}`, JSON.stringify(quizJson));
      newWidgetItem(currentPageId, widgetId, 4, quizJson, 0)
        .then(res => {
          createMultipleOptions(quizJson.options, res.data.widgetitemid, bookData.createdby);
          updatePageType(currentPageId, 4);
        })
        .catch(e => alert("Error guardando quiz: " + e.message));
    }
    alert(`Página ${currentPage + 1} guardada correctamente`);
  }, [quizType, quizEditorRef, quizCompleteEditorRef, bookData, pagesList, currentPage, updatePageType, createMultipleOptions]);

  return { saveQuiz };
}
