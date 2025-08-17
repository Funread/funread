import { Button } from "../Button";
import ejemplo1 from "./ejemplos/ejemplo1.png";
import ejemplo2 from "./ejemplos/ejemplo2.png";
import ejemplo3 from "./ejemplos/ejemplo3.png";
import ejemplo4 from "./ejemplos/ejemplo4.png";
import ejemplo5 from "./ejemplos/ejemplo5.png";

const EJEMPLOS = [
  { text: "FontType1", fontFamily: "Comic Sans MS, cursive, sans-serif", fontSize: 36, fill: "#e63946", img: ejemplo1 },
  { text: "FontType2", fontFamily: "Montserrat, sans-serif", fontSize: 28, fill: "#457b9d", img: ejemplo2 },
  { text: "FontType3", fontFamily: "Roboto, sans-serif", fontSize: 24, fill: "#222", img: ejemplo3 },
  { text: "FontType4", fontFamily: "Lobster, cursive", fontSize: 32, fill: "#f39c12", img: ejemplo4 },
  { text: "FontType5", fontFamily: "Press Start 2P, monospace", fontSize: 20, fill: "#f7e018", img: ejemplo5 },
];

export default function TextPanel({ setElements, widgetValidation }) {
  const handleEjemplo = (ejemplo) => {
    widgetValidation(2, 2);
    setElements((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "text",
        text: ejemplo.text,
        x: 100,
        y: 100,
        fontSize: ejemplo.fontSize,
        fill: ejemplo.fill,
        fontFamily: ejemplo.fontFamily,
      },
    ]);
  };
  return (
    <div className="flex flex-col gap-2">
      <Button onClick={() => handleEjemplo(EJEMPLOS[0])}>Agregar Texto Simple</Button>
      <div className="mt-2">Ejemplos:</div>
      {EJEMPLOS.map((ej, i) => (
        <div key={i} className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-100 p-1 rounded" onClick={() => handleEjemplo(ej)}>
          <img src={ej.img} alt="ejemplo" className="w-10 h-10 object-contain border" />
          <span style={{ fontFamily: ej.fontFamily, fontSize: ej.fontSize, color: ej.fill }}>{ej.text}</span>
        </div>
      ))}
    </div>
  );
}
