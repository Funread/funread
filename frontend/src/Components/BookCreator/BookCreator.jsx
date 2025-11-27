import { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

// API
import { updateWidgetItem, newWidgetItem } from "../../api/widget";
import { updatePageType } from "../../api/pages";
// Hooks
import { usePageSaver } from "./Hooks/usePageSaver";
import { useBookData } from "./Hooks/useBookData";
import { usePages } from "./Hooks/usePages";
import { usePageManagement } from "./Hooks/usePageManagement";
import { useUnsavedChanges } from "./Hooks/useUnsavedChanges";

// UTILS
import { handlePageLoad } from "./Utils/pageLoader";

// COMPONENTES
import ToolBar from "./Components/ToolBar";
import Footer from "./Components/Footer";
import BookSidebarPanel from "./Components/BookSidebarPanel/BookSidebarPanel";
import BookCentralEditor from "./Components/BookCentralEditor/BookCentralEditor";
import UnsavedChangesModal from "./Components/UnsavedChangesModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookCreator() {
  const { id } = useParams();

  // Estado general
  const [currentPage, setCurrentPage] = useState(0);
  const [elements, setElements] = useState([]);
  
  const [selectedId, setSelectedId] = useState(null);
  const [images, setImages] = useState({});
  const [pagesType, setPagesType] = useState(2); // 2=canvas, 4=quiz, 5=gamify
  const [widget, setWidget] = useState(2);

  // Refs
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const quizEditorRef = useRef(null);
  const quizCompleteEditorRef = useRef(null);
  const isLoadingFromBackendRef = useRef(false);

  // Nuevo estado para quiz
  const [quizData, setQuizData] = useState(null);

  // Callback para cargar los datos por tipo - usar useCallback para estabilidad
  const onLoadPageControl = useCallback((page) => {
    isLoadingFromBackendRef.current = true;
    handlePageLoad(page, setElements, setPagesType, currentPage, setQuizData);
    // Reset el flag después de un tick para dar tiempo a que setElements se ejecute
    setTimeout(() => {
      isLoadingFromBackendRef.current = false;
    }, 100); // Aumentado a 100ms para dar más tiempo
  }, [currentPage]); // Dependencia de currentPage

  // Custom hooks
  const { bookData, pagesList, isLoading, error, loadBookData, setPagesList } = useBookData(id, onLoadPageControl);

  const { savePage } = usePageSaver({
    widget,
    quizEditorRef,
    quizCompleteEditorRef,
    bookData,
    pagesList,
    setPagesList,
    currentPage,
    elements,
    pagesType,
  });

  const {
    addPage,
    cleanElements,
    pageLoading,
    pageError,
    SessionModal
  } = usePages({
    id,
    loadBookData,
    setCurrentPage,
    setElements,
    setSelectedId,
    pagesList
  });

  const {
    handleDeletePage,
    movePageForward,
    movePageBackward,
    navigateToNextPage: unsafeNavigateToNextPage,
    navigateToPreviousPage: unsafeNavigateToPreviousPage,
    isLoading: pageManagementLoading,
    error: pageManagementError,
  } = usePageManagement({
    loadBookData,
    pagesList,
    currentPage,
    setCurrentPage,
    onError: (error) => {
      console.error("Page management error:", error);
      alert(error);
    },
  });

  // Hook para detectar cambios no guardados
  const {
    hasUnsavedChanges,
    handlePageChangeRequest,
    markAsSaved,
    showModal,
    handleSave,
    handleDiscard,
    handleCancel,
  } = useUnsavedChanges({
    elements,
    currentPage,
    pagesList,
    savePage,
  });

  // Función segura para cambiar de página que verifica cambios no guardados
  const safeSetCurrentPage = (newPageIndex) => {
    handlePageChangeRequest(newPageIndex, setCurrentPage);
  };

  // Funciones de navegación seguras que auto-guardan antes de cambiar
  const navigateToNextPage = (currentPageIndex) => {
    if (currentPageIndex >= pagesList.length - 1) return;
    safeSetCurrentPage(currentPageIndex + 1);
  };

  const navigateToPreviousPage = (currentPageIndex) => {
    if (currentPageIndex <= 0) return;
    safeSetCurrentPage(currentPageIndex - 1);
  };

  // Función de guardado que marca como guardado después de éxito
  const savePageWithConfirmation = async () => {
    try {
      await savePage();
      markAsSaved();
    } catch (error) {
      console.error('Error saving page:', error);
      throw error;
    }
  };

  // Load initial data
  useEffect(() => {
    if (id) {
      loadBookData(0); // Cargar la primera página
    }
  }, [id]);

  // Cargar la página cuando cambia currentPage (navegación entre páginas)
  useEffect(() => {
    if (!isLoading && pagesList.length > 0 && pagesList[currentPage]) {
      const rawType = pagesList[currentPage].page?.type;
      let normalizedType = rawType;
      if (rawType === 1) normalizedType = 2;
      if (typeof normalizedType !== 'undefined') setPagesType(normalizedType);

      const wi = pagesList[currentPage].widgetitems?.[0];
      if (wi && wi.widgetid) {
        setWidget(wi.widgetid);
      } else {
        setWidget(2);
      }

      // CRITICAL: Llamar onLoadPageControl para cargar los elementos de la nueva página
      // Esto carga los elementos desde pagesList (que ya tiene las últimas actualizaciones en memoria)
      onLoadPageControl(pagesList[currentPage]);
    }
  }, [currentPage, isLoading, pagesList, onLoadPageControl]); // Incluir pagesList para que se actualice cuando guardemos

  // Guardar datos de juegos
  const handleWordSearchSave = async (formData) => {
    if (!pagesList?.[currentPage]?.page) {
      alert("Error: La página no está lista.");
      return;
    }
    
    // Primero actualizar los elementos en el estado
    setElements(formData);
    setPagesType(5);
    
    // Guardar directamente con los datos del formulario
    const currentPageId = pagesList[currentPage].page.pageid;
    const widgetitemid = pagesList[currentPage].widgetitems[0].widgetitemid;
    const widgetId = 9;
    const type = 5;
    
    try {
      if (formData && formData.words && formData.words.length >= 3) {
        console.log('=== Saving Word Search ===');
        console.log('Form data:', formData);
        console.log('Widget item ID:', widgetitemid);
        console.log('Page ID:', currentPageId);
        
        // CRITICAL: Primero actualizar el tipo de página
        await updatePageType(currentPageId, type);
        console.log('✅ updatePageType successful');
        
        // Luego actualizar el widget
        await updateWidgetItem(widgetitemid, currentPageId, widgetId, type, formData, 0);
        console.log('✅ updateWidgetItem successful');
        
        // Actualizar pagesList en memoria
        if (setPagesList) {
          const pageIndex = currentPage;
          setPagesList(prev => {
            const updated = JSON.parse(JSON.stringify(prev));
            if (updated[pageIndex] && updated[pageIndex].widgetitems && updated[pageIndex].widgetitems[0]) {
              updated[pageIndex].page.type = type;
              updated[pageIndex].widgetitems[0].widgetid = widgetId;
              updated[pageIndex].widgetitems[0].value = formData;
              console.log('✅ pagesList updated in memory');
              console.log('Updated page:', updated[pageIndex]);
            }
            return updated;
          });
        }
        
        toast.success(`Sopa de letras guardada correctamente en la página ${currentPage + 1}`);
        markAsSaved();
      } else {
        throw new Error("No hay configuración válida para guardar");
      }
    } catch (error) {
      console.error("Error guardando sopa de letras:", error);
      alert("Error al guardar la sopa de letras. Por favor, inténtalo nuevamente.");
    }
  };

  const widgetValidation = async (widgetId, type) => {
    const page = pagesList?.[currentPage]?.page;
    const widgetItem = pagesList?.[currentPage]?.widgetitems?.[0];

    // Si no hay sesión (no hay page), mostrar modal de sesión expirada
    if (!page) {
      if (typeof document !== 'undefined' && window.ReactDOM) {
        // Evita múltiples modales
        if (!document.getElementById('session-expired-modal')) {
          const modalDiv = document.createElement('div');
          modalDiv.id = 'session-expired-modal';
          document.body.appendChild(modalDiv);
          import('./Components/SessionExpiredModal').then(({ default: SessionExpiredModal }) => {
            window.ReactDOM.render(
              <SessionExpiredModal show={true} onClose={() => { window.location.href = '/'; }} />,
              modalDiv
            );
          });
        }
      }
      return;
    }

    // Si no existe widgetItem aún, crearlo con plantilla por defecto y actualizar UI localmente
    if (!widgetItem) {
      try {
        let defaultValue = {};
        if (widgetId === 8) {
          defaultValue = {
            type: 'COMPLETE',
            content: { title: '', question: '', correctAnswer: '', points: 10 }
          };
        } else if (widgetId === 9) {
          defaultValue = {
            type: 'singleChoice',
            content: { title: '', question: '' },
            options: [
              { answer: '', isCorrect: true, points: 10, isActive: true },
              { answer: '', isCorrect: false, points: 10, isActive: true },
              { answer: '', isCorrect: false, points: 10, isActive: true }
            ]
          };
        }

        const res = await newWidgetItem(page.pageid, widgetId, type, defaultValue, 0);
        // Inject created widgetItem into local pagesList so subsequent saves see it
        try {
          const created = res?.data?.widgetitem ?? res?.data;
          if (created && typeof setPagesList === 'function') {
            setPagesList(prev => {
              const newPages = Array.isArray(prev) ? [...prev] : [];
              const pageIndex = currentPage;
              // Ensure page slot exists
              while (newPages.length <= pageIndex) newPages.push({ page: page, widgetitems: [] });
              const current = { ...newPages[pageIndex] };
              current.widgetitems = Array.isArray(current.widgetitems) ? [created, ...current.widgetitems] : [created];
              newPages[pageIndex] = current;
              return newPages;
            });
          }
        } catch (err) {
          console.error('Error injecting widgetitem into pagesList', err);
        }

        // Actualizar UI local sin recargar todo el libro
        setWidget(widgetId);
        setPagesType(type);
        setElements(defaultValue);
        return;
      } catch (e) {
        alert('Error creando widget: ' + (e.message || e));
        return;
      }
    }

    // Determine current backend widget id and page type to decide updates
    const existingWidgetId = widgetItem?.widgetid;
    const rawPageType = page?.type;
    let normalizedRawType = rawPageType;
    if (rawPageType === 1) normalizedRawType = 2;

    const pageTypeChanged = normalizedRawType !== type;
    const widgetIdChanged = existingWidgetId !== widgetId;

    // Solo limpiar elementos si el TIPO realmente cambió (no solo el widget)
    // Por ejemplo, si pasamos de quiz (tipo 4) a canvas (tipo 2)
    if (pagesType !== type) {
      cleanElements();
      setWidget(widgetId);
      setPagesType(type);
    } else if (widget !== widgetId) {
      // Si solo cambió el widget pero no el tipo, solo actualizar el widget
      setWidget(widgetId);
    }

    // Actualiza el widget en el backend solo si el widget real en la página o el tipo cambiaron
    if (widgetIdChanged || pageTypeChanged) {
      try {
        // Si el widget actual se convierte a quiz y el value no tiene la estructura esperada,
        // usar una plantilla por defecto para evitar errores del backend que esperan widgetid específico.
        const existingValue = widgetItem.value || {};
        let dataToSend = existingValue;
        const isConvertingToComplete = widgetId === 8;
        const isConvertingToSingle = widgetId === 9;

        if (isConvertingToComplete) {
          const valid = existingValue && (existingValue.type === 'COMPLETE' || existingValue.type === 'complete');
          if (!valid) {
            dataToSend = { type: 'COMPLETE', content: { title: '', question: '', correctAnswer: '', points: 10 } };
          }
        } else if (isConvertingToSingle) {
          const valid = existingValue && (existingValue.type === 'singleChoice');
          if (!valid) {
            dataToSend = { 
              type: 'singleChoice', 
              content: { title: '', question: '' }, 
              options: [
                { answer: '', isCorrect: true, points: 10, isActive: true },
                { answer: '', isCorrect: false, points: 10, isActive: true },
                { answer: '', isCorrect: false, points: 10, isActive: true }
              ]
            };
          }
        }
        await updateWidgetItem(
          widgetItem.widgetitemid,
          page.pageid,
          widgetId,
          type,
          dataToSend,
          widgetItem.elementorder ?? 0
        );
        // No recargamos todo el libro: actualizamos solo estado local para que el editor muestre cambio
        setWidget(widgetId);
        setPagesType(type);
        // Solo establecer elements si el tipo cambió (no para canvas tipo 2 que maneja sus propios elementos)
        if (pageTypeChanged && dataToSend && Object.keys(dataToSend).length > 0) {
          setElements(dataToSend);
        }
      } catch (e) {
        console.error('Error updating widget:', e);
        // Mostrar más info si viene del backend
        const msg = e?.response?.data?.error || e?.response?.data || e.message || String(e);
        alert("Error actualizando widget: " + msg);
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {SessionModal}
      <UnsavedChangesModal
        isOpen={showModal}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onCancel={handleCancel}
      />
      <div className="flex flex-row h-screen w-full bg-gray-200 min-w-0">
        {/* Sidebar y panel lateral */}
        <BookSidebarPanel
          widgetValidation={widgetValidation}
          setElements={setElements}
          setImages={setImages}
          changeQuizType={() => {}}
          savePage={savePage}
          hasUnsavedChanges={hasUnsavedChanges}
        />
        {/* Contenido principal */}
        <div className="flex-1 flex flex-col min-w-0">
          <ToolBar
            elements={elements}
            setElements={setElements}
            savePageToLocalStorage={savePageWithConfirmation}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            bookData={bookData}
            pagesType={pagesType}
            pageId={currentPage}
            currentPage={currentPage}
            totalPages={pagesList.length}
            onSwapPageBackward={movePageBackward}
            onSwapPageForward={movePageForward}
            pageManagementLoading={pageManagementLoading}
            hasUnsavedChanges={hasUnsavedChanges}
          />
          <div className="flex-1 min-h-0 p-4 bg-white m-2 shadow-md rounded-lg overflow-auto min-w-0">
            <BookCentralEditor
              isLoading={isLoading}
              pagesType={pagesType}
              widget={widget}
              elements={elements}
              setElements={setElements}
              images={images}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              stageRef={stageRef}
              transformerRef={transformerRef}
              quizEditorRef={quizEditorRef}
              quizCompleteEditorRef={quizCompleteEditorRef}
              currentPage={currentPage}
              handleWordSearchSave={handleWordSearchSave}
              quizData={quizData}
            />
          </div>
          {!isLoading && (
            <Footer
              pages={pagesList}
              currentPage={currentPage}
              setCurrentPage={safeSetCurrentPage}
              addPage={addPage}
              onDeletePage={handleDeletePage}
              onNavigatePrevious={navigateToPreviousPage}
              onNavigateNext={navigateToNextPage}
              pageManagementLoading={pageManagementLoading}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          )}
        </div>
      </div>
    </>
  );
}
