import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

// API
import { updateWidgetItem, newWidgetItem } from "../../api/widget";
// Hooks
import { usePageSaver } from "./Hooks/usePageSaver";
import { useBookData } from "./Hooks/useBookData";
import { usePages } from "./Hooks/usePages";

// UTILS
import { handlePageLoad } from "./Utils/pageLoader";

// COMPONENTES
import ToolBar from "./Components/ToolBar";
import Footer from "./Components/Footer";
import BookSidebarPanel from "./Components/BookSidebarPanel/BookSidebarPanel";
import BookCentralEditor from "./Components/BookCentralEditor/BookCentralEditor";

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

  // Reload page on page change
  useEffect(() => {
    if (!isLoading && pagesList[currentPage]) {
         console.log('pageloader')
           console.log(pagesList)
      // Set pagesType synchronously from pagesList to avoid transient render mismatch
      const rawType = pagesList[currentPage].page?.type;
      let normalizedType = rawType;
      if (rawType === 1) normalizedType = 2; // tratar type 1 como canvas (2)
      if (typeof normalizedType !== 'undefined') setPagesType(normalizedType);

      // Guardar contra páginas nuevas sin widgetitems (evita crash al acceder a [0])
      const wi = pagesList[currentPage].widgetitems?.[0];
      if (wi && wi.widgetid) {
        setWidget(wi.widgetid);
      } else {
        // Si no hay widget en la página nueva, usar widget por defecto (canvas)
        setWidget(2);
      }

      // Cargar datos (async) — esto puede actualizar pagesType/elements cuando termine
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
          content: { title: 'Nuevo Quiz', question: 'Escribe la pregunta aquí', correctAnswer: '', points: 0 }
        };
      } else if (widgetId === 9) {
        defaultValue = {
          type: 'singleChoice',
          content: { title: 'Nuevo Quiz', question: 'Escribe la pregunta aquí' },
          options: []
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
          dataToSend = { type: 'COMPLETE', content: { title: 'Nuevo Quiz', question: 'Escribe la pregunta aquí', correctAnswer: '', points: 0 } };
        }
      } else if (isConvertingToSingle) {
        const valid = existingValue && (existingValue.type === 'singleChoice');
        if (!valid) {
          dataToSend = { type: 'singleChoice', content: { title: 'Nuevo Quiz', question: 'Escribe la pregunta aquí' }, options: [] };
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
      <div className="flex h-screen w-full bg-gray-200">
      <BookSidebarPanel
        widgetValidation={widgetValidation}
        setElements={setElements}
        setImages={setImages}
        changeQuizType={() => {}}
      />

      <div className="flex-1 flex flex-col ml-[364px]">
        <ToolBar
          elements={elements}
          setElements={setElements}
          savePageToLocalStorage={savePage}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          bookData={bookData}
          pagesType={pagesType}
          pageId={currentPage}
        />

        <div className="flex-1 p-4 bg-white m-2 shadow-md rounded-lg" style={{ height: "calc(100vh - 80px)" }}>
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
      </div>

      {!isLoading && (
        <Footer
          pages={pagesList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          addPage={addPage}
        />
      )}
      </div>
    </>
  );
}
