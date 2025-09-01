import React from 'react';
import { BASE_URL } from '../../../../settings';

export default function MyGallery({ gallery = [], onPick = () => {}, allowedTypes = ['image'] }) {
  // Permitir tanto 'image' como 1 para imágenes
  const allowedTypeValues = allowedTypes.map(t => t === 'image' ? 1 : t);
  const filtered = gallery.filter(f => allowedTypeValues.includes(f.type));
  if (!filtered.length) return <div className="p-4 text-sm text-gray-600">No items in gallery</div>;
  return (
    <div style={{ maxHeight: 400, overflowY: 'auto' }} className="grid grid-cols-4 gap-3">
      {filtered.map((g, i) => (
        <div key={i} className="border rounded p-2 cursor-pointer" onClick={() => onPick(g)}>
          <img
            src={g.file.startsWith('/api/') ? `${BASE_URL.replace(/\/api\/?$/, '')}${g.file}` : g.file}
            alt={g.name}
            style={{ width: '100%', height: 100, objectFit: 'cover', marginBottom: 8 }}
          />
          <div className="text-sm">{g.name}</div>
          <div className="text-xs text-gray-500">{g.type}</div>
        </div>
      ))}
    </div>
  );
}
