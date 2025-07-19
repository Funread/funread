import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

// API
import { createMultipleOptions } from "../../api/options";

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
  const { bookData, pagesList, isLoading, error, loadBookData } = useBookData(id, onLoadPageControl);

  const { savePage } = usePageSaver({
    widget,
    quizEditorRef,
    quizCompleteEditorRef,
    bookData,
    pagesList,
    currentPage,
    createMultipleOptions,
    elements,
    pagesType,
  });

  const {
    addPage,
    cleanElements,
    pageLoading,
    pageError
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

  // Reload page on page change
  useEffect(() => {
    if (!isLoading && pagesList[currentPage]) {
         console.log('pageloader')
           console.log(pagesList)
      onLoadPageControl(pagesList[currentPage]);
      setWidget(pagesList[currentPage].widgetitems[0].widgetid)

    }
  }, [currentPage, pagesList, isLoading]);

  // Guardar datos de juegos
  const handleWordSearchSave = (formData) => {
    if (!pagesList?.[currentPage]?.page) {
      alert("Error: La página no está lista.");
      return;
    }
    setElements(formData);
    savePage();
  };

  const widgetValidation = (widgetId, type) => {
    if (type !== pagesType) {
      cleanElements();
      setWidget(widgetId);
      setPagesType(type);
    }
  };

  return (
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
  );
}
