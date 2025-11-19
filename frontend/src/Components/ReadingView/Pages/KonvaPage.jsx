import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Image, Shape, Text, Rect } from 'react-konva';
import { getMediaUrl } from '../../Utils/mediaUrl';

const KonvaPage = ({ widgets }) => {
  const [elements, setElements] = useState([]);
  const [images, setImages] = useState({});
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  const CANVAS_WIDTH = 1400;
  const CANVAS_HEIGHT = 690;

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
    
    const timer = setTimeout(calculateScale, 100);
    window.addEventListener("resize", calculateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateScale);
    };
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const imgMap = {};
      await Promise.all(
        elements.map(async (el, index) => {
          if (el.type === 'image') {
            try {
              const img = new window.Image();
              const src = getMediaUrl(el.src);
              if (!src) {
                return;
              }

              const loaded = await new Promise((res) => {
                img.onload = () => res(true);
                img.onerror = () => {
                  res(false);
                };
                img.src = src;
              });

              if (loaded) {
                imgMap[el.id || index] = img;
              }
            } catch (e) {
            }
          }
        })
      );
      setImages(imgMap);
    };
    loadImages();
  }, [elements]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: '100%',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden',
        backgroundColor: 'transparent'
      }}
    >
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
          style={{ backgroundColor: 'white' }}
        >
          <Layer>
            {elements.map((el, index) => {
          if (el.type === 'text') {
            const textElements = [];
            
            if (el.backgroundColor) {
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
