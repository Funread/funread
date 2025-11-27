import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text, Transformer, Rect } from "react-konva";
import Modal from "../TextEditorModal";

export default function Canvas({ elements, setElements, selectedId, setSelectedId, stageRef }) {
  const transformerRef = useRef(null);
  const containerRef = useRef(null);
  const [editingText, setEditingText] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [loadedImages, setLoadedImages] = useState({});
  const [scale, setScale] = useState(1);

  const CANVAS_WIDTH = 1400;
  const CANVAS_HEIGHT = 690;
  
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
          img.crossOrigin = "anonymous"; 
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
    const calculateScale = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const scaleX = clientWidth / CANVAS_WIDTH;
        const scaleY = clientHeight / CANVAS_HEIGHT;
        const newScale = Math.min(scaleX, scaleY);
        setScale(newScale);
      }
    };
    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  useEffect(() => {
    if (!transformerRef.current) return;

    if (!selectedId || !stageRef.current) {
      transformerRef.current.nodes([]);
      return;
    }

    const stage = stageRef.current;
    const node = stage.findOne(`#${selectedId}`);

    if (node && node.getLayer()) {
      // Para textos, ajustar el width al contenido real si es menor
      const element = elements.find(el => el.id === selectedId);
      if (element && element.type === "text" && node.width) {
        const actualWidth = node.getTextWidth ? node.getTextWidth() : node.width();
        const definedWidth = element.width || node.width();
        
        // Si el contenido es más pequeño que el width definido, ajustar
        if (actualWidth < definedWidth) {
          node.width(actualWidth);
        }
      }
      
      transformerRef.current.nodes([node]);
      transformerRef.current.getLayer().batchDraw();
    } else {
      transformerRef.current.nodes([]);
    }
  }, [selectedId, elements]);

  const handleDragEnd = (e, id) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x: e.target.x(), y: e.target.y() } : el))
    );
  };

  // Función para reajustar texto al nuevo ancho
  const reajustarTextoAlAncho = (texto, fontSize, fontFamily, nuevoAncho) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px ${fontFamily}`;
    
    // Si el texto ya tiene saltos de línea, unirlo primero
    const textoOriginal = texto.replace(/\n/g, ' ');
    const palabras = textoOriginal.split(' ');
    const lineas = [];
    let lineaActual = '';
    
    for (let i = 0; i < palabras.length; i++) {
      const palabra = palabras[i];
      const lineaPrueba = lineaActual + (lineaActual ? ' ' : '') + palabra;
      const medida = ctx.measureText(lineaPrueba);
      
      if (medida.width > nuevoAncho && lineaActual) {
        lineas.push(lineaActual);
        lineaActual = palabra;
      } else {
        lineaActual = lineaPrueba;
      }
    }
    
    if (lineaActual) {
      lineas.push(lineaActual);
    }
    
    return lineas.join('\n');
  };

  const handleTransformEnd = (e, id) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    
    setElements((prev) =>
      prev.map((el) => {
        if (el.id !== id) return el;
        
        if (el.type === "text") {
          const newFontSize = Math.max(8, Math.round(el.fontSize * scaleY));
          const nuevoAncho = Math.max(100, node.width() * scaleX);
          
          let textoAjustado = el.text;
          const shouldReajustText = Math.abs(scaleX - 1) > 0.1 && el.textAlign !== 'justify';
          
          if (shouldReajustText) {
            textoAjustado = reajustarTextoAlAncho(
              el.text, 
              newFontSize, 
              el.fontFamily || "Arial", 
              nuevoAncho
            );
          }
          
          return {
            ...el,
            x: node.x(),
            y: node.y(),
            fontSize: newFontSize,
            text: textoAjustado,
            width: nuevoAncho,
          };
        }
        
        return {
          ...el,
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(5, node.height() * scaleY),
        };
      })
    );
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
    
    if (typeof newText === "string" && !newStyles) {
      setElements((prev) =>
        Array.isArray(prev) ? prev.map((el) =>
          el.id === editingText ? { ...el, text: newText } : el
        ) : []
      );
    } else {
      setElements((prev) =>
        Array.isArray(prev) ? prev.map((el) =>
          el.id === editingText ? { 
            ...el, 
            text: newText, 
            ...newStyles 
          } : el
        ) : []
      );
    }  
    setEditingText(null);
  };

  return (
    <>
      <div ref={containerRef} className="w-full h-full overflow-hidden flex items-center justify-center">
        <div 
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
          }}
        >
          <Stage
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            ref={stageRef}
            className="bg-white"
          >
            <Layer>
            {Array.isArray(elements) && elements.map((el) => {
              if (el.type === "text") {
                const textElements = [];
                const textWidth = el.width || (el.textAlign === "justify" ? el.fontSize * 20 : undefined);
                
                if (el.backgroundColor) {
                  const tempText = new window.Konva.Text({
                    text: el.text,
                    fontSize: el.fontSize,
                    fontFamily: el.fontFamily || "Arial",
                    fontStyle: el.fontStyle || "normal",
                    fontWeight: el.fontWeight || "normal",
                    lineHeight: el.lineHeight || 1.2,
                    letterSpacing: el.letterSpacing || 0,
                    width: textWidth,
                    wrap: textWidth ? "word" : "none",
                    align: el.textAlign || "left",
                  });
                  
                  const padding = 4;
                  const measuredWidth = tempText.getTextWidth ? tempText.getTextWidth() : tempText.width();
                  const measuredHeight = tempText.height();
                  
                  tempText.destroy();
                  
                  textElements.push(
                    <Rect
                      key={`bg-${el.id}`}
                      x={el.x}
                      y={el.y}
                      width={measuredWidth + (padding * 2)}
                      height={measuredHeight + (padding * 2)}
                      offsetX={padding}
                      offsetY={padding}
                      fill={el.backgroundColor}
                      cornerRadius={4}
                      opacity={el.opacity || 1}
                      rotation={el.rotation || 0}
                    />
                  );
                }
                
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
                    width={textWidth}
                    stroke={el.stroke}
                    strokeWidth={el.strokeWidth || 0}
                    rotation={el.rotation || 0}
                    opacity={el.opacity || 1}
                    shadowColor={el.shadowColor}
                    shadowBlur={el.shadowBlur || 0}
                    shadowOffsetX={el.shadowOffsetX || 0}
                    shadowOffsetY={el.shadowOffsetY || 0}
                    align={el.textAlign || "left"}
                    letterSpacing={el.letterSpacing || 0}
                    textDecoration={el.textDecoration || ""}
                    wrap={textWidth ? "word" : "none"}
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
                  image={loadedImages[el.src]}
                  draggable
                  onClick={() => setSelectedId(el.id)}
                  onDragEnd={(e) => handleDragEnd(e, el.id)}
                  onTransformEnd={(e) => handleTransformEnd(e, el.id)}
                />
              ) : null;
            })}
            <Transformer
              ref={transformerRef}
              ignoreStroke={true}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
              enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right', 'middle-left', 'middle-right']}
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
