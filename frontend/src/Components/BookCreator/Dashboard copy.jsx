import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";

export default function VideoCanvas() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoElement, setVideoElement] = useState(null);
  const videoRef = useRef(null);
  const konvaImageRef = useRef(null);

  // ✅ Manejo de carga de video
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const videoURL = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.src = videoURL;
    video.crossOrigin = "anonymous";
    video.loop = true; // Opcional: Loop del video

    setVideoSrc(videoURL);
    setVideoElement(video);
  };

  // ✅ Dibujar el video en Konva
  useEffect(() => {
    if (!videoElement) return;

    videoElement.play();
    const layer = konvaImageRef.current.getLayer();
    const updateCanvas = () => {
      if (videoElement.readyState === 4) {
        konvaImageRef.current.image(videoElement);
        layer.batchDraw();
      }
      requestAnimationFrame(updateCanvas);
    };
    updateCanvas();

    return () => {
      videoElement.pause();
      cancelAnimationFrame(updateCanvas);
    };
  }, [videoElement]);

  return (
    <div className="flex flex-col items-center p-4">
      {/* Botón para subir video */}
      <input type="file" accept="video/*" onChange={handleVideoUpload} className="mb-4 border p-2 rounded-lg cursor-pointer" />

      {/* Konva Canvas */}
      <Stage width={600} height={400} className="border bg-gray-100">
        <Layer>
          <KonvaImage ref={konvaImageRef} x={50} y={50} width={500} height={300} />
        </Layer>
      </Stage>
    </div>
  );
}
