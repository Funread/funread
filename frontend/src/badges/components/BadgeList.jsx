import React, { useState } from "react";

export default function BadgeList({ badges, loading }) {
  const [selectedBadge, setSelectedBadge] = useState(null);

  if (loading) return <div>Cargando badges...</div>;
  if (!badges.length) return <div>No hay badges disponibles.</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {badges.map((badge, idx) => (
          <div
            key={idx}
            className="border rounded p-4 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition"
            onClick={() => setSelectedBadge(badge)}
          >
            <img src={badge.imagen} alt={badge.titulo} className="w-16 h-16 object-cover mb-2" />
            <h3 className="font-bold">{badge.titulo}</h3>
            <p>Nombre: {badge.nombre}</p>
            <p>Meta: {badge.goal_points ?? badge.repeticionesNecesarias ?? badge.puntaje}</p>
            <button className="mt-2 text-blue-600 underline">Ver más</button>
          </div>
        ))}
      </div>
      {/* Modal para ver más datos del badge */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 min-w-[300px] max-w-[90vw] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedBadge(null)}
            >
              &times;
            </button>
            <img src={selectedBadge.imagen} alt={selectedBadge.titulo} className="w-24 h-24 object-cover mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2 text-center">{selectedBadge.titulo}</h2>
            <p className="mb-1 text-center">Nombre: {selectedBadge.nombre}</p>
            <p className="mb-1 text-center">Meta: {selectedBadge.goal_points ?? selectedBadge.repeticionesNecesarias ?? selectedBadge.puntaje}</p>
            {/* Aquí puedes agregar más datos del badge en el futuro */}
            <div className="mt-4 text-center text-gray-500">Más información próximamente...</div>
          </div>
        </div>
      )}
    </>
  );
}
