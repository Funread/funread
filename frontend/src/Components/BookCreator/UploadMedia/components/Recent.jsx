import React from 'react';

export default function Recent({ files = [], onPick = () => {}, allowedTypes = ['image'] }) {
  // Permitir tanto 'image' como 1 para imágenes
  const allowedTypeValues = allowedTypes.map(t => t === 'image' ? 1 : t);
  const filtered = files.filter(f => allowedTypeValues.includes(f.type));
  if (!filtered.length) return <div className="p-4 text-sm text-gray-600">No recent items</div>;
  return (
    <div className="grid grid-cols-4 gap-4">
      {filtered.map((f, idx) => {
        let imgSrc = null;
        if (f.type === 1) {
          if (f.previewUrl) {
            imgSrc = f.previewUrl;
          } else if (typeof f.payload === 'string') {
            imgSrc = f.payload;
          } else if (f.payload instanceof File || f.payload instanceof Blob) {
            try {
              imgSrc = URL.createObjectURL(f.payload);
            } catch {}
          }
        }
        return (
          <div key={idx} className="border rounded-lg p-3 cursor-pointer flex flex-col items-center hover:shadow transition" onClick={() => onPick(f)}>
            {imgSrc && (
              <img
                src={imgSrc}
                alt={f.name}
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
              />
            )}
            <div className="text-sm font-medium text-center">{f.name}</div>
            <div className="text-xs text-gray-500 text-center">{f.type === 1 ? 'Imagen' : f.type}</div>
          </div>
        );
      })}
    </div>
  );
}
