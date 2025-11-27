import { Button } from "../Button";
import { useState, useEffect, useMemo, useCallback } from "react";
import "./fonts.css";
import { 
  FUENTES_DISPONIBLES, 
  PLANTILLAS_TEXTO,
  getCategoriasFuentes,
  getFuentesFiltradas 
} from "../shared/textConstants";
import { dividirTextoAutomatico } from "../shared/textUtils";
import { useTextStyles } from "../hooks/useTextStyles";
import RangeSlider from "../shared/RangeSlider";
import StyleButtons from "../shared/StyleButtons";
import AlignmentButtons from "../shared/AlignmentButtons";
import ColorPicker from "../shared/ColorPicker";

export default function TextPanel({ setElements, widgetValidation }) {
  const {
    textStyles,
    updateStyle,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleStrike,
    toggleShadow,
    resetStyles,
    getCSSStyles,
    getKonvaStyles,
    showContrastWarning
  } = useTextStyles();
  
  const [modoEditor, setModoEditor] = useState("personalizado");
  const [searchFont, setSearchFont] = useState("");
  
  useEffect(() => {
    const testElements = [
      'Patrick Hand', 'Kalam', 'Fredoka One', 'Chewy', 'Caveat', 'Architects Daughter',
      'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Inter', 'Ubuntu', 'Nunito',
      'Source Code Pro', 'Fira Code'
    ];
    
    testElements.forEach(font => {
      const span = document.createElement('span');
      span.style.fontFamily = font;
      span.style.fontSize = '1px';
      span.style.position = 'absolute';
      span.style.left = '-9999px';
      span.style.top = '-9999px';
      span.textContent = 'Test';
      document.body.appendChild(span);
      
      setTimeout(() => {
        document.body.removeChild(span);
      }, 100);
    });
  }, []);
  
  const [categoriaFuenteSeleccionada, setCategoriaFuenteSeleccionada] = useState("All");
  const [categoriaPlantillaSeleccionada, setCategoriaPlantillaSeleccionada] = useState("📚 Educational");

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

  const handleAgregarTextoPersonalizado = () => {
    if (!textStyles.text.trim()) return;
    
    const estiloKonva = getKonvaStyles();
    
    const maxWidth = textStyles.fontSize * 20;
    const textoAjustado = dividirTextoAutomatico(
      textStyles.text, 
      textStyles.fontSize, 
      textStyles.fontFamily,
      maxWidth
    );
    
    const shouldWrapText = textStyles.textAlign !== 'justify';
    const finalText = shouldWrapText ? textoAjustado : textStyles.text;
    
    widgetValidation(2, 2);
    setElements((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      {
        id: Date.now().toString(),
        type: "text",
        text: finalText,
        x: 100,
        y: 100,
        width: maxWidth,
        ...estiloKonva,
      },
    ]);
  };

  const handleAgregarPlantilla = (plantilla) => {
    const maxWidth = plantilla.config.fontSize * 20;
    const textoAjustado = dividirTextoAutomatico(
      plantilla.name, 
      plantilla.config.fontSize, 
      plantilla.config.fontFamily,
      maxWidth
    );
    
    widgetValidation(2, 2);
    setElements((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      {
        id: Date.now().toString(),
        type: "text",
        text: textoAjustado,
        x: 100,
        y: 100,
        width: maxWidth,
        ...plantilla.config,
      },
    ]);
  };



  const resetearEstilos = () => {
    resetStyles();
    setSearchFont("");
    setCategoriaPlantillaSeleccionada("📚 Educational");
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex-shrink-0 border-b bg-gradient-to-b from-gray-50 to-white shadow-sm">
        <div className="text-center pt-2.5 pb-1.5">
          <h3 className="text-sm font-bold text-gray-800">📝 Text Editor</h3>
        </div>
        
        <div className="px-2 pb-2">
          <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
            <button
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-semibold transition-all text-center ${
                modoEditor === "personalizado" 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setModoEditor("personalizado")}
              title="Advanced editor"
            >
              ✏️ Editor
            </button>
            <button
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-semibold transition-all text-center ${
                modoEditor === "plantillas" 
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setModoEditor("plantillas")}
              title="Templates"
            >
              📋 Templates
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-1 h-0">
        {modoEditor === "personalizado" ? (
          <div className="space-y-1.5">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200">
              <label className="block text-xs font-semibold text-blue-900 mb-1 flex items-center justify-between">
                <span>✍️ Your Text</span>
                <span className="text-blue-600 bg-white px-1.5 py-0.5 rounded text-xs">
                  {textStyles.text.length}
                </span>
              </label>
              <textarea
                value={textStyles.text}
                onChange={(e) => updateStyle('text', e.target.value)}
                className="w-full p-2 border-2 border-blue-200 rounded-md text-xs resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
                rows="2"
                placeholder="Type your creative text here..."
              />
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-2 border border-green-200">
              <div className="text-xs font-semibold text-green-900 mb-1.5">🔤 Font</div>
              <div className="mb-2">
                <input
                  type="text"
                  value={searchFont}
                  onChange={(e) => setSearchFont(e.target.value)}
                  placeholder="🔍 Search fonts..."
                  className="w-full p-1.5 border-2 border-green-200 rounded-md text-xs focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-white"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-green-800 mb-1">
                    Category:
                  </label>
                  <select
                    value={categoriaFuenteSeleccionada}
                    onChange={(e) => setCategoriaFuenteSeleccionada(e.target.value)}
                    className="w-full p-1.5 border-2 border-green-200 rounded-md text-xs focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-white"
                  >
                    {categoriasFuentes.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-xs font-medium text-green-800 mb-1">
                    Style ({fuentesFiltradas.length}):
                  </label>
                  <select
                    value={textStyles.fontFamily}
                    onChange={(e) => updateStyle('fontFamily', e.target.value)}
                    className="w-full p-1.5 border-2 border-green-200 rounded-md text-xs focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-white"
                    style={{ fontFamily: textStyles.fontFamily }}
                  >
                    {fuentesFiltradas.map((fuente) => (
                      <option key={fuente.value} value={fuente.value} style={{ fontFamily: fuente.value }}>
                        {fuente.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-lg p-2 border border-cyan-200">
              <label className="flex items-center justify-between text-xs font-semibold text-cyan-900 mb-1.5">
                <span>📏 Size</span>
              </label>
              <RangeSlider
                value={textStyles.fontSize}
                min={8}
                max={100}
                onChange={(val) => updateStyle('fontSize', val)}
                unit="px"
                gradientColor="#0891b2"
                showWarning={textStyles.fontSize < 12}
                warningMessage="⚠️ Text may be too small for reading"
              />
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-200">
              <label className="block text-xs font-semibold text-purple-900 mb-1.5 flex items-center justify-between">
                <span>✨ Style</span>
                <span className="text-xs text-purple-600 font-normal">Ctrl+B/I/U</span>
              </label>
              <StyleButtons
                textStyles={textStyles}
                toggleBold={toggleBold}
                toggleItalic={toggleItalic}
                toggleUnderline={toggleUnderline}
                toggleStrike={toggleStrike}
                toggleShadow={toggleShadow}
              />
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-2 border border-teal-200">
              <label className="block text-xs font-semibold text-teal-900 mb-1.5">
                📏 Alignment
              </label>
              <AlignmentButtons 
                value={textStyles.textAlign} 
                onChange={(value) => updateStyle('textAlign', value)} 
              />
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-2 border border-orange-200">
              <div className="text-xs font-semibold text-orange-900 mb-1.5 flex items-center justify-between">
                <span>🎨 Colors</span>
                {showContrastWarning && (
                  <span 
                    className="text-xs text-red-600 bg-red-100 px-1.5 py-0.5 rounded" 
                    title="Low contrast ratio"
                  >
                    ⚠️ Low contrast
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <ColorPicker
                    label="Text:"
                    value={textStyles.color}
                    onChange={(color) => updateStyle('color', color)}
                    presetCount={3}
                  />
                </div>

                <div className="flex-1">
                  <ColorPicker
                    label="Background:"
                    value={textStyles.backgroundColor}
                    onChange={(color) => updateStyle('backgroundColor', color)}
                    showTransparent={true}
                    presetCount={3}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg p-2 border border-indigo-200">
              <div className="text-xs font-semibold text-indigo-900 mb-1.5">
                🎛️ Advanced Controls
              </div>
              <div className="space-y-2">
                <RangeSlider
                  label="Line Spacing"
                  value={textStyles.lineHeight}
                  min={0.5}
                  max={3}
                  step={0.1}
                  onChange={(val) => updateStyle('lineHeight', val)}
                  formatValue={(val) => val.toFixed(1)}
                  gradientColor="#6366f1"
                />
                
                <RangeSlider
                  label="Opacity"
                  value={textStyles.opacity}
                  min={10}
                  max={100}
                  onChange={(val) => updateStyle('opacity', val)}
                  unit="%"
                  gradientColor="#8b5cf6"
                />
                
                <RangeSlider
                  label="Rotation"
                  value={textStyles.rotation}
                  min={-180}
                  max={180}
                  onChange={(val) => updateStyle('rotation', val)}
                  unit="°"
                  gradientColor="#a78bfa"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-lg p-2 border border-gray-300">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-800">
                  👁️ Live Preview
                </label>
                <button
                  onClick={resetearEstilos}
                  className="px-2 py-1 text-xs bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 text-gray-700 rounded-md border-2 border-gray-300 hover:border-orange-300 transition-all font-medium"
                  title="Reset all styles"
                >
                  🔄 Reset
                </button>
              </div>
              <div className="p-4 border-2 border-dashed border-gray-400 rounded-md bg-white min-h-[60px] flex items-center justify-center overflow-hidden">
                <div
                  style={{
                    ...getCSSStyles(),
                    fontSize: Math.min(textStyles.fontSize, 18),
                    padding: textStyles.backgroundColor !== "transparent" ? "4px 8px" : "0",
                    borderRadius: textStyles.backgroundColor !== "transparent" ? "6px" : "0",
                    display: "inline-block",
                    maxWidth: "100%",
                    wordBreak: "break-word",
                  }}
                >
                  {textStyles.text.substring(0, 50) || "Preview text..."}
                  {textStyles.text.length > 50 && "..."}
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500 flex justify-between">
                <span>📊 {textStyles.fontSize}px</span>
                <span>🎨 {textStyles.fontFamily.split(',')[0]}</span>
                <span>✅ {textStyles.text.length} chars</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 h-full overflow-y-auto">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Thematic Categories:
              </label>
              <div className="flex flex-wrap gap-1">
                {Object.keys(PLANTILLAS_TEXTO).map((categoria) => (
                  <button
                    key={categoria}
                    className={`flex-1 min-w-[calc(50%-0.25rem)] px-2 py-1 text-xs rounded transition-all ${
                      categoriaPlantillaSeleccionada === categoria
                        ? "bg-blue-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setCategoriaPlantillaSeleccionada(categoria)}
                    title={`View ${categoria} templates`}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-700 border-b pb-1 flex items-center">
                <span className="mr-1">{categoriaPlantillaSeleccionada}</span>
                <span className="text-gray-500">
                  ({PLANTILLAS_TEXTO[categoriaPlantillaSeleccionada].length})
                </span>
              </h4>
              
              {PLANTILLAS_TEXTO[categoriaPlantillaSeleccionada].map((plantilla, i) => (
                <div 
                  key={i} 
                  className="border rounded-lg p-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => handleAgregarPlantilla(plantilla)}
                  title={`Use ${plantilla.name} template - ${plantilla.config.fontSize}px`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{plantilla.icon}</span>
                      <span className="text-xs font-semibold text-gray-800">
                        {plantilla.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 px-2 py-1 rounded-full text-blue-700 font-medium">
                        {plantilla.config.fontSize}px
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    style={{
                      fontFamily: plantilla.config.fontFamily,
                      fontSize: Math.min(plantilla.config.fontSize * 0.6, 18),
                      color: plantilla.config.fill,
                      fontWeight: plantilla.config.fontWeight || "normal",
                      fontStyle: plantilla.config.fontStyle || "normal",
                      backgroundColor: plantilla.config.backgroundColor || "transparent",
                      padding: plantilla.config.backgroundColor ? "6px 10px" : "2px 0",
                      borderRadius: plantilla.config.backgroundColor ? "6px" : "0",
                      textShadow: plantilla.config.shadowColor ? `${plantilla.config.shadowOffsetX || 1}px ${plantilla.config.shadowOffsetY || 1}px ${plantilla.config.shadowBlur || 2}px ${plantilla.config.shadowColor}` : "none",
                      transform: plantilla.config.rotation ? `rotate(${plantilla.config.rotation}deg)` : "none",
                      display: "inline-block",
                      maxWidth: "100%",
                      lineHeight: "1.4"
                    }}
                    className="text-base leading-relaxed"
                  >
                    {plantilla.preview}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {plantilla.config.fontWeight === "bold" && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded">Bold</span>
                    )}
                    {plantilla.config.fontStyle === "italic" && (
                      <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">Italic</span>
                    )}
                    {plantilla.config.shadowColor && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-1 py-0.5 rounded">Sombra</span>
                    )}
                    {plantilla.config.backgroundColor && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-1 py-0.5 rounded">Fondo</span>
                    )}
                    {plantilla.config.rotation && (
                      <span className="text-xs bg-pink-100 text-pink-800 px-1 py-0.5 rounded">Rotado</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 px-3 py-2 bg-blue-50 border-t border-blue-100">
        <div className="flex items-center space-x-2">
          <span className="text-blue-500">💡</span>
          <span className="text-xs text-blue-700 font-medium">
            Tip: Double-click on text in the canvas to edit it directly
          </span>
        </div>
      </div>

      <div className="flex-shrink-0 p-2 border-t bg-white w-full">
        <Button 
          onClick={handleAgregarTextoPersonalizado}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-3 rounded text-xs font-medium"
          title="Add text with all configured styles to the page"
        >
          ➕ Add Text
        </Button>
      </div>
    </div>
  );
}