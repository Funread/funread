import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Shape } from 'react-konva';
import { getMediaUrl } from '../../Utils/mediaUrl';

const KonvaPage = ({ widgets }) => {
  const [elements, setElements] = useState([]);
  const [images, setImages] = useState({});
  const [stageSize, setStageSize] = useState({ width: 760, height: 760, scale: 1 });

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

  useEffect(() => {
    const calculateSize = () => {
      const container = document.querySelector('.page-content');
      if (!container) return;
      const size = Math.min(container.offsetWidth, container.offsetHeight) - 40;
      const scale = size / 760;
      setStageSize({ width: size, height: size, scale });
    };
    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, []);

  return (
    <Stage width={stageSize.width} height={stageSize.height}>
      <Layer scale={{ x: stageSize.scale, y: stageSize.scale }}>
        {elements.map((el, index) => {
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
  );
};

export default KonvaPage;
