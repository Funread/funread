import { useEffect, useRef } from "react";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";

export default function Canvas({ elements, setElements, images, selectedId, setSelectedId, stageRef }) {
  const transformerRef = useRef(null);

  useEffect(() => {
    if (transformerRef.current && selectedId) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
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
              scaleX: 1, // Reset scale to avoid cumulative scaling
              scaleY: 1,
            }
          : el
      )
    );
  };

  return (
    <Stage width={window.innerWidth - 400} height={window.innerHeight - 150} ref={stageRef} className="border bg-gray-100">
      <Layer>
        {elements.map((el) =>
          el.type === "image" ? (
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
              ref={selectedId === el.id ? transformerRef : null}
            />
          ) : null
        )}
        {selectedId && <Transformer ref={transformerRef} />}
      </Layer>
    </Stage>
  );
}
