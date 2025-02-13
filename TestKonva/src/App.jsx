import { useState, useRef } from "react";
import { Stage, Layer, Rect, Circle, Text, Transformer } from "react-konva";
import "./App.scss";
import ImageComponent from './ImageComponent'; 
import MessageBubble from './MessageBubble';

const App = () => {
  const [shapes, setShapes] = useState([]); // Almacena las formas en el lienzo
  const [selectedId, setSelectedId] = useState(null); // ID del elemento seleccionado
  const [text, setText] = useState(""); // Texto ingresado por el usuario
  const [background, setBackground] = useState("#ffffff"); // Color de fondo
  const [history, setHistory] = useState([]); // Historial para undo/redo
  const [historyIndex, setHistoryIndex] = useState(-1); // Índice del historial
  const stageRef = useRef(null); // Referencia al Stage de Konva
  const trRef = useRef(null); // Referencia al Transformer

  // Función para agregar un rectángulo
  const addRectangle = () => {
    const newRect = {
      id: `rect-${Date.now()}`,
      type: "rect",
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: "red",
      draggable: true,
    };
    updateShapes([...shapes, newRect]);
  };
  

  // Función para agregar un círculo
  const addCircle = () => {     
    const newCircle = {
      id: `circle-${Date.now()}`,
      type: "circle",
      x: 150,
      y: 150,
      radius: 50,
      fill: "blue",
      draggable: true,
    };
    updateShapes([...shapes, newCircle]);
  };

  // Función para agregar texto
  const addText = () => {
    const newText = {
      id: `text-${Date.now()}`,
      type: "text",
      x: 250,
      y: 250,
      text: text,
      fontSize: 20,
      fill: "black",
      draggable: true,
    };
    updateShapes([...shapes, newText]);
  };

  // Función para agregar un mensaje (globo de diálogo)
  const addMessage = () => {
    const newMessage = {
      id: `message-${Date.now()}`,
      type: "message",
      x: 300,
      y: 300,
      width: 150,
      height: 100,
      fill: "white",
      pointerDirection: "right", 
      draggable: true,
    };
    updateShapes([...shapes, newMessage]);
  };

  

  // Función para agregar una imagen
  const addImage = (url) => {
    const newImage = {
      id: `image-${Date.now()}`,
      type: "image",
      x: 200,
      y: 200,
      url: url,
      draggable: true,
    };
    updateShapes([...shapes, newImage]);
  };

  

  // Función para cambiar el fondo
  const changeBackground = (color) => {
    setBackground(color);
  };

  
  // Función para actualizar las formas y guardar en el historial
  const updateShapes = (newShapes) => {
    setShapes(newShapes);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newShapes);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Función para deshacer (undo)
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setShapes(history[historyIndex - 1]);
    }
  };

  // Función para rehacer (redo)
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setShapes(history[historyIndex + 1]);
    }
  };

  // Función para manejar la selección de elementos
  const handleSelect = (id) => {
    setSelectedId(id);
    const stage = stageRef.current;
    const selectedNode = stage.findOne(`#${id}`);
    if (selectedNode && trRef.current) {
      trRef.current.nodes([selectedNode]);
      trRef.current.getLayer().batchDraw();
    }
  };
 

  return (
    <div style={{ display: "flex" }}>
      {/* Barra de herramientas */}
      <div className="sidebar">
        <button onClick={addRectangle}>Agregar Rectángulo</button>
        <button onClick={addCircle}>Agregar Círculo</button>
        <input
          type="text"
          placeholder="Escribe algo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addText}>Agregar Texto</button>
        <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        addImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }}
/>
        <button onClick={addMessage}>Agregar Mensaje</button>
        <input
          type="color"
          onChange={(e) => changeBackground(e.target.value)}
        />
     
        <button onClick={undo} disabled={historyIndex <= 0}>
          Undo
        </button>
        <button onClick={redo} disabled={historyIndex >= history.length - 1}>
          Redo
        </button>
      </div>

      {/* Lienzo de Konva */}
      <Stage
        width={window.innerWidth - 200}
        height={window.innerHeight}
        ref={stageRef}
        style={{ background }}
      >
        <Layer>
          {shapes.map((shape) => {
            if (shape.type === "rect") {
              return (
                <Rect
                  key={shape.id}
                  id={shape.id}
                  {...shape}
                  onClick={() => handleSelect(shape.id)}
                />
              );
            } else if (shape.type === "circle") {
              return (
                <Circle
                  key={shape.id}
                  id={shape.id}
                  {...shape}
                  onClick={() => handleSelect(shape.id)}
                />
              );
            } else if (shape.type === "text") {
              return (
                <Text
                  key={shape.id}
                  id={shape.id}
                  {...shape}
                  onClick={() => handleSelect(shape.id)}
                />
              );
            } else if (shape.type === "image") {
              return (
                <ImageComponent
                  key={shape.id}
                  shape={shape}
                  handleSelect={handleSelect}
                />
              );
            } else if (shape.type === "message") {
              return (
                <MessageBubble
                  key={shape.id}
                  shapeProps={shape}
                  onSelect={() => handleSelect(shape.id)}
                />
              );
            }
            return null;
          })}
          {selectedId && (
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                // Limita el tamaño mínimo del Transformer
                if (newBox.width < 20 || newBox.height < 20) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
