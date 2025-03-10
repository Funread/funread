export default function Footer({ pages, currentPage, setCurrentPage, addPage }) {
  return (
    <div className="w-full bg-[#2C3E50] text-white p-3 fixed bottom-0 flex justify-between items-center shadow-lg">
      {/* Número de Página Actual */}
      <div className="text-lg font-semibold">
        📖 Página <span className="text-yellow-400">{currentPage + 1}</span> de <span className="text-yellow-400">{pages.length}</span>
      </div>

      {/* Lista de Páginas */}
      <div className="flex space-x-2">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              currentPage === index
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Botón Agregar Página */}
      <button
        onClick={addPage}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition"
      >
        ➕ Nueva Página
      </button>
    </div>
  );
}
