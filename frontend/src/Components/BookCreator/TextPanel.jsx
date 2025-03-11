import { Button } from "./Button";

export default function TextPanel({ setElements }) {
  return (
    <Button onClick={() => setElements((prev) => [...prev, {
      id: Date.now().toString(),
      type: "text",
      text: "Doble clic para editar",
      x: 100,
      y: 100,
      fontSize: 20,
      fill: "black",
    }])}>
      Agregar Texto
    </Button>
  );
}
