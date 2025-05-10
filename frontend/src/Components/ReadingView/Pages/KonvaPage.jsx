import React, { useState, useEffect , useRef} from 'react';
import { Stage, Layer, Image, Shape, Transformer, Rect } from 'react-konva';
import { getMediaUrl } from '../../Utils/mediaUrl';

const KonvaPage = ({ widgets, pageData }) => {
  const [stageSize, setStageSize] = useState({
    width: 760,
    height: 760,
    scale: 1
  });
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [isSelected, setIsSelected] = useState(false);

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
              const img = await loadImage(getMediaUrl(widget.value.src));
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

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const calculateCenteredPosition = (imageWidth, imageHeight) => {
    // Calcula el centro del stage
    const centerX = (760 - imageWidth) / 2; // 760 es el ancho base del stage
    const centerY = (760 - imageHeight) / 2; // 760 es el alto base del stage
    return { x: centerX, y: centerY };
  };

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
              if (!images[widget.widgetitemid]) return null;
              
              // Calcula la posición centrada si no hay posición definida
              const imageWidth = shapeProps.width || images[widget.widgetitemid].width;
              const imageHeight = shapeProps.height || images[widget.widgetitemid].height;
              const centeredPosition = calculateCenteredPosition(imageWidth, imageHeight);

              return (
                <Image
                  key={widget.widgetitemid}
                  x={shapeProps.x || centeredPosition.x}
                  y={shapeProps.y || centeredPosition.y}
                  width={imageWidth}
                  height={imageHeight}
                  image={images[widget.widgetitemid]}
                  draggable={false}
                />
              );
            case 3: // shape
              const { name,  isSelected, onSelect, onChange, ...otherProps } = shapeProps;
              
              return (
                <Shape
                  key={widget.widgetitemid}
                  {...otherProps}
                  draggable={true}
                  sceneFunc={(context, shape) => {
                    context.beginPath();
                    
                    switch (name) {
                      case 'rectangle':
                        context.rect(
                          shapeProps.x || 0,
                          shapeProps.y || 0,
                          shapeProps.width || 100,
                          shapeProps.height || 50,
                          shapeProps.isSelected || false,   
                          
                        );
                        break;
                        
                      case 'circle':
                        context.arc(
                          shapeProps.x || 0,
                          shapeProps.y || 0,
                          shapeProps.radius || 50,
                          0,
                          Math.PI * 2
                        );
                        break;
                        
                      case 'square':
                        const size = shapeProps.size || 100;
                        context.rect(
                          shapeProps.x || 0,
                          shapeProps.y || 0,
                          size,
                          size
                        );
                        break;
                        
                      case 'message':
                        // Forma de burbuja de mensaje
                        const width = shapeProps.width || 120;
                        const height = shapeProps.height || 80;
                        const x = shapeProps.x || 0;
                        const y = shapeProps.y || 0;
                        
                        context.moveTo(x + 10, y);
                        context.lineTo(x + width - 10, y);
                        context.quadraticCurveTo(x + width, y, x + width, y + 10);
                        context.lineTo(x + width, y + height - 10);
                        context.quadraticCurveTo(x + width, y + height, x + width - 10, y + height);
                        context.lineTo(x + 20, y + height);
                        context.lineTo(x, y + height + 20);
                        context.lineTo(x + 20, y + height);
                        context.quadraticCurveTo(x + 10, y + height, x + 10, y + height - 10);
                        context.lineTo(x + 10, y + 10);
                        context.quadraticCurveTo(x + 10, y, x + 20, y);
                        break;
                        
                      case 'thinking':
                        // Forma de nube de pensamiento
                        const cloudX = shapeProps.x || 0;
                        const cloudY = shapeProps.y || 0;
                        const cloudWidth = shapeProps.width || 100;
                        const cloudHeight = shapeProps.height || 60;
                        
                        // Nube principal
                        context.moveTo(cloudX + 30, cloudY + cloudHeight);
                        context.bezierCurveTo(
                          cloudX, cloudY + cloudHeight,
                          cloudX, cloudY,
                          cloudX + 30, cloudY
                        );
                        context.bezierCurveTo(
                          cloudX + 40, cloudY - 10,
                          cloudX + cloudWidth - 40, cloudY - 10,
                          cloudX + cloudWidth - 30, cloudY
                        );
                        context.bezierCurveTo(
                          cloudX + cloudWidth, cloudY,
                          cloudX + cloudWidth, cloudY + cloudHeight,
                          cloudX + cloudWidth - 30, cloudY + cloudHeight
                        );
                        context.bezierCurveTo(
                          cloudX + cloudWidth - 40, cloudY + cloudHeight + 10,
                          cloudX + 40, cloudY + cloudHeight + 10,
                          cloudX + 30, cloudY + cloudHeight
                        );
                        
                        // Burbujas de pensamiento
                        context.moveTo(cloudX + 15, cloudY + cloudHeight + 20);
                        context.arc(cloudX + 15, cloudY + cloudHeight + 20, 5, 0, Math.PI * 2);
                        context.moveTo(cloudX + 5, cloudY + cloudHeight + 35);
                        context.arc(cloudX + 5, cloudY + cloudHeight + 35, 3, 0, Math.PI * 2);
                        break;
                        
                      default:
                        // Forma por defecto (triángulo)
                        context.moveTo(shapeProps.x || 50, shapeProps.y || 50);
                        context.lineTo((shapeProps.x || 50) + 100, shapeProps.y || 50);
                        context.lineTo((shapeProps.x || 50) + 50, (shapeProps.y || 50) + 100);
                    }
                    
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