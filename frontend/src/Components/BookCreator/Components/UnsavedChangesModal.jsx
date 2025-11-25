import { AlertTriangle, Save, X } from 'lucide-react';
import { useEffect } from 'react';

export default function UnsavedChangesModal({ isOpen, onSave, onDiscard, onCancel }) {
  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-md"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden border border-gray-200"
        style={{ animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495e] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 rounded-full p-2.5 shadow-lg">
              <AlertTriangle className="text-gray-800" size={26} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Unsaved Changes</h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 bg-gradient-to-b from-white to-gray-50">
          <p className="text-gray-800 text-base leading-relaxed mb-2 font-medium">
            You have unsaved changes on this page.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Do you want to save your work before leaving?
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 pt-2 bg-gray-50 flex flex-col gap-3">
          {/* Main Actions Row */}
          <div className="flex gap-3">
            {/* Save Button - Primary */}
            <button
              onClick={onSave}
              title="Save your changes and continue to the next page"
              className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Save size={20} strokeWidth={2.5} />
              <span className="text-base">Save</span>
            </button>

            {/* Discard Button - Destructive */}
            <button
              onClick={onDiscard}
              title="Discard all changes and continue to the next page"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <X size={20} strokeWidth={2.5} />
              <span className="text-base">Discard</span>
            </button>
          </div>

          {/* Cancel Button - Secondary */}
          <button
            onClick={onCancel}
            title="Cancel and stay on the current page with your unsaved changes"
            className="w-full px-4 py-3 bg-white hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 shadow-sm"
          >
            Stay on Page
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
