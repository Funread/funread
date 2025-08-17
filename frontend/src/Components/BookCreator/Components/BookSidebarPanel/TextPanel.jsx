import { Button } from "../Button";
const EJEMPLOS = [
  { text: "FontType1", fontFamily: "Comic Sans MS, cursive, sans-serif", fontSize: 36, fill: "#e63946" },
  { text: "FontType2", fontFamily: "Montserrat, sans-serif", fontSize: 28, fill: "#457b9d" },
  { text: "FontType3", fontFamily: "Roboto, sans-serif", fontSize: 24, fill: "#222" },
  { text: "FontType4", fontFamily: "Lobster, cursive", fontSize: 32, fill: "#f39c12" },
  { text: "FontType5", fontFamily: "Press Start 2P, monospace", fontSize: 20, fill: "#f7e018" },
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
          <span style={{ fontFamily: ej.fontFamily, fontSize: ej.fontSize, color: ej.fill }}>{ej.text}</span>
        </div>
      ))}
    </div>
  );
}
