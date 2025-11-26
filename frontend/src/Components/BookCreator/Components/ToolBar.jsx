import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ToolBar({
  savePageToLocalStorage,
  elements,
  setElements,
  selectedId,
  setSelectedId,
  bookData,
  currentPage,
  totalPages,
  onSwapPageBackward,
  onSwapPageForward,
  pageManagementLoading = false,
  hasUnsavedChanges = false
}) {
  const handleDelete = () => {
    if (!selectedId) return;
    setSelectedId(null);
    setElements((prev) => prev.filter((el) => el.id !== selectedId));
  };

  const canSwapBackward = currentPage > 0;
  const canSwapForward = currentPage < totalPages - 1;

  return (
    <nav className="w-full bg-white shadow-md p-2 flex justify-between items-center border-b border-gray-300 h-12">
      <h1 className="text-lg font-bold flex items-center h-full">{bookData ? bookData.title : "BookCreator"}</h1>
      
      {/* Page Order Controls - Center */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-sm font-medium text-gray-600">Move page:</span>
        
        {/* Swap Backward Button */}
        <button
          onClick={() => onSwapPageBackward(currentPage)}
          disabled={!canSwapBackward || pageManagementLoading}
          className={`p-1.5 rounded transition-all duration-200 flex items-center ${
            canSwapBackward && !pageManagementLoading
              ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          title="Intercambiar página con la anterior"
        >
          <ChevronLeft size={20} />
        </button>
        
        {/* Page Indicator */}
        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
          <span className="text-sm font-semibold text-gray-800">{currentPage + 1}</span>
          <span className="text-xs text-gray-500">/</span>
          <span className="text-sm text-gray-600">{totalPages}</span>
          {hasUnsavedChanges && (
            <span 
              className="ml-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" 
              title="Sin guardar"
            />
          )}
        </div>
        
        {/* Swap Forward Button */}
        <button
          onClick={() => onSwapPageForward(currentPage)}
          disabled={!canSwapForward || pageManagementLoading}
          className={`p-1.5 rounded transition-all duration-200 flex items-center ${
            canSwapForward && !pageManagementLoading
              ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          title="Intercambiar página con la siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="space-x-2 flex items-center h-full">
        <Button
          onClick={handleDelete}
          className="bg-red-500 text-white hover:bg-red-600 text-sm px-4 py-3 min-w-fit h-full flex items-center"
        >
          Delete Element
        </Button>
        <Button
          onClick={savePageToLocalStorage}
          className="bg-blue-500 text-white hover:bg-blue-600 text-sm px-4 py-3 min-w-fit h-full flex items-center"
        >
          Save Page
        </Button>
      </div>
    </nav>
  );
}
