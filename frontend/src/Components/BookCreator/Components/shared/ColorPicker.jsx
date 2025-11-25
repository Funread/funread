import { COLORES_PREDEFINIDOS } from "./textConstants";

export default function ColorPicker({ 
  label, 
  value, 
  onChange, 
  showTransparent = false,
  presetCount = 6 
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-orange-800 mb-1">
        {label}
      </label>
      <div className="flex gap-1 mb-1">
        {showTransparent && (
          <button
            className={`w-5 h-5 rounded-md border-2 transition-all ${
              value === "transparent" ? "border-gray-800 scale-110 shadow-md" : "border-gray-300 hover:border-gray-400"
            }`}
            style={{ 
              background: "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, white 25%, white 75%, #ccc 75%)",
              backgroundSize: "6px 6px",
              backgroundPosition: "0 0, 3px 3px"
            }}
            onClick={() => onChange('transparent')}
            title="Transparent"
          />
        )}
        {COLORES_PREDEFINIDOS.slice(0, presetCount - (showTransparent ? 1 : 0)).map((color) => (
          <button
            key={color}
            className={`w-5 h-5 rounded-md border-2 transition-all ${
              value === color ? "border-gray-800 scale-110 shadow-md" : "border-gray-300 hover:border-gray-400"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            title={color}
          />
        ))}
      </div>
      <input
        type="color"
        value={value === "transparent" ? "#ffffff" : value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-7 border-2 border-gray-300 rounded-md cursor-pointer"
      />
    </div>
  );
}
