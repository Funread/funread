import React from 'react';

export default function Recent({ files = [], onPick = () => {}, allowedTypes = ['image'] }) {
  const filtered = files.filter(f => allowedTypes.includes(f.type));
  if (!filtered.length) return <div className="p-4 text-sm text-gray-600">No recent items</div>;
  return (
    <div className="grid grid-cols-3 gap-3">
      {filtered.map((f, idx) => (
        <div key={idx} className="border rounded p-2 cursor-pointer" onClick={() => onPick(f)}>
          <div className="text-sm font-medium">{f.name}</div>
          <div className="text-xs text-gray-500">{f.type}</div>
        </div>
      ))}
    </div>
  );
}
