import { useCallback } from "react";
import { updateWidgetItem } from "../../../api/widget";
import { updatePageType } from "../../../api/pages";
import { toast } from "react-toastify";

export function useQuizSaver({
  quizType,
  quizEditorRef,
  quizCompleteEditorRef,
  bookData,
  pagesList,
  currentPage,
  widgetId,
  setPagesList,
}) {
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


    // Usar el widgetId del parámetro para decidir qué editor usar
    if (widgetId === 8) {

      
      const quizCompleteJson = quizCompleteEditorRef.current?.getQuizJson();
 
      if (quizCompleteJson === null) {
        // Validación falló (campos parcialmente llenos), no guardar
    
        return;
      }
      if (!quizCompleteJson) {
        // Ref no disponible

        alert("Editor no disponible");
        return;
      }
      localStorage.setItem(`quiz-complete-page-${currentPage}`, JSON.stringify(quizCompleteJson));
      
      
      updatePageType(currentPageId, type)
        .then(() => updateWidgetItem(widgetitemid, currentPageId, widgetId, type, quizCompleteJson, elementorder))
        .then(() => {
          // Actualizar pagesList con el nuevo valor guardado
          if (setPagesList) {
            const pageIndex = currentPage;
            setPagesList(prev => {
              // Hacer copia profunda de TODO el array para romper cualquier referencia compartida
              const updated = JSON.parse(JSON.stringify(prev));
              if (updated[pageIndex] && updated[pageIndex].widgetitems && updated[pageIndex].widgetitems[0]) {
                updated[pageIndex].page.type = type;
                updated[pageIndex].widgetitems[0].widgetid = widgetId;
                updated[pageIndex].widgetitems[0].value = quizCompleteJson;
              }
              return updated;
            });
          }
          toast.success(`Página ${currentPage + 1} guardada correctamente`);
        })
        .catch(e => {
   
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
   
      
      updatePageType(currentPageId, type)
        .then(() => updateWidgetItem(widgetitemid, currentPageId, widgetId, type, quizJson, elementorder))
        .then(() => {
          // Actualizar pagesList con el nuevo valor guardado
          if (setPagesList) {
            const pageIndex = currentPage;
            setPagesList(prev => {
              // Hacer copia profunda de TODO el array para romper cualquier referencia compartida
              const updated = JSON.parse(JSON.stringify(prev));
              if (updated[pageIndex] && updated[pageIndex].widgetitems && updated[pageIndex].widgetitems[0]) {
                updated[pageIndex].page.type = type;
                updated[pageIndex].widgetitems[0].widgetid = widgetId;
                updated[pageIndex].widgetitems[0].value = quizJson;
              }
              return updated;
            });
          }
          toast.success(`Página ${currentPage + 1} guardada correctamente`);
        })
        .catch(e => {

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