import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text, Transformer, Rect } from "react-konva";
import Modal from "../TextEditorModal";

export default function Canvas({ elements, setElements, selectedId, setSelectedId, stageRef }) {
  const transformerRef = useRef(null);
  const containerRef = useRef(null);
  const [editingText, setEditingText] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [stageSize, setStageSize] = useState({ width: 1100, height: 700 });
  const [loadedImages, setLoadedImages] = useState({});

  const MIN_CANVAS_WIDTH = 1100;
  const MIN_CANVAS_HEIGHT = 700;

  // Ajustar el tamaño del canvas dinámicamente al contenedor
  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (parent) {
          const { clientWidth, clientHeight } = parent;
          // Usar el mayor entre el espacio disponible y el tamaño del canvas
          const newWidth = Math.max(MIN_CANVAS_WIDTH, clientWidth);
          const newHeight = Math.max(MIN_CANVAS_HEIGHT, clientHeight);
          setStageSize({ width: newWidth, height: newHeight });
        }
      }
    };
    
    // Ejecutar inmediatamente y en cada resize
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // 🔁 Precargar imágenes cuando cambian los elementos
  useEffect(() => {
    // Validar que elements sea un array
    if (!Array.isArray(elements)) {
      console.warn('elements is not an array:', elements);
      return;
    }
    
    const newImages = {};
    const promises = elements
      .filter(el => el.type === "image")
      .map(el => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.crossOrigin = "anonymous"; // por si vienen de un dominio diferente
          img.src = el.src;
          img.onload = () => {
            newImages[el.src] = img;
            resolve();
          };
        });
      });

    Promise.all(promises).then(() => {
      setLoadedImages(newImages);
    });
  }, [elements]);

  useEffect(() => {
    if (!selectedId || !stageRef.current || !transformerRef.current) return;

    const stage = stageRef.current;
    const node = stage.findOne(`#${selectedId}`);

    if (node && node.getLayer()) {
      transformerRef.current.nodes([node]);
      transformerRef.current.getLayer().batchDraw();
    } else {
      transformerRef.current.nodes([]);
    }
  }, [selectedId, elements]);

  const handleDragEnd = (e, id) => {
    const node = e.target;
    const stage = stageRef.current;
    
    if (!stage) {
      setElements((prev) =>
        Array.isArray(prev) ? prev.map((el) => (el.id === id ? { ...el, x: node.x(), y: node.y() } : el)) : []
      );
      return;
    }

    // Obtener dimensiones del stage y del nodo
    const stageWidth = stage.width();
    const stageHeight = stage.height();
    const nodeWidth = node.width() * node.scaleX();
    const nodeHeight = node.height() * node.scaleY();

    // Calcular límites
    let newX = node.x();
    let newY = node.y();

    // Restringir X
    if (newX < 0) newX = 0;
    if (newX + nodeWidth > stageWidth) newX = stageWidth - nodeWidth;

    // Restringir Y
    if (newY < 0) newY = 0;
    if (newY + nodeHeight > stageHeight) newY = stageHeight - nodeHeight;

    // Actualizar posición del nodo si es necesario
    if (newX !== node.x() || newY !== node.y()) {
      node.x(newX);
      node.y(newY);
    }

    setElements((prev) =>
      Array.isArray(prev) ? prev.map((el) => (el.id === id ? { ...el, x: newX, y: newY } : el)) : []
    );
  };

  const handleTransformEnd = (e, id) => {
    const node = e.target;
    const stage = stageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    const newWidth = Math.max(5, node.width() * scaleX);
    const newHeight = Math.max(5, node.height() * scaleY);
    
    node.scaleX(1);
    node.scaleY(1);

    if (stage) {
      // Obtener dimensiones del stage
      const stageWidth = stage.width();
      const stageHeight = stage.height();

      // Calcular límites para posición
      let newX = node.x();
      let newY = node.y();

      // Restringir X
      if (newX < 0) newX = 0;
      if (newX + newWidth > stageWidth) newX = stageWidth - newWidth;

      // Restringir Y
      if (newY < 0) newY = 0;
      if (newY + newHeight > stageHeight) newY = stageHeight - newHeight;

      // Actualizar posición del nodo si es necesario
      if (newX !== node.x() || newY !== node.y()) {
        node.x(newX);
        node.y(newY);
      }

      setElements((prev) =>
        Array.isArray(prev) ? prev.map((el) =>
          el.id === id
            ? {
                ...el,
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight,
              }
            : el
        ) : []
      );
    } else {
      setElements((prev) =>
        Array.isArray(prev) ? prev.map((el) =>
          el.id === id
            ? {
                ...el,
                x: node.x(),
                y: node.y(),
                width: newWidth,
                height: newHeight,
              }
            : el
        ) : []
      );
    }
  };

  const handleTextDblClick = (el) => {
    setEditingText(el.id);
    setTextValue(el.text);
  };

  const handleTextChange = (newText, newStyles) => {
    if (newText === null) {
      setEditingText(null);
      return;
    }
    
    // Si solo se pasa texto (compatibilidad)
    if (typeof newText === "string" && !newStyles) {
      setElements((prev) =>
        Array.isArray(prev) ? prev.map((el) =>
          el.id === editingText ? { ...el, text: newText } : el
        ) : []
      );
    } else {
      // Si se pasan estilos completos desde el modal
      setElements((prev) =>
        Array.isArray(prev) ? prev.map((el) =>
          el.id === editingText ? { 
            ...el, 
            text: newText, 
            ...newStyles // Aplicar todos los estilos del modal
          } : el
        ) : []
      );
    }
    setEditingText(null);
  };

  return (
    <>
      <div className="w-full h-full overflow-auto bg-gray-100">
        <div ref={containerRef} style={{ minWidth: MIN_CANVAS_WIDTH, minHeight: MIN_CANVAS_HEIGHT }}>
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            ref={stageRef}
            className="border bg-gray-100"
          >
            <Layer>
            {Array.isArray(elements) && elements.map((el) => {
              if (el.type === "text") {
                // Crear elementos para el texto (fondo + texto)
                const textElements = [];
                
                // Si hay color de fondo, agregar un rectángulo
                if (el.backgroundColor) {
                  // Crear un texto temporal para medir dimensiones reales
                  const tempText = new window.Konva.Text({
                    text: el.text,
                    fontSize: el.fontSize,
                    fontFamily: el.fontFamily || "Arial",
                    fontStyle: el.fontStyle || "normal",
                    fontWeight: el.fontWeight || "normal",
                    lineHeight: el.lineHeight || 1.2,
                  });
                  
                  const padding = 8;
                  const textWidth = tempText.width();
                  const textHeight = tempText.height();
                  
                  // Limpiar el texto temporal
                  tempText.destroy();
                  
                  textElements.push(
                    <Rect
                      key={`bg-${el.id}`}
                      x={el.x - padding}
                      y={el.y - padding}
                      width={textWidth + (padding * 2)}
                      height={textHeight + (padding * 2)}
                      fill={el.backgroundColor}
                      cornerRadius={4}
                      opacity={el.opacity || 1}
                      rotation={el.rotation || 0}
                    />
                  );
                }
                
                // Agregar el texto
                textElements.push(
                  <Text
                    key={el.id}
                    id={el.id}
                    x={el.x}
                    y={el.y}
                    text={el.text}
                    fontSize={el.fontSize}
                    fill={el.fill || "black"}
                    fontFamily={el.fontFamily || "Arial"}
                    fontStyle={el.fontStyle || "normal"}
                    fontWeight={el.fontWeight || "normal"}
                    lineHeight={el.lineHeight || 1.2}
                    stroke={el.stroke}
                    strokeWidth={el.strokeWidth || 0}
                    rotation={el.rotation || 0}
                    opacity={el.opacity || 1}
                    shadowColor={el.shadowColor}
                    shadowBlur={el.shadowBlur || 0}
                    shadowOffsetX={el.shadowOffsetX || 0}
                    shadowOffsetY={el.shadowOffsetY || 0}
                    draggable
                    onClick={() => setSelectedId(el.id)}
                    onDblClick={() => handleTextDblClick(el)}
                    onDragEnd={(e) => handleDragEnd(e, el.id)}
                    onTransformEnd={(e) => handleTransformEnd(e, el.id)}
                    perfectDrawEnabled={false}
                  />
                );
                
                return textElements;
              }
              
              return el.type === "image" ? (
                <KonvaImage
                  key={el.id}
                  id={el.id}
                  x={el.x}
                  y={el.y}
                  width={el.width}
                  height={el.height}
                  image={loadedImages[el.src]} // ✅ precargada correctamente
                  draggable
                  onClick={() => setSelectedId(el.id)}
                  onDragEnd={(e) => handleDragEnd(e, el.id)}
                  onTransformEnd={(e) => handleTransformEnd(e, el.id)}
                />
              ) : null;
            })}
            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                // Validar tamaño mínimo
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }

                // Obtener dimensiones del stage
                const stage = stageRef.current;
                if (!stage) return newBox;

                const stageWidth = stage.width();
                const stageHeight = stage.height();

                // Asegurar que el elemento no se salga del canvas durante el redimensionamiento
                let adjustedBox = { ...newBox };

                // Limitar posición X
                if (adjustedBox.x < 0) {
                  adjustedBox.width += adjustedBox.x;
                  adjustedBox.x = 0;
                }
                if (adjustedBox.x + adjustedBox.width > stageWidth) {
                  adjustedBox.width = stageWidth - adjustedBox.x;
                }

                // Limitar posición Y
                if (adjustedBox.y < 0) {
                  adjustedBox.height += adjustedBox.y;
                  adjustedBox.y = 0;
                }
                if (adjustedBox.y + adjustedBox.height > stageHeight) {
                  adjustedBox.height = stageHeight - adjustedBox.y;
                }

                // Verificar nuevamente tamaño mínimo después de ajustes
                if (adjustedBox.width < 5 || adjustedBox.height < 5) {
                  return oldBox;
                }

                return adjustedBox;
              }}
            />
          </Layer>
        </Stage>
        </div>
      </div>

      {editingText && (() => {
        const currentElement = elements.find(el => el.id === editingText);
        return (
          <Modal 
            text={textValue} 
            onSave={handleTextChange}
            fontFamily={currentElement?.fontFamily}
            fontSize={currentElement?.fontSize}
            fill={currentElement?.fill}
            fontWeight={currentElement?.fontWeight}
            fontStyle={currentElement?.fontStyle}
            backgroundColor={currentElement?.backgroundColor}
            opacity={currentElement?.opacity}
            rotation={currentElement?.rotation}
            lineHeight={currentElement?.lineHeight}
            shadowColor={currentElement?.shadowColor}
            currentElement={currentElement}
          />
        );
      })()}
    </>
  );
}
