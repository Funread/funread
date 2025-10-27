import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Text, Rect } from "react-konva";
import { 
  FUENTES_DISPONIBLES, 
  COLORES_PREDEFINIDOS,
  getCategoriasFuentes,
  getFuentesFiltradas 
} from "./shared/textConstants";

export default function TextEditorModal({ 
  text, 
  onSave, 
  fontFamily: initialFont, 
  fontSize: initialSize, 
  fill: initialFill,
  fontWeight: initialFontWeight,
  fontStyle: initialFontStyle,
  backgroundColor: initialBackgroundColor,
  opacity: initialOpacity,
  rotation: initialRotation,
  lineHeight: initialLineHeight,
  shadowColor: initialShadowColor,
  currentElement,
  onStyleChange, 
  pageType 
}) {
  const [value, setValue] = useState(text);
  const [fontFamily, setFontFamily] = useState(initialFont || "Arial");
  const [fontSize, setFontSize] = useState(initialSize || 20);
  const [colorTexto, setColorTexto] = useState(initialFill || "#000000");
  const [colorFondo, setColorFondo] = useState(initialBackgroundColor || "transparent");
  const [estiloTexto, setEstiloTexto] = useState(() => {
    let style = "normal";
    if (initialFontWeight === "bold") style += " bold";
    if (initialFontStyle === "italic") style += " italic";
    return style.trim();
  });
  const [opacidad, setOpacidad] = useState(Math.round((initialOpacity || 1) * 100));
  const [sombra, setSombra] = useState(!!initialShadowColor);
  const [rotacion, setRotacion] = useState(initialRotation || 0);
  const [espaciadoLinea, setEspaciadoLinea] = useState(initialLineHeight || 1.2);
  const [isEditing, setIsEditing] = useState(false);
  const [categoriaFuenteSeleccionada, setCategoriaFuenteSeleccionada] = useState("System");
  
  const textareaRef = useRef();
  const categoriasFuentes = getCategoriasFuentes();
  const fuentesFiltradas = getFuentesFiltradas(categoriaFuenteSeleccionada);

  useEffect(() => {
    setValue(text);
    setFontFamily(initialFont || "Arial");
    setFontSize(initialSize || 20);
    setColorTexto(initialFill || "#000000");
    setColorFondo(initialBackgroundColor || "transparent");
    
    let style = "normal";
    if (initialFontWeight === "bold") style += " bold";
    if (initialFontStyle === "italic") style += " italic";
    setEstiloTexto(style.trim());
    
    setOpacidad(Math.round((initialOpacity || 1) * 100));
    setSombra(!!initialShadowColor);
    setRotacion(initialRotation || 0);
    setEspaciadoLinea(initialLineHeight || 1.2);
    setIsEditing(false);
    
    if (textareaRef.current) textareaRef.current.blur();
  }, [text, initialFont, initialSize, initialFill, initialFontWeight, initialFontStyle, 
      initialBackgroundColor, initialOpacity, initialShadowColor, initialRotation, 
      initialLineHeight, pageType]);

  const obtenerEstiloCSS = () => ({
    fontSize: `${fontSize}px`,
    color: colorTexto,
    fontFamily: fontFamily,
    fontStyle: estiloTexto.includes("italic") ? "italic" : "normal",
    fontWeight: estiloTexto.includes("bold") ? "bold" : "normal",
    lineHeight: espaciadoLinea,
    textShadow: sombra ? "2px 2px 4px rgba(0,0,0,0.5)" : "none",
    backgroundColor: colorFondo !== "transparent" ? colorFondo : "transparent",
    transform: `rotate(${rotacion}deg)`,
    opacity: opacidad / 100,
    padding: colorFondo !== "transparent" ? "4px 8px" : "0",
    borderRadius: colorFondo !== "transparent" ? "4px" : "0",
  });

  const handleSave = () => {
    const fontWeight = estiloTexto.includes("bold") ? "bold" : "normal";
    const fontStyle = estiloTexto.includes("italic") ? "italic" : "normal";
    const isBold = estiloTexto.includes("bold");
    
    let strokeColor = undefined;
    let strokeWidth = 0;
    if (isBold) {
      strokeColor = colorTexto;
      strokeWidth = 0.6;
    }
    
    const estilos = {
      fontSize: fontSize,
      fill: colorTexto,
      fontFamily: fontFamily,
      fontStyle: fontStyle,
      fontWeight: fontWeight,
      lineHeight: espaciadoLinea,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      rotation: rotacion,
      opacity: opacidad / 100,
      shadowColor: sombra ? "rgba(0,0,0,0.5)" : undefined,
      shadowBlur: sombra ? 4 : 0,
      shadowOffsetX: sombra ? 2 : 0,
      shadowOffsetY: sombra ? 2 : 0,
      backgroundColor: colorFondo !== "transparent" ? colorFondo : undefined,
    };
    
    onSave(value, estilos);
    if (onStyleChange) onStyleChange(estilos);
  };

  const handleTextClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (textareaRef.current) textareaRef.current.focus();
    }, 0);
  };

  const stageKey = `stage-${String(text)}-${String(initialFont)}-${String(initialSize)}-pt-${String(pageType)}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">✏️ Advanced Text Editor</h2>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              👁️ Preview
            </label>
            <span className="text-xs text-gray-500 italic">Double-click to edit directly</span>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl p-6 border-2 border-dashed border-gray-300 shadow-inner min-h-[140px] relative overflow-hidden">
            <div className="relative" style={{ height: 130 }}>
              <Stage key={stageKey} width={540} height={120} className="rounded-lg bg-white shadow-sm mx-auto">
                <Layer>
                  {colorFondo !== "transparent" && (
                    <Rect
                      x={8}
                      y={35}
                      width={Math.max(value.length * (fontSize * 0.6), fontSize * 2)}
                      height={fontSize * espaciadoLinea + 8}
                      fill={colorFondo}
                      cornerRadius={6}
                      opacity={opacidad / 100}
                      rotation={rotacion}
                    />
                  )}
                  <Text
                    text={value || "Type your text here..."}
                    x={15}
                    y={40}
                    fontSize={fontSize}
                    fontFamily={fontFamily}
                    fill={colorTexto}
                    fontStyle={estiloTexto.includes("italic") ? "italic" : "normal"}
                    fontWeight={estiloTexto.includes("bold") ? "bold" : "normal"}
                    lineHeight={espaciadoLinea}
                    stroke={estiloTexto.includes("bold") ? colorTexto : undefined}
                    strokeWidth={estiloTexto.includes("bold") ? 0.6 : 0}
                    rotation={rotacion}
                    opacity={opacidad / 100}
                    shadowColor={sombra ? "rgba(0,0,0,0.5)" : undefined}
                    shadowBlur={sombra ? 4 : 0}
                    shadowOffsetX={sombra ? 2 : 0}
                    shadowOffsetY={sombra ? 2 : 0}
                    width={510}
                    height={70}
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
                  className="absolute top-0 left-0 w-full h-full border-3 border-blue-500 p-4 rounded-xl bg-white shadow-xl z-10"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  style={obtenerEstiloCSS()}
                  rows={4}
                  placeholder="Type your text here..."
                />
              )}
            </div>
            <div className="absolute bottom-2 right-2 flex items-center gap-2 text-xs text-gray-500">
              <span className="bg-white px-2 py-1 rounded-full shadow-sm">
                {value.length} characters
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          
          <div className="flex-1 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                📝 Font Category:
              </label>
              <select
                value={categoriaFuenteSeleccionada}
                onChange={(e) => setCategoriaFuenteSeleccionada(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                {categoriasFuentes.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria} ({categoria === "All" ? FUENTES_DISPONIBLES.length : fuentesFiltradas.length})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🔤 Font ({fuentesFiltradas.length}):
              </label>
              <select 
                value={fontFamily} 
                onChange={e => setFontFamily(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                {fuentesFiltradas.map(fuente => (
                  <option key={fuente.value} value={fuente.value} style={{fontFamily: fuente.value}}>
                    {fuente.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                📏 Size: {fontSize}px
              </label>
              <input
                type="range"
                min="8"
                max="100"
                value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💫 Text Style:
              </label>
              <div className="flex gap-2">
                <button
                  className={`flex-1 px-3 py-2 text-sm border rounded-md transition-colors ${
                    estiloTexto.includes("bold") 
                      ? "bg-blue-500 text-white border-blue-500" 
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setEstiloTexto(estiloTexto.includes("bold") ? estiloTexto.replace("bold", "").trim() || "normal" : `${estiloTexto} bold`.trim())}
                >
                  <strong>B</strong> Bold
                </button>
                <button
                  className={`flex-1 px-3 py-2 text-sm border rounded-md transition-colors ${
                    estiloTexto.includes("italic") 
                      ? "bg-blue-500 text-white border-blue-500" 
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setEstiloTexto(estiloTexto.includes("italic") ? estiloTexto.replace("italic", "").trim() || "normal" : `${estiloTexto} italic`.trim())}
                >
                  <em>I</em> Italic
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🌈 Text Color:
              </label>
              <div className="flex gap-1 mb-2">
                {COLORES_PREDEFINIDOS.slice(0, 6).map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded border-2 transition-transform hover:scale-110 ${
                      colorTexto === color ? "border-gray-800" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setColorTexto(color)}
                  />
                ))}
              </div>
              <input
                type="color"
                value={colorTexto}
                onChange={(e) => setColorTexto(e.target.value)}
                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🎨 Background Color:
              </label>
              <div className="flex gap-2 items-center">
                <button
                  className={`px-3 py-1 text-xs border rounded ${
                    colorFondo === "transparent" ? "bg-gray-200 text-gray-700" : "bg-white text-gray-600"
                  }`}
                  onClick={() => setColorFondo("transparent")}
                >
                  No background
                </button>
                <input
                  type="color"
                  value={colorFondo === "transparent" ? "#ffffff" : colorFondo}
                  onChange={(e) => setColorFondo(e.target.value)}
                  className="flex-1 h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              🔄 Rotation: {rotacion}°
            </label>
            <input
              type="range"
              min="-45"
              max="45"
              value={rotacion}
              onChange={(e) => setRotacion(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              💨 Opacity: {opacidad}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={opacidad}
              onChange={(e) => setOpacidad(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              📏 Line Spacing: {espaciadoLinea.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.8"
              max="2.0"
              step="0.1"
              value={espaciadoLinea}
              onChange={(e) => setEspaciadoLinea(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ✨ Effects:
          </label>
          <button
            className={`px-4 py-2 text-sm border rounded-md transition-colors ${
              sombra 
                ? "bg-purple-500 text-white border-purple-500" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setSombra(!sombra)}
          >
            🌟 {sombra ? "Disable" : "Enable"} Shadow
          </button>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <button 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            onClick={() => onSave(null)}
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
