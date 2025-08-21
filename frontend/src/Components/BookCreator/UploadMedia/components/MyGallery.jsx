import React from 'react';

export default function MyGallery({ gallery = [], onPick = () => {}, allowedTypes = ['image'] }) {
  const filtered = gallery.filter(f => allowedTypes.includes(f.type));
  if (!filtered.length) return <div className="p-4 text-sm text-gray-600">No items in gallery</div>;
  return (
    <div className="grid grid-cols-4 gap-3">
      {filtered.map((g, i) => (
        <div key={i} className="border rounded p-2 cursor-pointer" onClick={() => onPick(g)}>
          <div className="text-sm">{g.name}</div>
          <div className="text-xs text-gray-500">{g.type}</div>
        </div>
      ))}
    </div>
  );
}
