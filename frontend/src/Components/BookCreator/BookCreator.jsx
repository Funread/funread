import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
// API CALLS
import { fullBook } from "../../api/books";
import {  newPage} from "../../api/pages";
import { newWidgetItem} from "../../api/widget";
import { createMultipleOptions} from "../../api/options";
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
import BookCreatorLoader from "../Loaders/BookCreatorLoader";


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
  const { id } = useParams();
 
  // Hook interno para controlar los tipos de página
  const [pagesType, setPagesType] = useState(2);
  const [widget, setWidget] = useState([2]);
  const [pagesList, setPagesList] = useState([]);
 

  const addPage = (type = 2) => {
    setPagesList((prev) => [...prev, type]);
    setCurrentPage(pagesList.length);
    newPage(
      id,
      pagesType,
      0,
      currentPage+1,
      "1",
      1
    )
    setElements([]);
  };

  const cleanElements = (type = 2) => {
    setElements([]);
    setSelectedId([]);
  };

   
  useEffect(() => {
    if (!id) return;
    
    async function loadBookData() {
      try {
        const [fullbook2] =await Promise.all([
          fullBook(id)
        ]);
        console.log(fullbook2)
        setBookData(fullbook2.data.book_details);
        setPagesList(fullbook2.data.book_content)
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar el libro:", error);
      }
    }

    loadBookData();
  }, [id]);

  useEffect(() => {
    const savedPages = JSON.parse(localStorage.getItem("savedPages")) || {};
    if (savedPages[currentPage]) {
      setElements(savedPages[currentPage]);
    } else {
      setElements([]);
    }
  }, [currentPage]);

  const savePageToLocalStorage = () => {
    const storedPages = JSON.parse(localStorage.getItem("savedPages")) || {};

    if (pagesType === 2) {
      storedPages[currentPage] = elements;
      localStorage.setItem("savedPages", JSON.stringify(storedPages));

      console.log("🖼️ Página tipo Canvas guardada:", elements);
      alert(`Página ${currentPage + 1} guardada correctamente`);
    }
//updatepagfe
    if (pagesType === 4) {
      const quizJson = quizEditorRef.current?.getQuizJson();
      if (quizJson) {
        localStorage.setItem(`quiz-page-${currentPage}`, JSON.stringify(quizJson));
        alert(`Página ${currentPage + 1} guardada correctamente`);
        console.log('quizJson')
        console.log()
        
        newWidgetItem(   
          pagesList[currentPage].page.pageid,
          9,
          4,
          quizJson.content,
          0).then((widgetResponse) => {
            console.log('widgetResponse')
console.log(widgetResponse)
           createMultipleOptions(quizJson.options
            , widgetResponse.data.widgetitemid, bookData.createdby)
          })


      } else {
        console.warn("❌ Quiz no válido, no se guardó.");
      }
    }


  };
  const widgetValidation = (widgetId, type) => {
    if(type !== pagesType ){
      cleanElements()
      setWidget(widgetId)
      setPagesType(type)
    }
  
  };
  
  return (
    <div className="flex h-screen w-full bg-gray-200">
      <SideBar openPanel={openPanel} setOpenPanel={setOpenPanel} />

      <div className="w-[300px] h-full bg-white shadow-md p-4 fixed left-16 top-0 border-r border-gray-300 overflow-y-auto">
        {openPanel === "background" && <ImagePanel widgetValidation= {widgetValidation} setElements={setElements} setImages={setImages} imageType={openPanel} />}
        {openPanel === "objects" && <ImagePanel widgetValidation= {widgetValidation} setElements={setElements} setImages={setImages} imageType={openPanel} />}
        {openPanel === "users" && <ImagePanel widgetValidation= {widgetValidation} setElements={setElements} setImages={setImages} imageType={openPanel} />}
        {openPanel === "shape" && <ImagePanel widgetValidation= {widgetValidation} setElements={setElements} setImages={setImages} imageType={openPanel} />}
        {openPanel === "text" && <TextPanel widgetValidation= {widgetValidation} setElements={setElements} />}
        {openPanel === "games" && <Games widgetValidation= {widgetValidation} setElements={setElements} />}
        {openPanel === "quiz" && <Quiz  widgetValidation= {widgetValidation}  setElements={setElements} />}
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
          {!isLoading && pagesType === 4 && <QuizEditor ref={quizEditorRef} pageNumber={currentPage} />}
        </div>
      </div>

      {!isLoading && (
        <Footer pages={pagesList} currentPage={currentPage} setCurrentPage={setCurrentPage} addPage={addPage} />
      )}
    </div>
  );
}
