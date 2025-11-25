import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Stage, Layer, Text, Rect } from "react-konva";
import { 
  FUENTES_DISPONIBLES,
  getCategoriasFuentes,
  getFuentesFiltradas 
} from "./shared/textConstants";
import { dividirTextoAutomatico } from "./shared/textUtils";
import RangeSlider from "./shared/RangeSlider";
import StyleButtons from "./shared/StyleButtons";
import AlignmentButtons from "./shared/AlignmentButtons";
import ColorPicker from "./shared/ColorPicker";
import { useTextStyles } from "./hooks/useTextStyles";

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
  const [textAlign, setTextAlign] = useState(currentElement?.textAlign || "left");
  const [letterSpacing, setLetterSpacing] = useState(currentElement?.letterSpacing || 0);
  const [textDecoration, setTextDecoration] = useState(currentElement?.textDecoration || "none");
  const [searchFont, setSearchFont] = useState("");
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
  const categoriasFuentes = useMemo(() => getCategoriasFuentes(), []);
  const fuentesFiltradas = useMemo(() => {
    let fuentes = getFuentesFiltradas(categoriaFuenteSeleccionada);
    if (searchFont.trim()) {
      fuentes = fuentes.filter(f => 
        f.name.toLowerCase().includes(searchFont.toLowerCase())
      );
    }
    return fuentes;
  }, [categoriaFuenteSeleccionada, searchFont]);

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

  const obtenerEstiloCSS = useCallback(() => ({
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
  }), [fontSize, colorTexto, fontFamily, estiloTexto, espaciadoLinea, sombra, colorFondo, rotacion, opacidad]);

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
    
    const maxWidth = fontSize * 20;
    const textoAjustado = dividirTextoAutomatico(value, fontSize, fontFamily, maxWidth);
    
    const estilos = {
      fontSize: fontSize,
      fill: colorTexto,
      fontFamily: fontFamily,
      fontStyle: fontStyle,
      fontWeight: fontWeight,
      lineHeight: espaciadoLinea,
      width: maxWidth,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      rotation: rotacion,
      opacity: opacidad / 100,
      shadowColor: sombra ? "rgba(0,0,0,0.5)" : undefined,
      shadowBlur: sombra ? 4 : 0,
      shadowOffsetX: sombra ? 2 : 0,
      shadowOffsetY: sombra ? 2 : 0,
      backgroundColor: colorFondo !== "transparent" ? colorFondo : undefined,
      textAlign: textAlign,
      letterSpacing: letterSpacing,
      textDecoration: textDecoration,
    };
    
    onSave(textoAjustado, estilos);
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
                    textDecoration={textDecoration}
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
                🔍 Search Font:
              </label>
              <input
                type="text"
                value={searchFont}
                onChange={(e) => setSearchFont(e.target.value)}
                placeholder="Type to search fonts..."
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
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
                    {categoria}
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
            
            <RangeSlider
              label="📏 Size"
              value={fontSize}
              min={8}
              max={100}
              onChange={(val) => setFontSize(val)}
              unit="px"
              gradientColor="#0891b2"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💫 Text Style:
              </label>
              <StyleButtons
                textStyles={{
                  fontStyle: estiloTexto,
                  textDecoration: textDecoration,
                  shadow: sombra
                }}
                toggleBold={() => setEstiloTexto(estiloTexto.includes("bold") ? estiloTexto.replace("bold", "").trim() || "normal" : `${estiloTexto} bold`.trim())}
                toggleItalic={() => setEstiloTexto(estiloTexto.includes("italic") ? estiloTexto.replace("italic", "").trim() || "normal" : `${estiloTexto} italic`.trim())}
                toggleUnderline={() => setTextDecoration(textDecoration.includes("underline") ? "none" : "underline")}
                toggleStrike={() => setTextDecoration(textDecoration.includes("line-through") ? "none" : "line-through")}
                toggleShadow={() => setSombra(!sombra)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📐 Text Alignment:
              </label>
              <AlignmentButtons
                value={textAlign}
                onChange={(value) => setTextAlign(value)}
              />
            </div>
            
            <ColorPicker
              label="🌈 Text Color:"
              value={colorTexto}
              onChange={(color) => setColorTexto(color)}
              presetCount={6}
            />
            
            <ColorPicker
              label="🎨 Background Color:"
              value={colorFondo}
              onChange={(color) => setColorFondo(color)}
              showTransparent={true}
              presetCount={6}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <div className="flex-1">
            <RangeSlider
              label="🔄 Rotation"
              value={rotacion}
              min={-45}
              max={45}
              onChange={(val) => setRotacion(val)}
              unit="°"
              gradientColor="#a78bfa"
            />
          </div>
          
          <div className="flex-1">
            <RangeSlider
              label="💨 Opacity"
              value={opacidad}
              min={10}
              max={100}
              onChange={(val) => setOpacidad(val)}
              unit="%"
              gradientColor="#8b5cf6"
            />
          </div>
          
          <div className="flex-1">
            <RangeSlider
              label="📏 Line Spacing"
              value={espaciadoLinea}
              min={0.8}
              max={2.0}
              step={0.1}
              onChange={(val) => setEspaciadoLinea(val)}
              formatValue={(val) => val.toFixed(1)}
              gradientColor="#6366f1"
            />
          </div>
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
