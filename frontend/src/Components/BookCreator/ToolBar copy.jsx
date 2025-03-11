import { Button } from "./Button";

export default function Toolbar({ setElements }) {
  const handleSave = () => {
    localStorage.setItem("canvasElements", JSON.stringify(elements));
    alert("Canvas guardado correctamente.");
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem("canvasElements");
    if (savedData) {
      setElements(JSON.parse(savedData));
    }
  };

  return (
    <nav className="w-full bg-white shadow-md p-2 flex justify-between items-center border-b border-gray-300 h-12">
      <h1 className="text-lg font-bold">BookCreator</h1>
      <div className="space-x-2 flex items-center">
        <Button onClick={handleSave} className="bg-blue-500 text-white hover:bg-blue-600 text-sm px-3 py-1">Save</Button>
        <Button onClick={handleLoad} className="border border-gray-500 text-gray-700 hover:bg-gray-100 text-sm px-3 py-1">Load</Button>
      </div>
    </nav>
  );
}
