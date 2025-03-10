import { useState } from "react";

export default function TextEditorModal({ text, onSave }) {
  const [value, setValue] = useState(text);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">Editar Texto</h2>
        <textarea
          className="w-full border p-2 rounded-lg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => onSave(null)}>Cancelar</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => onSave(value)}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
