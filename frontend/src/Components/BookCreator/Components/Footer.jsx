export default function Footer({ pages, currentPage, setCurrentPage, addPage }) {
  return (
    <footer className="w-full bg-[#2C3E50] text-white px-2 py-3 shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 max-w-5xl mx-auto">
        {/* Número de Página Actual */}
        <div className="text-base md:text-lg font-semibold flex items-center justify-center md:justify-start">
          <span className="mr-2">📖 Page</span>
          <span className="text-yellow-400">{currentPage + 1}</span>
          <span className="mx-1">of</span>
          <span className="text-yellow-400">{pages.length}</span>
        </div>

        {/* Lista de Páginas */}
        <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2 overflow-x-auto max-w-full py-1">
          {Array.isArray(pages) &&
            pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`px-2 md:px-3 py-1 rounded-lg font-semibold transition text-xs md:text-base ${
                  currentPage === index
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
                style={{ minWidth: 32 }}
              >
                {index + 1}
              </button>
            ))}
        </div>

        {/* Botón Agregar Página */}
        <div className="flex justify-center md:justify-end">
          <button
            onClick={addPage}
            className="px-3 md:px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition text-xs md:text-base"
          >
            ➕ New Page
          </button>
        </div>
      </div>
    </footer>
  );
}
