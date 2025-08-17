import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Text } from "react-konva";

const FONT_FAMILIES = [
  { label: "Arial", value: "Arial" },
  { label: "Comic Sans", value: "Comic Sans MS" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Roboto", value: "Roboto" },
  { label: "Lobster", value: "Lobster" },
];
const FONT_SIZES = [16, 20, 28, 36, 48, 64];

export default function TextEditorModal({ text, onSave, fontFamily: initialFont, fontSize: initialSize, onStyleChange, pageType }) {
  const [value, setValue] = useState(text);
  const [fontFamily, setFontFamily] = useState(initialFont || FONT_FAMILIES[0].value);
  const [fontSize, setFontSize] = useState(initialSize || 20);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef();

  // Sync incoming props (e.g. when changing pages) into local state and
  // reset editing state so Konva stage/textarea are reinitialized.
  useEffect(() => {
    setValue(text);
    setFontFamily(initialFont || FONT_FAMILIES[0].value);
    setFontSize(initialSize || 20);
    setIsEditing(false);
    if (textareaRef.current) textareaRef.current.blur();
  }, [text, initialFont, initialSize, pageType]);

  const handleSave = () => {
    onSave(value, { fontFamily, fontSize });
    if (onStyleChange) onStyleChange({ fontFamily, fontSize });
  };

  // Para editar el texto sobre el canvas
  const handleTextClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (textareaRef.current) textareaRef.current.focus();
    }, 0);
  };

  // Use a key based on incoming props so the <Stage> unmounts/remounts when
  // the parent changes page/type. This avoids Konva getting into a broken state
  // when the page loads already as type 4/5 or similar.
  // include pageType so the Stage unmounts/remounts when the parent changes
  // page type (fixes Konva getting into a broken state for types 4/5)
  const stageKey = `stage-${String(text)}-${String(initialFont)}-${String(initialSize)}-pt-${String(pageType)}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-2">Editar Texto</h2>
        <div className="mb-2 relative" style={{ height: 120 }}>
          <Stage key={stageKey} width={350} height={100} className="border rounded bg-gray-50">
            <Layer>
              <Text
                text={value || "Doble clic para editar"}
                x={10}
                y={30}
                fontSize={fontSize}
                fontFamily={fontFamily}
                fill="#222"
                width={330}
                height={60}
                align="left"
                verticalAlign="middle"
                onDblClick={handleTextClick}
                onTap={handleTextClick}
                listening={true}
                draggable={false}
              />
            </Layer>
          </Stage>
          {isEditing && (
            <textarea
              ref={textareaRef}
              className="absolute top-0 left-0 w-full h-full border p-2 rounded-lg bg-white bg-opacity-90"
              value={value}
              onChange={e => setValue(e.target.value)}
              onBlur={() => setIsEditing(false)}
              style={{ fontFamily, fontSize, resize: "none" }}
              rows={2}
            />
          )}
        </div>
        <div className="flex gap-2 mb-2">
          <select className="border rounded p-1" value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
            {FONT_FAMILIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
          <select className="border rounded p-1" value={fontSize} onChange={e => setFontSize(Number(e.target.value))}>
            {FONT_SIZES.map(s => <option key={s} value={s}>{s}px</option>)}
          </select>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => onSave(null)}>Cancelar</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleSave}>Guardar</button>
        </div>
        <div className="text-xs text-gray-500 mt-2">Doble clic en el texto para editarlo</div>
      </div>
    </div>
  );
}
