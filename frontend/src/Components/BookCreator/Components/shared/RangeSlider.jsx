export default function RangeSlider({ 
  label, 
  value, 
  min, 
  max, 
  step = 1, 
  onChange, 
  unit = "",
  formatValue,
  gradientColor = "#6366f1",
  showWarning = false,
  warningMessage = ""
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  const gradient = `linear-gradient(to right, ${gradientColor} 0%, ${gradientColor} ${percentage}%, #e0e7ff ${percentage}%, #e0e7ff 100%)`;
  
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;

  return (
    <div>
      <label className="flex items-center justify-between text-xs font-medium text-indigo-800 mb-1">
        <span>{label}</span>
        <span className="text-indigo-600 bg-white px-1.5 py-0.5 rounded text-xs">
          {displayValue}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{ background: gradient }}
      />
      {showWarning && (
        <p className="text-xs text-orange-600 mt-1">
          {warningMessage}
        </p>
      )}
    </div>
  );
}
