import { useCallback } from "react";
import { updateWidgetItem } from "../../../api/widget";

export function useQuizSaver({
  quizType,
  quizEditorRef,
  quizCompleteEditorRef,
  bookData,
  pagesList,
  currentPage,
  
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

    // Decide which editor to read from using the actual widgetId on the page
    if (widgetId === 8) {
      const quizCompleteJson = quizCompleteEditorRef.current?.getQuizJson();
      if (!quizCompleteJson) {
        alert("Quiz completo no válido");
        return;
      }
      localStorage.setItem(`quiz-complete-page-${currentPage}`, JSON.stringify(quizCompleteJson));
      console.log('Saving COMPLETE widget payload:', { widgetitemid, currentPageId, widgetId, type, value: quizCompleteJson, elementorder });
      updateWidgetItem(widgetitemid, currentPageId, widgetId, type, quizCompleteJson, elementorder)
        .then(() => alert(`Página ${currentPage + 1} guardada correctamente`))
        .catch(e => alert("Error guardando quiz: " + e.message));
      return;
    }
  alert(widgetId);
    if (widgetId === 9) {
      const quizJson = quizEditorRef.current?.getQuizJson();
      if (!quizJson) {
        alert("Quiz no válido");
        return;
      }
      localStorage.setItem(`quiz-page-${currentPage}`, JSON.stringify(quizJson));
      console.log('Saving SINGLE CHOICE widget payload:', { widgetitemid, currentPageId, widgetId, type, value: quizJson, elementorder });
      updateWidgetItem(widgetitemid, currentPageId, widgetId, type, quizJson, elementorder)
        .then(() => alert(`Página ${currentPage + 1} guardada correctamente`))
        .catch(e => alert("Error guardando quiz: " + e.message));
      return;
    }

    alert('Tipo de widget para quiz no soportado: ' + widgetId);
  }, [
    quizEditorRef,
    quizCompleteEditorRef,
    bookData,
    pagesList,
    currentPage
   ]);

   return { saveQuiz };
 }
