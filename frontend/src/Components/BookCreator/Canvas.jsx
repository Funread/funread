import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

export default function Canvas() {
  return (
    <Stage width={window.innerWidth} height={400} className="border">
      <Layer>
        {/* Texto */}
        <Text text="Hello Konva.js!" fontSize={24} x={50} y={50} />

        {/* Rectángulo interactivo */}
        <Rect
          x={100}
          y={100}
          width={100}
          height={100}
          fill="blue"
          draggable
          onClick={() => alert("Rectángulo clickeado")}
        />
      </Layer>
    </Stage>
  );
}
