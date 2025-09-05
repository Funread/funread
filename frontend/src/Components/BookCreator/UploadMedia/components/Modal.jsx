import React from 'react';

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 p-6">
      <div className="w-full max-w-4xl bg-white rounded shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="text-gray-600">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
