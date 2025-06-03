import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text, Transformer } from "react-konva";
import Modal from "./TextEditorModal";

export default function Canvas({ elements, setElements, images, selectedId, setSelectedId, stageRef }) {
  const transformerRef = useRef(null);
  const containerRef = useRef(null);
  const [editingText, setEditingText] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setStageSize({ width: clientWidth, height: clientHeight });
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const stage = stageRef.current;
    if (!stage) return;
    const selectedNode = stage.findOne(`#${selectedId}`);
    if (selectedNode && transformerRef.current) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedId, elements]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && selectedId) {
        setElements((prev) => prev.filter((el) => el.id !== selectedId));
        setSelectedId(null);
        if (transformerRef.current) {
          transformerRef.current.nodes([]);
          transformerRef.current.getLayer().batchDraw();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  useEffect(() => {
    window.transformerCleanup = () => {
      if (transformerRef.current) {
        transformerRef.current.nodes([]);
        transformerRef.current.getLayer().batchDraw();
      }
    };
  }, []);

  const handleDragEnd = (e, id) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x: e.target.x(), y: e.target.y() } : el))
    );
  };

  const handleTransformEnd = (e, id) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            }
          : el
      )
    );
  };

  const handleTextDblClick = (el) => {
    setEditingText(el.id);
    setTextValue(el.text);
  };

  const handleTextChange = (newData) => {
    if (newData === null) {
      setEditingText(null);
      return;
    }
    const { text, fontWeight, fill } = typeof newData === "string"
      ? { text: newData, fontWeight: "normal", fill: "black" }
      : newData;

    setElements((prev) =>
      prev.map((el) =>
        el.id === editingText ? { ...el, text, fontWeight, fill } : el
      )
    );
    setEditingText(null);
  };

  return (
    <>
      <div ref={containerRef} className="w-full h-full overflow-hidden">
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          ref={stageRef}
          className="border bg-gray-100"
        >
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
                  fill={el.fill || "black"}
                  fontStyle={el.fontStyle || "normal"}
                  fontWeight={el.fontWeight || "normal"}
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
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>

      {editingText && <Modal text={textValue} onSave={handleTextChange} />}
    </>
  );
}
