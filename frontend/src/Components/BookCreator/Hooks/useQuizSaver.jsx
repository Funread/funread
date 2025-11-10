import { useCallback } from "react";
import { updateWidgetItem } from "../../../api/widget";
import { updatePageType } from "../../../api/pages";

export function useQuizSaver({
  quizType,
  quizEditorRef,
  quizCompleteEditorRef,
  bookData,
  pagesList,
  currentPage,
  widgetId,
}) {
console.log('useQuizSaver', quizType, currentPage, pagesList);
  const saveQuiz = useCallback(() => {
    if (!pagesList || !pagesList[currentPage] || !pagesList[currentPage].page) {
      alert("Página no disponible");
      return;
    }

    const currentPageId = pagesList[currentPage].page.pageid;
    const widgetItem = pagesList[currentPage].widgetitems[0];
 
    if (!widgetItem) {
      alert("No se encontró widgetitem en la página actual.");
      return;
    }
 
    const widgetitemid = widgetItem.widgetitemid;
    const elementorder = widgetItem.elementorder ?? 0;
    const type = 4; // Tipo de página para quiz
    
    // Usar el widgetId del parámetro (representa el widget deseado del estado local)
    // El widgetItem.widgetid puede estar desactualizado si acabamos de convertir la página
    const currentWidgetId = widgetItem.widgetid;
    console.log('currentWidgetId from page:', currentWidgetId, 'param widgetId (desired):', widgetId);

    // Usar el widgetId del parámetro para decidir qué editor usar
    if (widgetId === 8) {
      console.log('Quiz Complete - Verificando ref:', quizCompleteEditorRef);
      console.log('Quiz Complete - Ref.current:', quizCompleteEditorRef.current);
      
      const quizCompleteJson = quizCompleteEditorRef.current?.getQuizJson();
      console.log('Quiz Complete - JSON obtenido:', quizCompleteJson);
      
      if (quizCompleteJson === null) {
        // Validación falló (campos parcialmente llenos), no guardar
        console.log('Quiz Complete - Validación falló (null)');
        return;
      }
      if (!quizCompleteJson) {
        // Ref no disponible
        console.log('Quiz Complete - Ref no disponible o undefined');
        alert("Editor no disponible");
        return;
      }
      localStorage.setItem(`quiz-complete-page-${currentPage}`, JSON.stringify(quizCompleteJson));
      console.log('Saving COMPLETE widget payload:', { widgetitemid, currentPageId, widgetId, type, value: quizCompleteJson, elementorder });
      
      updatePageType(currentPageId, type)
        .then(() => updateWidgetItem(widgetitemid, currentPageId, widgetId, type, quizCompleteJson, elementorder))
        .then(() => alert(`Página ${currentPage + 1} guardada correctamente`))
        .catch(e => {
          console.error('Error guardando quiz completo:', e);
          alert("Error guardando quiz: " + (e?.response?.data?.error || e.message));
        });
      return;
    }

    if (widgetId === 9) {
      const quizJson = quizEditorRef.current?.getQuizJson();
      
      if (quizJson === null) {
        return;
      }
      if (!quizJson) {
        alert("Editor no disponible");
        return;
      }
      localStorage.setItem(`quiz-page-${currentPage}`, JSON.stringify(quizJson));
      console.log('Saving MULTIPLE CHOICE widget payload:', { widgetitemid, currentPageId, widgetId, type, value: quizJson, elementorder });
      
      updatePageType(currentPageId, type)
        .then(() => updateWidgetItem(widgetitemid, currentPageId, widgetId, type, quizJson, elementorder))
        .then(() => alert(`Página ${currentPage + 1} guardada correctamente`))
        .catch(e => {
          console.error('Error guardando quiz:', e);
          alert("Error guardando quiz: " + (e?.response?.data?.error || e.message));
        });
      return;
    }

  }, [
    quizEditorRef,
    quizCompleteEditorRef,
    bookData,
    pagesList,
    currentPage
   ]);

   return { saveQuiz };
 }