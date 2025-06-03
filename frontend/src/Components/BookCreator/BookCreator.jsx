import { useState, useRef, useEffect } from "react";
import SideBar from "./SideBar";
import ToolBar from "./ToolBar";
import ImagePanel from "./ImagePanel";
import TextPanel from "./TextPanel";
import Games from "./Games";
import Background from "./Background";
import Quiz from "./Quiz";

import { newPage } from "../../api/pages";
import { bookSearchById } from "../../api/books";
import { useParams } from "react-router-dom"; 
import Canvas from "./Canvas";
import Footer from "./Footer";
import BookCreatorLoader from "../Loaders/BookCreatorLoader";

export default function BookCreator() {
  const [openPanel, setOpenPanel] = useState("background");
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState([[]]); // 🔹 Guarda contenido de cada página
  const [currentPage, setCurrentPage] = useState(0);
  const [elements, setElements] = useState([]); // 🔹 Estado para elementos de la página actual
  const [selectedId, setSelectedId] = useState(null);
  const [images, setImages] = useState({});
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const { id } = useParams(); // 

  useEffect(() => {
    if (!id) return;

    async function loadBookData() {
      try {
        const book = await bookSearchById(id);
        setBookData (book.data)
       console.log(book)
      } catch (error) {
        console.error("Error al cargar el libro:", error);
      }
    }

    loadBookData();
  }, [id]);


  // ✅ Cargar la página actual desde `localStorage`
  useEffect(() => {
    const savedPages = JSON.parse(localStorage.getItem("savedPages")) || {};
    if (savedPages[currentPage]) {
      setElements(savedPages[currentPage]); // 🔹 Carga los elementos de la página actual
    } else {
      setElements([]); // 🔹 Si la página no existe, iniciar vacía
    }
  }, [currentPage]); // Se ejecuta cada vez que cambia la página

  // ✅ Guardar la página actual en `localStorage`
  const savePageToLocalStorage = () => {
    const storedPages = JSON.parse(localStorage.getItem("savedPages")) || {};
    storedPages[currentPage] = elements; // 🔹 Guarda los elementos de la página actual
    localStorage.setItem("savedPages", JSON.stringify(storedPages));
    newPage(id, )
    // bookid: bookid,
    // type: type,
    // template: template,
    // elementorder: elementorder,
    // gridDirection: gridDirection,
    // gridNumRows: gridNumRows,

    
    alert(`Página ${currentPage + 1} guardada correctamente`);
  };

  // ✅ Agregar una nueva página vacía
  const addPage = () => {
    setPages((prev) => [...prev, []]); // 🔹 Agregar nueva página vacía
    setCurrentPage(pages.length); // 🔹 Cambiar a la nueva página
    setElements([]); // 🔹 Vaciar elementos para la nueva página
  };

  return (
   
    <div className="flex h-screen w-full bg-gray-200">
      {/* Barra lateral */}
      <SideBar openPanel={openPanel} setOpenPanel={setOpenPanel} />

      {/* Panel lateral dinámico */}
      <div className="w-[300px] h-full bg-white shadow-md p-4 fixed left-16 top-0 border-r border-gray-300 overflow-y-auto">
        {openPanel === "background" && <ImagePanel setElements={setElements} setImages={setImages} imageType= {openPanel}/>}
        {openPanel === "objects" && <ImagePanel setElements={setElements} setImages={setImages} imageType= {openPanel}/>}
        {openPanel === "users" && <ImagePanel setElements={setElements} setImages={setImages} imageType= {openPanel}/>}
        {openPanel === "shape" && <ImagePanel setElements={setElements} setImages={setImages} imageType= {openPanel}/>}
        {openPanel === "text" && <TextPanel setElements={setElements} />}
        {openPanel === "games" && <Games setElements={setElements} />}
        {openPanel === "quiz" && <Quiz setElements={setElements} />}
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

        <div className="flex-1 p-4 bg-white m-2 shadow-md rounded-lg"  style={{ height: 'calc(100vh - 80px)'   }}>
        
          { isLoading &&  <BookCreatorLoader/>}
          { !isLoading &&     <Canvas
            elements={elements}
            setElements={setElements}
            images={images}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            stageRef={stageRef}
            transformerRef={transformerRef}
          />}
       
        </div>
      </div>

      { !isLoading &&  <Footer pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} addPage={addPage} />}
      
    </div>
  );
}
