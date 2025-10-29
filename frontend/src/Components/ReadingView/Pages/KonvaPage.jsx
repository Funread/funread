import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Shape, Text, Rect } from 'react-konva';
import { getMediaUrl } from '../../Utils/mediaUrl';

const KonvaPage = ({ widgets }) => {
  const [elements, setElements] = useState([]);
  const [images, setImages] = useState({});

  // Tamaño fijo del canvas - sincronizado con Canvas.jsx del editor
  const CANVAS_WIDTH = 1100;
  const CANVAS_HEIGHT = 700;

  // Parseamos el JSON que está dentro del widget.value (debería haber solo un widget)
  useEffect(() => {
    if (!widgets || widgets.length === 0) return;
    const raw = widgets[0]?.value;
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      setElements(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      console.error('Error parsing widget.value:', e);
    }
  }, [widgets]);

  // Carga de imágenes
  useEffect(() => {
    const loadImages = async () => {
      const imgMap = {};
      await Promise.all(
        elements.map(async (el, index) => {
          if (el.type === 'image') {
            const img = new window.Image();
            img.src = getMediaUrl(el.src);
            await new Promise((res, rej) => {
              img.onload = () => res();
              img.onerror = () => rej();
            });
            imgMap[el.id || index] = img;
          }
        })
      );
      setImages(imgMap);
    };
    loadImages();
  }, [elements]);

  return (
    <div className="konva-page-container" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="konva-stage-wrapper">
        <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
          <Layer>
        {elements.map((el, index) => {
          // Renderizar TEXTOS con todos sus atributos
          if (el.type === 'text') {
            const textElements = [];
            
            // Si el texto tiene fondo, agregar un rectángulo
            if (el.backgroundColor) {
              // Crear texto temporal para medir dimensiones (con todas las propiedades que afectan el tamaño)
              const tempText = new window.Konva.Text({
                text: el.text,
                fontSize: el.fontSize,
                fontFamily: el.fontFamily || 'Arial',
                fontStyle: el.fontStyle || 'normal',
                fontWeight: el.fontWeight || 'normal',
                lineHeight: el.lineHeight || 1.2,
                textDecoration: el.textDecoration || '',
                stroke: el.stroke,
                strokeWidth: el.strokeWidth || 0,
              });
              
              const padding = 8;
              const textWidth = tempText.width();
              const textHeight = tempText.height();
              tempText.destroy();
              
              textElements.push(
                <Rect
                  key={`bg-${el.id || index}`}
                  x={(el.x || 0) - padding}
                  y={(el.y || 0) - padding}
                  width={textWidth + (padding * 2)}
                  height={textHeight + (padding * 2)}
                  fill={el.backgroundColor}
                  cornerRadius={4}
                  rotation={el.rotation || 0}
                  opacity={el.opacity || 1}
                />
              );
            }
            
            // Renderizar el texto con todos sus atributos
            textElements.push(
              <Text
                key={el.id || index}
                x={el.x || 0}
                y={el.y || 0}
                text={el.text}
                fontSize={el.fontSize || 16}
                fill={el.fill || 'black'}
                fontFamily={el.fontFamily || 'Arial'}
                fontStyle={el.fontStyle || 'normal'}
                fontWeight={el.fontWeight || 'normal'}
                textDecoration={el.textDecoration || ''}
                lineHeight={el.lineHeight || 1.2}
                stroke={el.stroke}
                strokeWidth={el.strokeWidth || 0}
                rotation={el.rotation || 0}
                opacity={el.opacity || 1}
                shadowColor={el.shadowColor}
                shadowBlur={el.shadowBlur || 0}
                shadowOffsetX={el.shadowOffsetX || 0}
                shadowOffsetY={el.shadowOffsetY || 0}
              />
            );
            
            return textElements;
          }
          
          // Renderizar IMÁGENES
          if (el.type === 'image' && images[el.id || index]) {
            return (
              <Image
                key={el.id || index}
                image={images[el.id || index]}
                x={el.x || 0}
                y={el.y || 0}
                width={el.width}
                height={el.height}
              />
            );
          }
          
          // Renderizar FORMAS
          if (el.type === 'shape') {
            return (
              <Shape
                key={el.id || index}
                sceneFunc={(ctx, shape) => {
                  ctx.beginPath();
                  ctx.rect(el.x || 0, el.y || 0, el.width || 100, el.height || 100);
                  ctx.closePath();
                  ctx.fillStrokeShape(shape);
                }}
                fill={el.fill || 'blue'}
              />
            );
          }
          return null;
        })}
      </Layer>
    </Stage>
      </div>
    </div>
  );
};

export default KonvaPage;
