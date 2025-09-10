import React from 'react';
import { BASE_URL } from '../../../../settings';

export default function MyGallery({ gallery = [], onPick = () => {}, allowedTypes = ['image'] }) {
  // Permitir tanto 'image' como 1 para imágenes
  const allowedTypeValues = allowedTypes.map(t => t === 'image' ? 1 : t);
  const filtered = gallery.filter(f => allowedTypeValues.includes(f.type));
  if (!filtered.length) return <div className="p-4 text-sm text-gray-600">No items in gallery</div>;
  return (
    <div style={{ maxHeight: 400, overflowY: 'auto' }} className="grid grid-cols-4 gap-4">
      {filtered.map((g, i) => (
        <div
          key={i}
          className="border rounded-xl cursor-pointer flex items-center justify-center hover:shadow-lg transition bg-white hover:bg-blue-50"
          style={{ aspectRatio: '1/1', width: '100%', minHeight: 140, maxHeight: 180, height: '100%' }}
          onClick={() => onPick(g)}
        >
          <img
            src={g.file.startsWith('/api/') ? `${BASE_URL.replace(/\/api\/?$/, '')}${g.file}` : g.file}
            alt={g.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, display: 'block' }}
          />
        </div>
      ))}
    </div>
  );
}
