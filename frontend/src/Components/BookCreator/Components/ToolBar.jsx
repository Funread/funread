import { Button } from "./Button";

export default function ToolBar({
  savePageToLocalStorage,
  elements,
  setElements,
  selectedId,
  setSelectedId,
  bookData,
}) {
  const handleDelete = () => {
    if (!selectedId) return;
    setElements((prev) => prev.filter((el) => el.id !== selectedId));
    setSelectedId(null);

    if (window.transformerCleanup) window.transformerCleanup();
  };

  return (
    <nav className="w-full bg-white shadow-md p-2 flex justify-between items-center border-b border-gray-300 h-12">
      <h1 className="text-lg font-bold">{bookData ? bookData.title : "BookCreator"}</h1>
      <div className="space-x-2 flex items-center">
        <Button
          onClick={handleDelete}
          className="bg-red-500 text-white hover:bg-red-600 text-sm px-3 py-1 w-24 min-w-[96px]"
        >
          Delete
        </Button>
        <Button
          onClick={savePageToLocalStorage}
          className="bg-blue-500 text-white hover:bg-blue-600 text-sm px-3 py-1 w-24 min-w-[96px]"
        >
          Save
        </Button>
      </div>
    </nav>
  );
}
