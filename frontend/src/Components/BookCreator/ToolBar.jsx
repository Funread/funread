import { useState, useRef, useEffect } from "react";
import { Home, Image, Settings, Undo, Type } from "lucide-react";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import { Button } from "./Button";

export default function BookCreator() {
  const [openPanel, setOpenPanel] = useState("images");
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const [images, setImages] = useState({});

  // ✅ Cargar contenido guardado al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem("canvasElements");
    if (savedData) {
      setElements(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (transformerRef.current && selectedId) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId, elements]);

  // ✅ Guardar contenido en localStorage
  const handleSave = () => {
    localStorage.setItem("canvasElements", JSON.stringify(elements));
    alert("Canvas guardado correctamente.");
  };

  // ✅ Cargar contenido guardado
  const handleLoad = () => {
    const savedData = localStorage.getItem("canvasElements");
    if (savedData) {
      setElements(JSON.parse(savedData));
    }
  };

  // ✅ Deshacer último cambio
  const handleUndo = () => {
    setElements((prevElements) => prevElements.slice(0, -1));
    setSelectedId(null);
  };

  return (
    <div className="flex h-screen w-full bg-gray-200">
      {/* Sidebar */}
      <div className="w-16 h-full bg-gray-900 text-white flex flex-col items-center p-4 space-y-6 fixed left-0 top-0 shadow-lg">
  <SidebarIcon icon={<Home />} onClick={() => setOpenPanel("home")} active={openPanel === "home"} />
  <SidebarIcon icon={<Image />} onClick={() => setOpenPanel("images")} active={openPanel === "images"} />
  <SidebarIcon icon={<Type />} onClick={() => setOpenPanel("text")} active={openPanel === "text"} />
  <SidebarIcon icon={<Settings />} onClick={() => setOpenPanel("settings")} active={openPanel === "settings"} />
  <button onClick={handleUndo} className="p-2 rounded-full border border-gray-300 bg-white shadow-md hover:bg-gray-200 transition">
    <Undo className="w-5 h-5 text-gray-600" />
  </button>
</div>

      {/* Panel lateral */}
      <div className="w-[300px] h-full bg-white shadow-md p-4 fixed left-16 top-0 border-r border-gray-300 overflow-y-auto">
        {openPanel === "images" && <ImagePanel setElements={setElements} setImages={setImages} />}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[364px]">
        <nav className="w-full bg-white shadow-md p-2 flex justify-between items-center border-b border-gray-300 h-12">
          <h1 className="text-lg font-bold">BookCreator</h1>
          <div className="space-x-2 flex items-center">
            <Button onClick={handleSave} className="bg-blue-500 text-white hover:bg-blue-600 text-sm px-3 py-1">Save</Button>
            <Button onClick={handleLoad} className="border border-gray-500 text-gray-700 hover:bg-gray-100 text-sm px-3 py-1">Load</Button>
          </div>
        </nav>

        <div className="flex-1 p-4 bg-white m-2 shadow-md rounded-lg">
          <Canvas elements={elements} setElements={setElements} images={images} selectedId={selectedId} setSelectedId={setSelectedId} stageRef={stageRef} transformerRef={transformerRef} />
        </div>
      </div>
    </div>
  );
}

// ✅ Sidebar Icon Button
function SidebarIcon({ icon, onClick, active }) {
  return (
    <button onClick={onClick} className={`p-3 rounded-lg hover:bg-gray-700 ${active ? "bg-gray-700" : ""}`}>
      {icon}
    </button>
  );
}

// ✅ Panel de Imágenes
function ImagePanel({ setElements, setImages }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;

      img.onload = () => {
        setImages((prev) => ({ ...prev, [img.src]: img }));

        const newImage = {
          id: Date.now().toString(),
          type: "image",
          src: img.src,
          x: 50,
          y: 50,
          width: img.width / 4,
          height: img.height / 4,
        };

        setElements((prev) => [...prev, newImage]);
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} className="mt-4 w-full border p-2 rounded-lg cursor-pointer" />
    </div>
  );
}

// ✅ Canvas Principal
function Canvas({ elements, setElements, images, selectedId, setSelectedId, stageRef, transformerRef }) {
  const handleDragEnd = (e, id) => {
    const newX = e.target.x();
    const newY = e.target.y();

    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x: newX, y: newY } : el))
    );
  };

  return (
    <div className="border p-2 w-full h-full">
      <Stage width={window.innerWidth - 400} height={window.innerHeight - 150} ref={stageRef} className="border bg-gray-100">
        <Layer>
          {elements.map((el) => (
            <KonvaImage
              key={el.id}
              id={el.id}
              x={el.x}
              y={el.y}
              width={el.width}
              height={el.height}
              draggable
              image={images[el.src]}
              onClick={() => setSelectedId(el.id)}
              onDragEnd={(e) => handleDragEnd(e, el.id)}
            />
          ))}
          {selectedId && <Transformer ref={transformerRef} />}
        </Layer>
      </Stage>
    </div>
  );
}
