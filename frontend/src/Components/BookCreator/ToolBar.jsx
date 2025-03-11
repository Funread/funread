import { Button } from "./Button";

export default function ToolBar({ elements, setElements, savePageToLocalStorage  }) {
 

  return (
    <nav className="w-full bg-white shadow-md p-2 flex justify-between items-center border-b border-gray-300 h-12">
      <h1 className="text-lg font-bold">BookCreator</h1>
      <div className="space-x-2 flex items-center">
        <Button  onClick={savePageToLocalStorage} className="bg-blue-500 text-white hover:bg-blue-600 text-sm px-3 py-1">Save</Button>
      </div>
    </nav>
  );
}
