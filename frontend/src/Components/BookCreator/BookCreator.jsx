import { useState, useRef, useEffect } from "react";
import SideBar from "./SideBar";
import ToolBar from "./ToolBar";
import ImagePanel from "./ImagePanel";
import TextPanel from "./TextPanel";
import Canvas from "./Canvas";
import Footer from "./Footer";

export default function BookCreator() {
  const [openPanel, setOpenPanel] = useState("images");
  const [pages, setPages] = useState([[]]);
  const [currentPage, setCurrentPage] = useState(0);
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [images, setImages] = useState({});
  const stageRef = useRef(null);
  const transformerRef = useRef(null);

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
    storedPages[currentPage] = elements;
    localStorage.setItem("savedPages", JSON.stringify(storedPages));
    alert(`Página ${currentPage + 1} guardada correctamente`);
  };

  const addPage = () => {
    setPages((prev) => [...prev, []]);
    setCurrentPage(pages.length);
    setElements([]);
  };

  const handleImageUpload = (src) => {
    const id = Date.now().toString();
    setElements((prev) => [
      ...prev,
      {
        id,
        type: "image",
        src,
        x: 100,
        y: 100,
        width: 200,
        height: 200,
      },
    ]);
  };

  return (
    <div className="flex h-screen w-full bg-gray-200">
      <SideBar openPanel={openPanel} setOpenPanel={setOpenPanel} />

      <div className="w-[300px] h-full bg-white shadow-md p-4 fixed left-16 top-0 border-r border-gray-300 overflow-y-auto">
        {openPanel === "images" && (
          <ImagePanel
            onUpload={handleImageUpload}
            setElements={setElements}
            setImages={setImages}
          />
        )}
        {openPanel === "text" && <TextPanel setElements={setElements} />}
      </div>

      <div className="flex-1 flex flex-col ml-[364px]">
        <ToolBar
          elements={elements}
          setElements={setElements}
          savePageToLocalStorage={savePageToLocalStorage}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />

        <div
          className="flex-1 p-4 bg-white m-2 shadow-md rounded-lg"
          style={{ height: "calc(100vh - 80px)" }}
        >
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

      <Footer
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        addPage={addPage}
      />
    </div>
  );
}
