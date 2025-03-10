import { useState, useRef, useEffect } from "react";
import SideBar from "./SideBar"; // Usa el nombre exacto del archivo
import ToolBar from "./ToolBar";
import ImagePanel from "./ImagePanel";
import TextPanel from "./TextPanel";
import Canvas from "./Canvas";
import Footer from "./Footer";
export default function BookCreator() {
  const [openPanel, setOpenPanel] = useState("images");
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const [images, setImages] = useState({});
  const [pages, setPages] = useState([[]]); // ✅ Siempre comienza con al menos una página vacía
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const savedData = localStorage.getItem("canvasElements");
    if (savedData) {
      setElements(JSON.parse(savedData));
    }
  }, []);
  const addPage = () => {
    setPages((prev) => [...prev, []]); // 🔹 Asegura que la nueva página sea un array vacío
    setCurrentPage(pages.length); // 🔹 Cambia a la nueva página
  };
  return (
    <div className="flex h-screen w-full bg-gray-200">
      {/* Barra lateral */}
      <SideBar openPanel={openPanel} setOpenPanel={setOpenPanel} />

      {/* Panel lateral dinámico */}
      <div className="w-[300px] h-full bg-white shadow-md p-4 fixed left-16 top-0 border-r border-gray-300 overflow-y-auto">
        {openPanel === "images" && <ImagePanel setElements={setElements} setImages={setImages} />}
        {openPanel === "text" && <TextPanel setElements={setElements} />}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col ml-[364px]">
        <ToolBar setElements={setElements} />
        <div className="flex-1 p-4 bg-white m-2 shadow-md rounded-lg">
          <Canvas
            elements={elements}
            setElements={setElements}
            images={images}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            stageRef={stageRef}
            transformerRef={transformerRef}
          />
        </div>
      </div>
      <Footer pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} addPage={addPage} />

    </div>
  );
}
