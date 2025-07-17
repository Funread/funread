import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
// API CALLS

import { createMultipleOptions, list_options_by_idwidgetitem } from "../../api/options";
// Hooks
import { usePageSaver } from "./Hooks/usePageSaver"; //Orquestador de salvado
import { useBookData } from "./Hooks/useBookData";//Carga todo el data
import { usePages } from "./Hooks/usePages";
//UTILS
import { formatQuizData } from "./Utils/formatters";
import { handlePageLoad } from "./Utils/pageLoader";
//CONSTANTs
import { WidgetTypes,getWidgetLabelById } from "./Constants/widgetsTypeEnum";
// SUBCOMPONENTS
import ToolBar from "./Components/ToolBar";
import Footer from "./Components/Footer";
import BookSidebarPanel from "./Components/BookSidebarPanel/BookSidebarPanel";
import BookCentralEditor from "./Components/BookCentralEditor/BookCentralEditor";

export default function BookCreator() {
  // ---- Estados y refs principales ----
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [images, setImages] = useState({});
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const quizEditorRef = useRef(null);
  const quizCompleteEditorRef = useRef(null);
  // Estado para el tipo de página (2=canvas, 4=quiz, 5=game)
  const [pagesType, setPagesType] = useState(2);
  const [widget, setWidget] = useState('COMIC_CREATOR');
  // const [widgetId, setWidgetId] = useState("SINGLE_CHOICE"); // "COMPLETE" o "SINGLE_CHOICE"
// ---- Controlador de carga por tipo de página ----
const onLoadPageControl = (page) => {
  handlePageLoad(page, setElements, setPagesType, currentPage);
};
  //CustomeHooks
  const { bookData, pagesList, isLoading, error, loadBookData } = useBookData(id, onLoadPageControl);
  const { savePage } = usePageSaver({
    // quizType,
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

  // ---- Cargar datos al cambiar página ----
  useEffect(() => {
    if (!id) return;
    loadBookData();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (!isLoading && pagesList[currentPage]) {
      onLoadPageControl(pagesList[currentPage]);
    }
    // eslint-disable-next-line
  }, [currentPage, pagesList, isLoading]);

  

  // ---- Guardado específico para juegos (sopa de letras, etc) ----
  const handleWordSearchSave = (formData) => {
    if (!pagesList || !pagesList[currentPage] || !pagesList[currentPage].page) {
      alert("Error: La página no está lista. Por favor, espera unos segundos y vuelve a intentar.");
      return;
    }
    setElements(formData);
    savePage(); // Usa el hook
  };

  // ---- Cambiar tipo de widget ----
  const widgetValidation = async (widgetId, type) => {
    console.log('widgetValidation')
        console.log(widgetId)
            console.log(type)
    if (type !== pagesType) {
      // setIsLoading(true); TBD poner otro loader
      cleanElements();
      setWidget(widgetId);
      setPagesType(type);
    }
  };

  // ---- Cambiar tipo de quiz ----
  const changeQuizType = (newQuizType) => {
    // setQuizType(newQuizType);
  };

  return (
    <div className="flex h-screen w-full bg-gray-200">

      <BookSidebarPanel
      
        widgetValidation={widgetValidation}
        setElements={setElements}
        setImages={setImages}
        changeQuizType={changeQuizType}
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

      <div
        className="flex-1 p-4 bg-white m-2 shadow-md rounded-lg"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <BookCentralEditor
          isLoading={isLoading}
          pagesType={pagesType}
          // quizType={quizType}
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
