import React from 'react';

export default function Recent({ files = [], onPick = () => {}, allowedTypes = ['image'], galleryType = null }) {
  // Permitir tanto 'image' como 1 para imágenes
  const allowedTypeValues = allowedTypes.map(t => t === 'image' ? 1 : t);
  let filtered = files.filter(f => allowedTypeValues.includes(f.type));
  
  // Filter by galleryType if provided
  if (galleryType) {
    filtered = filtered.filter(f => f.gallery_type === galleryType);
  }
  
  if (!filtered.length) return <div className="p-4 text-sm text-gray-600">No recent items for this type</div>;
  return (
    <div style={{ maxHeight: 400, overflowY: 'auto' }} className="grid grid-cols-4 gap-4">
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
        // Solo renderizar si existe una imagen válida
        if (!imgSrc) return null;
        return (
          <div
            key={idx}
            className="border rounded-xl cursor-pointer flex items-center justify-center hover:shadow-lg transition bg-white hover:bg-blue-50"
            style={{ aspectRatio: '1/1', width: '100%', minHeight: 140, maxHeight: 180, height: '100%' }}
            onClick={() => onPick(f)}
          >
            <img
              src={imgSrc}
              alt={f.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, display: 'block' }}
            />
          </div>
        );
      })}
    </div>
  );
}
