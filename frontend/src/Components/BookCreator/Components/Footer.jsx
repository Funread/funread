import { Trash2, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useEffect, useRef, useCallback } from 'react';

export default function Footer({ 
  pages, 
  currentPage, 
  setCurrentPage, 
  addPage,
  onDeletePage,
  onMovePageBackward,
  onMovePageForward,
  pageManagementLoading = false,
  hasUnsavedChanges = false
}) {
  const totalPages = pages.length;
  const canMoveBackward = currentPage > 0;
  const canMoveForward = currentPage < totalPages - 1;
  const canDelete = totalPages > 1;
  const scrollContainerRef = useRef(null);
  const activeButtonRef = useRef(null);

  // Scroll to active page when currentPage changes
  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      activeButtonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'ArrowLeft' && canMoveBackward && !pageManagementLoading) {
        onMovePageBackward(currentPage);
      } else if (e.key === 'ArrowRight' && canMoveForward && !pageManagementLoading) {
        onMovePageForward(currentPage);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, canMoveBackward, canMoveForward, pageManagementLoading, onMovePageBackward, onMovePageForward]);

  // Smart pagination: show pages around current page
  const getVisiblePages = useCallback(() => {
    const visiblePages = [];
    const range = 2; // Show 2 pages before and after current

    // Always show first page
    if (totalPages > 0) {
      visiblePages.push(0);
    }

    // Add ellipsis if needed
    if (currentPage > range + 1) {
      visiblePages.push(-1); // -1 represents ellipsis
    }

    // Pages around current
    const start = Math.max(1, currentPage - range);
    const end = Math.min(totalPages - 2, currentPage + range);
    
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - range - 2) {
      visiblePages.push(-2); // -2 represents ellipsis
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      visiblePages.push(totalPages - 1);
    }

    return visiblePages;
  }, [currentPage, totalPages]);



  const visiblePages = getVisiblePages();

  return (
    <footer className="w-full bg-[#2C3E50] text-white px-3 py-2.5 shadow-lg border-t border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row items-center justify-between gap-4">
          {/* Page Counter - More subtle */}
          <div className="text-xs text-gray-400 font-medium flex items-center gap-2 flex-shrink-0">
            <span>{currentPage + 1}</span>
            <span>/</span>
            <span>{pages.length}</span>
            {hasUnsavedChanges && (
              <span 
                className="flex items-center gap-1 text-yellow-400 animate-pulse" 
                title="Unsaved changes"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="hidden sm:inline text-xs">Unsaved</span>
              </span>
            )}
          </div>

          {/* Navigation Section - Primary focus */}
          <div className="flex items-center gap-3 flex-1 justify-center">
            {/* Move Backward Button - Icon only on mobile */}
            <button
              onClick={() => onMovePageBackward(currentPage)}
              disabled={!canMoveBackward || pageManagementLoading}
              className={`p-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 ${
                canMoveBackward && !pageManagementLoading
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
              title="Move page backward (←)"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Smart Pagination */}
            <div className="flex items-center gap-1.5">
              {visiblePages.map((pageIndex, idx) => {
                // Ellipsis
                if (pageIndex < 0) {
                  return (
                    <span 
                      key={`ellipsis-${idx}`} 
                      className="px-2 text-gray-500 text-sm select-none"
                    >
                      ...
                    </span>
                  );
                }

                // Page button
                const isActive = pageIndex === currentPage;
                return (
                  <button
                    key={pageIndex}
                    ref={isActive ? activeButtonRef : null}
                    onClick={() => setCurrentPage(pageIndex)}
                    className={`min-w-[36px] h-9 px-2.5 rounded-lg font-medium transition-all duration-200 text-sm flex-shrink-0 ${
                      isActive
                        ? "bg-blue-500 text-white shadow-md ring-2 ring-blue-400 ring-opacity-50"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white"
                    }`}
                    disabled={isActive}
                    title={`Page ${pageIndex + 1}`}
                  >
                    {pageIndex + 1}
                  </button>
                );
              })}
            </div>

            {/* Move Forward Button - Icon only on mobile */}
            <button
              onClick={() => onMovePageForward(currentPage)}
              disabled={!canMoveForward || pageManagementLoading}
              className={`p-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 ${
                canMoveForward && !pageManagementLoading
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
              title="Move page forward (→)"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Action Section - Grouped with divider */}
          <div className="flex items-center gap-2 flex-shrink-0 border-l border-gray-700 pl-3">
            {/* Delete Button */}
            <button
              onClick={() => onDeletePage(currentPage)}
              disabled={!canDelete || pageManagementLoading}
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 text-sm font-medium ${
                canDelete && !pageManagementLoading
                  ? "bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white"
                  : "bg-gray-800 text-gray-600 cursor-not-allowed"
              }`}
              title={canDelete ? "Delete page" : "Cannot delete last page"}
            >
              <Trash2 size={16} />
              <span>Delete Page</span>
            </button>

            {/* New Page Button */}
            <button
              onClick={addPage}
              disabled={pageManagementLoading}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md flex-shrink-0 text-sm font-medium"
              title="Add new page"
            >
              <Plus size={16} />
              <span>New Page</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
