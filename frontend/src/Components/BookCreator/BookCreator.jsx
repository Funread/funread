import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

// API
import { updateWidgetItem, newWidgetItem } from "../../api/widget";
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

  // Nuevo estado para quiz
  const [quizData, setQuizData] = useState(null);

  // Callback para cargar los datos por tipo
  const onLoadPageControl = (page) => {
    handlePageLoad(page, setElements, setPagesType, currentPage, setQuizData);
  };

  // Custom hooks
  const { bookData, pagesList, isLoading, error, loadBookData, setPagesList } = useBookData(id, onLoadPageControl);

  const { savePage } = usePageSaver({
    widget,
    quizEditorRef,
    quizCompleteEditorRef,
    bookData,
    pagesList,
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
      loadBookData();
    }
  }, [id]);

  // Refresh book data whenever the current page changes to ensure we load any remote updates
  useEffect(() => {
    if (id) {
      loadBookData();
    }
  }, [currentPage]);

  useEffect(() => {
    if (!isLoading && pagesList[currentPage]) {
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

      onLoadPageControl(pagesList[currentPage]);
    }
  }, [currentPage, pagesList, isLoading]);

  // Guardar datos de juegos
  const handleWordSearchSave = (formData) => {
    if (!pagesList?.[currentPage]?.page) {
      alert("Error: La página no está lista.");
      return;
    }
    setElements(formData);
    // Asegurarse de que el tipo de página esté en 'games' (5) antes de guardar
    setPagesType(5);
    // Dejar que React actualice el estado y luego llamar a savePage
    setTimeout(() => {
      savePage();
    }, 0);
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

    // Solo limpiar si el tipo de página realmente cambia
    // if (pagesType !== type || widget !== widgetId) {
    //   cleanElements();
    //   setWidget(widgetId);
    //   setPagesType(type);
    // }

    // Determine current backend widget id and page type to decide updates
    const existingWidgetId = widgetItem?.widgetid;
    const rawPageType = page?.type;
    let normalizedRawType = rawPageType;
    if (rawPageType === 1) normalizedRawType = 2;

    const pageTypeChanged = normalizedRawType !== type;
    const widgetIdChanged = existingWidgetId !== widgetId;

    // Update local UI immediately if necessary
    if (pagesType !== type || widget !== widgetId) {
      cleanElements();
      setWidget(widgetId);
      setPagesType(type);
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
        if (dataToSend && Object.keys(dataToSend).length > 0) {
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
              onMovePageBackward={movePageBackward}
              onMovePageForward={movePageForward}
              pageManagementLoading={pageManagementLoading}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          )}
        </div>
      </div>
    </>
  );
}
