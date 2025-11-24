import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Componente para mostrar controles de gestión de páginas
 * Permite eliminar y mover páginas
 * 
 * @param {Object} props
 * @param {number} props.currentPage - Índice de la página actual
 * @param {number} props.totalPages - Total de páginas en el libro
 * @param {Function} props.onDelete - Callback para eliminar la página actual
 * @param {Function} props.onMoveBackward - Callback para mover la página hacia atrás
 * @param {Function} props.onMoveForward - Callback para mover la página hacia adelante
 * @param {boolean} props.isLoading - Estado de carga
 */
export default function PageManagementControls({
  currentPage,
  totalPages,
  onDelete,
  onMoveBackward,
  onMoveForward,
  isLoading = false
}) {
  const canMoveBackward = currentPage > 0;
  const canMoveForward = currentPage < totalPages - 1;
  const canDelete = totalPages > 1;

  return (
    <div className="flex items-center gap-2">
      {/* Botón Mover hacia Atrás */}
      <button
        onClick={() => onMoveBackward(currentPage)}
        disabled={!canMoveBackward || isLoading}
        className={`p-2 rounded-lg font-semibold transition text-xs md:text-sm flex items-center gap-1 ${
          canMoveBackward && !isLoading
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
        title="Mover página hacia atrás"
      >
        <ChevronLeft size={16} />
        <span className="hidden md:inline">Atrás</span>
      </button>

      {/* Botón Mover hacia Adelante */}
      <button
        onClick={() => onMoveForward(currentPage)}
        disabled={!canMoveForward || isLoading}
        className={`p-2 rounded-lg font-semibold transition text-xs md:text-sm flex items-center gap-1 ${
          canMoveForward && !isLoading
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
        title="Mover página hacia adelante"
      >
        <span className="hidden md:inline">Adelante</span>
        <ChevronRight size={16} />
      </button>

      {/* Botón Eliminar */}
      <button
        onClick={() => onDelete(currentPage)}
        disabled={!canDelete || isLoading}
        className={`p-2 rounded-lg font-semibold transition text-xs md:text-sm flex items-center gap-1 ${
          canDelete && !isLoading
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
        title={canDelete ? "Eliminar página actual" : "No puedes eliminar la última página"}
      >
        <Trash2 size={16} />
        <span className="hidden md:inline">Eliminar</span>
      </button>
    </div>
  );
}
