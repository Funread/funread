import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Shape } from 'react-konva';

const KonvaPage = ({ widgets, pageData }) => {
  const [stageSize, setStageSize] = useState({
    width: 760,
    height: 760,
    scale: 1
  });
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar una imagen y devolver una promesa
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Cargar todas las imágenes al inicio
  useEffect(() => {
    const loadAllImages = async () => {
      setIsLoading(true);
      try {
        const imagePromises = widgets?.filter(widget => Number(widget.type) === 2)
          .map(async (widget) => {
            if (widget.value?.src) {
              const img = await loadImage(widget.value.src);
              return { id: widget.widgetitemid, img };
            }
          });

        if (imagePromises && imagePromises.length > 0) {
          const loadedImages = await Promise.all(imagePromises);
          const imageMap = loadedImages.reduce((acc, item) => {
            if (item) {
              acc[item.id] = item.img;
            }
            return acc;
          }, {});
          setImages(imageMap);
        }
      } catch (error) {
        console.error('Error cargando imágenes:', error);
      }
      setIsLoading(false);
    };

    loadAllImages();
  }, [widgets]);

  useEffect(() => {
    // Función para calcular el tamaño del stage
    const calculateSize = () => {
      const container = document.querySelector('.page-content');
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      // Calculamos el tamaño manteniendo el aspecto cuadrado
      const size = Math.min(containerWidth, containerHeight) - 40; // 40px de padding
      const scale = size / 760; // 760 es nuestro tamaño base

      setStageSize({
        width: size,
        height: size,
        scale: scale
      });
    };

    // Calcular tamaño inicial
    calculateSize();

    // Agregar listener para resize
    window.addEventListener('resize', calculateSize);

    // Cleanup
    return () => window.removeEventListener('resize', calculateSize);
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>; // O un spinner/loader
  }

  return (
    <Stage 
      width={stageSize.width} 
      height={stageSize.height}
    >
      <Layer scale={{ x: stageSize.scale, y: stageSize.scale }}>
        {widgets?.map((widget, index) => {
          const shapeProps = widget.value || {};

          if (!widget || !widget.type) {
            return null;
          }

          switch (Number(widget.type)) {
            case 2: // imagen
              return images[widget.widgetitemid] ? (
                <Image
                  key={widget.widgetitemid}
                  x={shapeProps.x}
                  y={shapeProps.y}
                  width={shapeProps.width}
                  height={shapeProps.height}
                  image={images[widget.widgetitemid]}
                />
              ) : null;
            case 3: // shape
              return (
                <Shape
                  key={widget.widgetitemid}
                  {...shapeProps}   
                  draggable={true}
                  sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(shapeProps.x || 50, shapeProps.y || 50);
                    context.lineTo((shapeProps.x || 50) + 100, shapeProps.y || 50);
                    context.lineTo((shapeProps.x || 50) + 50, (shapeProps.y || 50) + 100);
                    context.closePath();
                    context.fillStrokeShape(shape);
                  }}
                />
              );
            default:
              return null;
          }
        })}
      </Layer>
    </Stage>
  );
};

export default KonvaPage;