import React from 'react';

export default function Tabs({ tabs = [], active, onChange }) {
  return (
    <div className="flex space-x-2 border-b">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3 py-2 -mb-px ${active === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
