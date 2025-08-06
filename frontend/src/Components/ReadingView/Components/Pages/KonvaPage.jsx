import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text as KonvaText } from "react-konva";
import imagePreload from '../../Utils/imagePreload';
import './KonvaPage.sass';


const KonvaPage = ({ widgets }) => {
  // widgets: array de widgetitems, cada uno puede tener un array de elementos
  let elements = [];
  if (widgets && widgets.length > 0) {
    // Lógica nueva: el primer widget tiene un array de elementos
    const widgetValue = widgets[0].value;
    if (Array.isArray(widgetValue)) {
      elements = widgetValue;
    } else if (typeof widgetValue === 'string') {
      try {
        elements = JSON.parse(widgetValue);
      } catch {
        elements = [];
      }
    }
  }

  // Precargar imágenes usando imagePreload
  const [loadedImages, setLoadedImages] = useState({});
  const [imagesReady, setImagesReady] = useState(false);
  useEffect(() => {
    const imageUrls = elements.filter(el => el.type === "image").map(el => el.src);
    imagePreload(imageUrls, () => {
      // Cuando todas las imágenes estén listas
      const newImages = {};
      imageUrls.forEach(url => {
        const img = new window.Image();
        img.src = url;
        newImages[url] = img;
      });
      setLoadedImages(newImages);
      setImagesReady(true);
    }, () => {
      setImagesReady(true);
    });
  }, [elements]);

  // Calcular tamaño del canvas
  const containerRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setStageSize({ width: clientWidth, height: clientHeight });
    }
  }, []);

  return (
    <div ref={containerRef} className="konva-page" style={{ width: '100%', height: '100%' }}>
      {imagesReady ? (
        <Stage width={stageSize.width} height={stageSize.height}>
          <Layer>
            {elements.map((el, idx) => {
              if (el.type === "image") {
                return (
                  <KonvaImage
                    key={el.id || idx}
                    x={el.x}
                    y={el.y}
                    width={el.width}
                    height={el.height}
                    image={loadedImages[el.src]}
                    listening={false}
                  />
                );
              }
              if (el.type === "text") {
                return (
                  <KonvaText
                    key={el.id || idx}
                    x={el.x}
                    y={el.y}
                    text={el.text}
                    fontSize={el.fontSize || 24}
                    fill={el.fill || "black"}
                    fontStyle={el.fontStyle || "normal"}
                    fontWeight={el.fontWeight || "normal"}
                    listening={false}
                  />
                );
              }
              return null;
            })}
          </Layer>
        </Stage>
      ) : (
        <div>Cargando imágenes...</div>
      )}
    </div>
  );
};

export default KonvaPage;
