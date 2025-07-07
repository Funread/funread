import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
// API CALLS
import { fullBook } from "../../api/books";
import { updatePageType, newPage } from "../../api/pages";
import { createMultipleOptions, list_options_by_idwidgetitem } from "../../api/options";
// Hooks
import { usePageSaver } from "./Hooks/usePageSaver"; //Orquestador de salvado
import { useBookData } from "./Hooks/useBookData";//Carga todo el data

// SUBCOMPONENTS
import SideBar from "./Components/SideBar";
import ToolBar from "./Components/ToolBar";
import ImagePanel from "./Components/ImagePanel";
import TextPanel from "./Components/TextPanel";
import Games from "./Components/Games";
import Quiz from "./Components/Quiz";
import Canvas from "./Components/Canvas";
import Footer from "./Components/Footer";
import QuizEditor from "./Components/QuizEditor";
import QuizCompleteEditor from "./Components/QuizCompleteEditor";
import BookCreatorLoader from "../Loaders/BookCreatorLoader";
import WordSearchForm from '../Widgets/Game/WordSearchGame/WordSearchForm';

export default function BookCreator() {
  // ---- Estados y refs principales ----
  const [openPanel, setOpenPanel] = useState("background");

  const [currentPage, setCurrentPage] = useState(0);
  const { id } = useParams();

  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [images, setImages] = useState({});
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const quizEditorRef = useRef(null);
  const quizCompleteEditorRef = useRef(null);

  // Estado para el tipo de página (2=canvas, 4=quiz, 5=game)
  const [pagesType, setPagesType] = useState(2);
  const [widget, setWidget] = useState([2]);
  const [quizType, setQuizType] = useState("singleChoice"); // "complete" o "singleChoice"

// ---- Controlador de carga por tipo de página ----
const onLoadPageControl = (page) => {
  if (page && page.page) {
    setPagesType(page.page.type);
    if (page.page.type === 4) {
      let getWidgetInfo = page.widgetitems[0];
      if (getWidgetInfo) {
        const widgetValue = getWidgetInfo.value;
        if (widgetValue && widgetValue.type === "complete") {
          setQuizType("complete");
          setElements(widgetValue);
        } else {
          setQuizType("singleChoice");
          list_options_by_idwidgetitem(getWidgetInfo.widgetitemid).then((options) => {
            setElements(formatQuizData(widgetValue, options, currentPage));
          });
        }
      }
    } else {
      setElements(page.widgetitems);
    }
  }
};


  //CustomeHooks
  const { bookData, pagesList, isLoading, error, loadBookData } = useBookData(id, onLoadPageControl);
  const { savePage } = usePageSaver({
    quizType,
    quizEditorRef,
    quizCompleteEditorRef,
    bookData,
    pagesList,
    currentPage,
    updatePageType,
    createMultipleOptions,
    elements,
    pagesType,
  });

 
  // ---- Función para agregar página ----
  const addPage = async (type = 2) => {
    try {
      // setIsLoading(true);
      const nextPageIndex = pagesList.length;
      await newPage(
        id,
        2, // tipo por defecto
        0,
        nextPageIndex + 1,
        "1",
        1
      );
      await loadBookData();
      setCurrentPage(nextPageIndex);
      setElements([]);
    } catch (error) {
      console.error("Error al agregar página:", error);
      // setIsLoading(false);
    }
  };

  // ---- Limpieza de elementos ----
  const cleanElements = () => {
    setElements([]);
    setSelectedId(null);
  };

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
    if (type !== pagesType) {
      // setIsLoading(true); TBD poner otro loader
      cleanElements();
      setWidget(widgetId);
      setPagesType(type);

      try {
        if (pagesList[currentPage] && pagesList[currentPage].page) {
          await updatePageType(pagesList[currentPage].page.pageid, type);
          await loadBookData();
        }
      } catch (error) {
        console.error("Error al actualizar el tipo de página:", error);
      } finally {
        // setIsLoading(false);
      }
    }
  };

  // ---- Cambiar tipo de quiz ----
  const changeQuizType = (newQuizType) => {
    setQuizType(newQuizType);
  };

  // ---- Actualizar el tipo de página cuando sea necesario ----
  useEffect(() => {
    if (pagesType === 5 && pagesList && pagesList[currentPage] && pagesList[currentPage].page) {
      updatePageType(pagesList[currentPage].page.pageid, pagesType).catch(error => {
        console.error("Error al actualizar el tipo de página:", error);
      });
    }
    // eslint-disable-next-line
  }, [pagesType, pagesList, currentPage]);

  // ---- Funciones auxiliares de formato ----
  function formatQuizData(contentData, optionsData, pageNumber = 0) {
    return {
      pageNumber: pageNumber,
      type: "singleChoice",
      content: {
        title: contentData.title,
        question: contentData.question,
      },
      options: optionsData.map(opt => ({
        answer: opt.answer,
        isCorrect: opt.iscorrect === 1,
        points: opt.points,
        isActive: opt.isactive === 1,
      }))
    };
  }

  // ---- Render principal ----
  return (
    <div className="flex h-screen w-full bg-gray-200">
      <SideBar openPanel={openPanel} setOpenPanel={setOpenPanel} />

      <div className="w-[300px] h-full bg-white shadow-md p-4 fixed left-16 top-0 border-r border-gray-300 overflow-y-auto">
        {openPanel === "background" && <ImagePanel widgetValidation={widgetValidation} setElements={setElements} setImages={setImages} imageType={openPanel} />}
        {openPanel === "objects" && <ImagePanel widgetValidation={widgetValidation} setElements={setElements} setImages={setImages} imageType={openPanel} />}
        {openPanel === "users" && <ImagePanel widgetValidation={widgetValidation} setElements={setElements} setImages={setImages} imageType={openPanel} />}
        {openPanel === "shape" && <ImagePanel widgetValidation={widgetValidation} setElements={setElements} setImages={setImages} imageType={openPanel} />}
        {openPanel === "text" && <TextPanel widgetValidation={widgetValidation} setElements={setElements} />}
        {openPanel === "games" && <Games widgetValidation={widgetValidation} setElements={setElements} />}
        {openPanel === "quiz" && <Quiz widgetValidation={widgetValidation} setElements={setElements} changeQuizType={changeQuizType} />}
      </div>

      <div className="flex-1 flex flex-col ml-[364px]">
        <ToolBar
          elements={elements}
          setElements={setElements}
          savePageToLocalStorage={savePage}      // <<< Hook centralizado aquí!
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          bookData={bookData}
          pagesType={pagesType}
          pageId={currentPage}
        />

        <div className="flex-1 p-4 bg-white m-2 shadow-md rounded-lg" style={{ height: "calc(100vh - 80px)" }}>
          {isLoading && <BookCreatorLoader />}
          {!isLoading && pagesType === 2 && (
            <Canvas
              elements={elements}
              setElements={setElements}
              images={images}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              stageRef={stageRef}
              transformerRef={transformerRef}
            />
          )}
          {!isLoading && pagesType === 4 && quizType === "singleChoice" && <QuizEditor ref={quizEditorRef} pageNumber={currentPage} initialData={elements} />}
          {!isLoading && pagesType === 4 && quizType === "complete" && <QuizCompleteEditor ref={quizCompleteEditorRef} pageNumber={currentPage} initialData={elements} />}
          {!isLoading && pagesType === 5 && (
            <WordSearchForm
              initialData={elements}
              onSave={handleWordSearchSave}
            />
          )}
        </div>
      </div>

      {!isLoading && (
        <Footer pages={pagesList} currentPage={currentPage} setCurrentPage={setCurrentPage} addPage={addPage} />
      )}
    </div>
  );
}
