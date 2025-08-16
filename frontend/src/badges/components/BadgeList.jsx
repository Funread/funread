import React from "react";

export default function BadgeList({ badges, loading }) {
  if (loading) return <div>Cargando badges...</div>;
  if (!badges.length) return <div>No hay badges disponibles.</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {badges.map((badge, idx) => (
        <div key={idx} className="border rounded p-4 flex flex-col items-center">
          <img src={badge.imagen} alt={badge.titulo} className="w-16 h-16 object-cover mb-2" />
          <h3 className="font-bold">{badge.titulo}</h3>
          <p>Nombre: {badge.nombre}</p>
          <p>Veces requeridas: {badge.repeticionesNecesarias}</p>
        </div>
      ))}
    </div>
  );
}
