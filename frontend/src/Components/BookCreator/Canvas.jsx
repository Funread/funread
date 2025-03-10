import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text, Transformer } from "react-konva";
import Modal from "./TextEditorModal"; // Para editar texto

export default function Canvas({ elements, setElements, images, selectedId, setSelectedId, stageRef }) {
  const transformerRef = useRef(null);
  const [editingText, setEditingText] = useState(null);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    if (!selectedId) return; // Si no hay selección, no hacer nada

    const stage = stageRef.current;
    if (!stage) return; // Si el stage aún no está montado, salir

    const selectedNode = stage.findOne(`#${selectedId}`);
    if (selectedNode && transformerRef.current) {
      transformerRef.current.nodes([selectedNode]); // Asigna el nodo al Transformer
      transformerRef.current.getLayer().batchDraw(); // Refresca el canvas
    }
  }, [selectedId, elements]);

  const handleDragEnd = (e, id) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x: e.target.x(), y: e.target.y() } : el))
    );
  };

  const handleTransformEnd = (e, id) => {
    const node = e.target;
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              x: node.x(),
              y: node.y(),
              width: node.width() * node.scaleX(),
              height: node.height() * node.scaleY(),
              scaleX: 1,
              scaleY: 1,
            }
          : el
      )
    );
  };

  const handleTextDblClick = (el) => {
    setEditingText(el.id);
    setTextValue(el.text);
  };

  const handleTextChange = (newText) => {
    setElements((prev) =>
      prev.map((el) => (el.id === editingText ? { ...el, text: newText } : el))
    );
    setEditingText(null);
  };

  return (
    <>
      <Stage width={window.innerWidth - 400} height={window.innerHeight - 150} ref={stageRef} className="border bg-gray-100">
        <Layer>
          {elements.map((el) =>
            el.type === "text" ? (
              <Text
                key={el.id}
                id={el.id}
                x={el.x}
                y={el.y}
                text={el.text}
                fontSize={el.fontSize}
                fill={el.fill}
                draggable
                onClick={() => setSelectedId(el.id)}
                onDblClick={() => handleTextDblClick(el)}
                onDragEnd={(e) => handleDragEnd(e, el.id)}
                onTransformEnd={(e) => handleTransformEnd(e, el.id)}
              />
            ) : el.type === "image" ? (
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
                onTransformEnd={(e) => handleTransformEnd(e, el.id)}
              />
            ) : null
          )}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>

      {editingText && <Modal text={textValue} onSave={handleTextChange} />}
    </>
  );
}
