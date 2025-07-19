import { Button } from "../Button";

export default function TextPanel({ setElements,widgetValidation }) {
  const handleText = () => {
    widgetValidation(2,2)
    setElements((prev) => [...prev, {
      id: Date.now().toString(),
      type: "text",
      text: "Doble clic para editar",
      x: 100,
      y: 100,
      fontSize: 20,
      fill: "black",
    }])
  };
  return (
    <Button onClick={() => handleText()}>
      Agregar Texto
    </Button>
  );
}
