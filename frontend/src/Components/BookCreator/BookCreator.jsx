import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
// API CALLS
import { fullBook } from "../../api/books";
import { updatePageType, newPage} from "../../api/pages";
import { newWidgetItem} from "../../api/widget";
import { createMultipleOptions,list_options_by_idwidgetitem} from "../../api/options";

// SUBCOMPONENTS
import SideBar from "./SideBar";
import ToolBar from "./ToolBar";
import ImagePanel from "./ImagePanel";
import TextPanel from "./TextPanel";
import Games from "./Games";
import Background from "./Background";
import Quiz from "./Quiz";
import Canvas from "./Canvas";
import Footer from "./Footer";
import QuizEditor from "./QuizEditor";
import QuizCompleteEditor from "./QuizCompleteEditor";
import BookCreatorLoader from "../Loaders/BookCreatorLoader";
import WordSearchForm from '../Widgets/Game/WordSearchGame/WordSearchForm';


export default function BookCreator() {
  const [openPanel, setOpenPanel] = useState("background");
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [images, setImages] = useState({});
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const quizEditorRef = useRef(null);
  const quizCompleteEditorRef = useRef(null);
  const { id } = useParams();
 
  // Hook interno para controlar los tipos de página
  const [pagesType, setPagesType] = useState(4);
  const [widget, setWidget] = useState([2]);
  const [pagesList, setPagesList] = useState([]);
  const [quizType, setQuizType] = useState("singleChoice"); // Nuevo estado para el tipo de quiz
 

  const loadBookData = async () => {
    console.log('Loading book data...');
    try {
      const [fullbook2] = await Promise.all([
        fullBook(id)
      ]);
      console.log('Book data loaded:', fullbook2);
      setBookData(fullbook2.data.book_details);
      setPagesList(fullbook2.data.book_content);
      onLoadPageControl(fullbook2.data.book_content[currentPage]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar el libro:", error);
      setIsLoading(false);
    }
  };

  const addPage = async (type = 2) => {
    try {
      setIsLoading(true);
      const nextPageIndex = pagesList.length;
      
      // Crear la nueva página
      await newPage(
        id,
        2,
        0,
        nextPageIndex + 1,
        "1",
        1
      );

      // Recargar los datos del libro para obtener la nueva página
      await loadBookData();
      
      // Actualizar la página actual
      setCurrentPage(nextPageIndex);
      setElements([]);
    } catch (error) {
      console.error("Error al agregar página:", error);
      setIsLoading(false);
    }
  };

  const cleanElements = (type = 2) => {
    setElements([]);
    setSelectedId([]);
  };

   
  useEffect(() => {
    if (!id) return;
    loadBookData();
  }, [id]);

  useEffect(() => {
    if (!isLoading && pagesList[currentPage]) {
      console.log('OnLoadPage', pagesList[currentPage]);
      onLoadPageControl(pagesList[currentPage]);
    }
  }, [currentPage, pagesList, isLoading]);

  const onLoadPageControl = (page) => {
    if (page && page.page) {
      setPagesType(page.page.type);
      if (page.page.type === 4) {
        let getWidgetInfo = page.widgetitems[0];
        if (getWidgetInfo) {
          // Detectar el tipo de quiz basándose en el contenido
          const widgetValue = getWidgetInfo.value;
          if (widgetValue && widgetValue.type === "complete") {
            setQuizType("complete");
            // Para complete quiz, usar directamente el widgetValue
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

  const savePageToLocalStorage = () => {
    // Validar que pagesList y la página actual existan
    if (!pagesList || !pagesList[currentPage] || !pagesList[currentPage].page) {
      console.error("La página actual no está disponible");
      alert("Error: La página no está lista. Por favor, intenta de nuevo en unos segundos.");
      return;
    }

    const storedPages = JSON.parse(localStorage.getItem("savedPages")) || {};
    const currentPageId = pagesList[currentPage].page.pageid;
    
    if (pagesType === 2) {
      updatePageType(currentPageId, pagesType)
      storedPages[currentPage] = elements;
      localStorage.setItem("savedPages", JSON.stringify(storedPages));

      console.log("🖼️ Página tipo Canvas guardada:", elements);
      alert(`Página ${currentPage + 1} guardada correctamente`);
    }
    if (pagesType === 4) {
      if (quizType === "complete") {
        const quizCompleteJson = quizCompleteEditorRef.current?.getQuizJson();
        if (quizCompleteJson) {
          localStorage.setItem(`quiz-complete-page-${currentPage}`, JSON.stringify(quizCompleteJson));
          alert(`Página ${currentPage + 1} guardada correctamente`);
          
          newWidgetItem(   
            currentPageId,
            9,
            4,
            quizCompleteJson,
            0).then((widgetResponse) => {
              updatePageType(currentPageId, pagesType)
            })
        } else {
          console.warn("❌ Complete Quiz no válido, no se guardó.");
        }
      } else {
        const quizJson = quizEditorRef.current?.getQuizJson();
        if (quizJson) {
          localStorage.setItem(`quiz-page-${currentPage}`, JSON.stringify(quizJson));
          alert(`Página ${currentPage + 1} guardada correctamente`);
          
          newWidgetItem(   
            currentPageId,
            9,
            4,
            elements,
            0).then((widgetResponse) => {
              createMultipleOptions(quizJson.options, widgetResponse.data.widgetitemid, bookData.createdby)
              updatePageType(currentPageId, pagesType)
            })
        } else {
          console.warn("❌ Quiz no válido, no se guardó.");
        }
      }
    }
    if (pagesType === 5) {
      // Primero actualizar el tipo de página
      updatePageType(currentPageId, pagesType)
        .then(() => {
          // Solo crear el widget si tenemos elementos válidos
          if (elements && elements.words && elements.words.length >= 3) {
            return newWidgetItem(
              currentPageId,
              9, // widgetid fijo para wordsearch
              4, // type se mantiene en 4
              elements,
              0 // elementorder se mantiene en 0
            );
          } else {
            throw new Error("No hay configuración válida para guardar");
          }
        })
        .then(() => {
          alert(`Sopa de letras guardada correctamente en la página ${currentPage + 1}`);
        })
        .catch(error => {
          console.error("Error al guardar la sopa de letras:", error);
          alert("Error al guardar la sopa de letras. Por favor, asegúrate de completar toda la configuración.");
        });
    }
  };

  const handleWordSearchSave = (formData) => {
    // Validar que la página esté lista antes de guardar
    if (!pagesList || !pagesList[currentPage] || !pagesList[currentPage].page) {
      alert("Error: La página no está lista. Por favor, espera unos segundos y vuelve a intentar.");
      return;
    }

    // Actualizar el estado con la nueva configuración
    setElements(formData);
    
    // Guardar la configuración
    savePageToLocalStorage();
  };

  const widgetValidation = async (widgetId, type) => {
    if (type !== pagesType) {
      setIsLoading(true);
      cleanElements();
      setWidget(widgetId);
      setPagesType(type);

      try {
        if (pagesList[currentPage] && pagesList[currentPage].page) {
          await updatePageType(pagesList[currentPage].page.pageid, type);
          // Recargar los datos para asegurar que tenemos la información actualizada
          await loadBookData();
        }
      } catch (error) {
        console.error("Error al actualizar el tipo de página:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const changeQuizType = (newQuizType) => {
    setQuizType(newQuizType);
  };

  // Efecto para actualizar el tipo de página cuando pagesList esté disponible
  useEffect(() => {
    if (pagesType === 5 && pagesList && pagesList[currentPage] && pagesList[currentPage].page) {
      updatePageType(pagesList[currentPage].page.pageid, pagesType)
        .catch(error => {
          console.error("Error al actualizar el tipo de página:", error);
        });
    }
  }, [pagesType, pagesList, currentPage]);

  // Efecto para establecer quizType por defecto cuando se cambia a tipo 4
  useEffect(() => {
    if (pagesType === 4 && quizType === "singleChoice") {
      // Solo establecer por defecto si no se ha establecido específicamente
      console.log("Estableciendo quizType por defecto para tipo 4");
    }
  }, [pagesType, quizType]);

  function formatQuizData(contentData, optionsData, pageNumber = 0) {
    const formatted = {
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
    console.log('formatQuizData')
    console.log(    formatted  )
    return formatted;
  }

  function formatCompleteQuizData(contentData, pageNumber = 0) {
    const formatted = {
      pageNumber: pageNumber,
      type: "complete",
      content: {
        title: contentData.title,
        question: contentData.question,
        correctAnswer: contentData.correctAnswer,
        points: contentData.points,
      },
    };
    console.log('formatCompleteQuizData')
    console.log(formatted)
    return formatted;
  }

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
          savePageToLocalStorage={savePageToLocalStorage}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          bookData={bookData}
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
          {!isLoading && pagesType === 4 && quizType === "singleChoice" && <QuizEditor ref={quizEditorRef} pageNumber={currentPage} initialData={elements}/>}
          {!isLoading && pagesType === 4 && quizType === "complete" && <QuizCompleteEditor ref={quizCompleteEditorRef} pageNumber={currentPage} initialData={elements}/>}
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
