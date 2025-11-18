import { Button } from "../Button";
import { useState, useEffect } from "react";
import "./fonts.css";
import { 
  FUENTES_DISPONIBLES, 
  COLORES_PREDEFINIDOS, 
  PLANTILLAS_TEXTO,
  getCategoriasFuentes,
  getFuentesFiltradas 
} from "../shared/textConstants";

export default function TextPanel({ setElements, widgetValidation }) {
  const [textoPersonalizado, setTextoPersonalizado] = useState("Type your text here");
  const [fuenteSeleccionada, setFuenteSeleccionada] = useState("Arial, sans-serif");
  const [tamanoFuente, setTamanoFuente] = useState(24);
  const [colorTexto, setColorTexto] = useState("#000000");
  const [estiloTexto, setEstiloTexto] = useState("normal"); 
  const [modoEditor, setModoEditor] = useState("personalizado");
  
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
  
  const [decoracion, setDecoracion] = useState("none"); 
  const [espaciadoLinea, setEspaciadoLinea] = useState(1.2);
  const [sombra, setSombra] = useState(false);
  const [colorFondo, setColorFondo] = useState("transparent");
  const [rotacion, setRotacion] = useState(0);
  const [opacidad, setOpacidad] = useState(100);
  const [categoriaFuenteSeleccionada, setCategoriaFuenteSeleccionada] = useState("All");
  const [categoriaPlantillaSeleccionada, setCategoriaPlantillaSeleccionada] = useState("📚 Educational");

  const categoriasFuentes = getCategoriasFuentes();
  const fuentesFiltradas = getFuentesFiltradas(categoriaFuenteSeleccionada);

  // Función para obtener estilos para Konva Canvas
  const obtenerEstiloKonva = () => {
    const fontWeight = estiloTexto.includes("bold") ? "bold" : "normal";
    const fontStyle = estiloTexto.includes("italic") ? "italic" : "normal";
    const isBold = estiloTexto.includes("bold");
    
    let strokeColor = undefined;
    let strokeWidth = 0;
    const isMonospace = fuenteSeleccionada.includes("monospace");
    
    if (isBold) {
      strokeColor = colorTexto;
      strokeWidth = isMonospace ? 1.0 : 0.6; 
    }
    
    return {
      fontSize: tamanoFuente,
      fill: colorTexto,
      fontFamily: fuenteSeleccionada,
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
  };
  const obtenerEstiloCSS = () => ({
    fontSize: `${tamanoFuente}px`,
    color: colorTexto,
    fontFamily: fuenteSeleccionada,
    fontStyle: estiloTexto.includes("italic") ? "italic" : "normal",
    fontWeight: estiloTexto.includes("bold") ? "bold" : "normal",
    textDecoration: decoracion,
    lineHeight: espaciadoLinea,
    textShadow: sombra ? "2px 2px 4px rgba(0,0,0,0.5)" : "none",
    backgroundColor: colorFondo,
    transform: `rotate(${rotacion}deg)`,
    opacity: opacidad / 100,
  });

  const handleAgregarTextoPersonalizado = () => {
    if (!textoPersonalizado.trim()) return;
    
    const estiloKonva = obtenerEstiloKonva();
    
    widgetValidation(2, 2);
    setElements((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      {
        id: Date.now().toString(),
        type: "text",
        text: textoPersonalizado,
        x: 100,
        y: 100,
        ...estiloKonva,
      },
    ]);
  };

  const handleAgregarPlantilla = (plantilla) => {
    widgetValidation(2, 2);
    setElements((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      {
        id: Date.now().toString(),
        type: "text",
        text: plantilla.name,
        x: 100,
        y: 100,
        ...plantilla.config,
      },
    ]);
  };



  const resetearEstilos = () => {
    setTextoPersonalizado("Type your text here");
    setFuenteSeleccionada("Arial, sans-serif");
    setTamanoFuente(24);
    setColorTexto("#000000");
    setEstiloTexto("normal");
    setDecoracion("none");
    setEspaciadoLinea(1.2);
    setSombra(false);
    setColorFondo("transparent");
    setRotacion(0);
    setOpacidad(100);
    setCategoriaPlantillaSeleccionada("📚 Educational");
  };

  return (<div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex-shrink-0 border-b bg-gradient-to-b from-gray-50 to-white shadow-sm">
        <div className="text-center pt-2.5 pb-1.5">
          <h3 className="text-sm font-bold text-gray-800">
            📝 Text Editor
          </h3>
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
                <span className="text-blue-600 bg-white px-1.5 py-0.5 rounded text-xs">{textoPersonalizado.length}</span>
              </label>
              <textarea
                value={textoPersonalizado}
                onChange={(e) => setTextoPersonalizado(e.target.value)}
                className="w-full p-2 border-2 border-blue-200 rounded-md text-xs resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
                rows="2"
                placeholder="Type your creative text here..."
              />
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-2 border border-green-200">
              <div className="text-xs font-semibold text-green-900 mb-1.5">🔤 Font</div>
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
                    value={fuenteSeleccionada}
                    onChange={(e) => setFuenteSeleccionada(e.target.value)}
                    className="w-full p-1.5 border-2 border-green-200 rounded-md text-xs focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-white"
                    style={{ fontFamily: fuenteSeleccionada }}
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
                <span className="text-cyan-600 bg-white px-2 py-0.5 rounded text-xs">{tamanoFuente}px</span>
              </label>
              <input
                type="range"
                min="8"
                max="100"
                value={tamanoFuente}
                onChange={(e) => setTamanoFuente(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #0891b2 0%, #0891b2 ${((tamanoFuente - 8) / (100 - 8)) * 100}%, #e0e7ff ${((tamanoFuente - 8) / (100 - 8)) * 100}%, #e0e7ff 100%)`
                }}
              />
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-200">
              <label className="block text-xs font-semibold text-purple-900 mb-1.5">
                ✨ Style
              </label>
              <div className="flex gap-1.5">
                <button
                  className={`flex-1 py-1.5 text-sm border-2 rounded-md font-bold transition-all ${
                    estiloTexto.includes("bold") 
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600 shadow-md" 
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  onClick={() => setEstiloTexto(estiloTexto.includes("bold") ? estiloTexto.replace("bold", "").trim() || "normal" : `${estiloTexto} bold`.trim())}
                >
                  B
                </button>
                <button
                  className={`flex-1 py-1.5 text-sm border-2 rounded-md italic transition-all ${
                    estiloTexto.includes("italic") 
                      ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white border-purple-600 shadow-md" 
                      : "bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                  onClick={() => setEstiloTexto(estiloTexto.includes("italic") ? estiloTexto.replace("italic", "").trim() || "normal" : `${estiloTexto} italic`.trim())}
                >
                  I
                </button>
                <button
                  className={`flex-1 py-1.5 text-sm border-2 rounded-md transition-all ${
                    sombra 
                      ? "bg-gradient-to-br from-gray-600 to-gray-700 text-white border-gray-700 shadow-md" 
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                  onClick={() => setSombra(!sombra)}
                >
                  🌫️
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-2 border border-orange-200">
              <div className="text-xs font-semibold text-orange-900 mb-1.5">🎨 Colors</div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-orange-800 mb-1">
                    Text:
                  </label>
                  <div className="flex gap-1 mb-1">
                    {COLORES_PREDEFINIDOS.slice(0, 3).map((color) => (
                      <button
                        key={color}
                        className={`w-5 h-5 rounded-md border-2 transition-all ${
                          colorTexto === color ? "border-gray-800 scale-110 shadow-md" : "border-gray-300 hover:border-gray-400"
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
                    className="w-full h-7 border-2 border-gray-300 rounded-md cursor-pointer"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-medium text-orange-800 mb-1">
                    Background:
                  </label>
                  <div className="flex gap-1 mb-1">
                    <button
                      className={`w-5 h-5 rounded-md border-2 transition-all ${
                        colorFondo === "transparent" ? "border-gray-800 scale-110 shadow-md" : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ 
                        background: "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, white 25%, white 75%, #ccc 75%)",
                        backgroundSize: "6px 6px",
                        backgroundPosition: "0 0, 3px 3px"
                      }}
                      onClick={() => setColorFondo("transparent")}
                    />
                    {COLORES_PREDEFINIDOS.slice(0, 2).map((color) => (
                      <button
                        key={color}
                        className={`w-5 h-5 rounded-md border-2 transition-all ${
                          colorFondo === color ? "border-gray-800 scale-110 shadow-md" : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setColorFondo(color)}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={colorFondo === "transparent" ? "#ffffff" : colorFondo}
                    onChange={(e) => setColorFondo(e.target.value)}
                    className="w-full h-7 border-2 border-gray-300 rounded-md cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-lg p-2 border border-indigo-200">
              <div className="text-xs font-semibold text-indigo-900 mb-1.5">🎛️ Controls</div>
              <div className="space-y-2">
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-indigo-800 mb-1">
                    <span>Line Spacing</span>
                    <span className="text-indigo-600 bg-white px-1.5 py-0.5 rounded text-xs">{espaciadoLinea}</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={espaciadoLinea}
                    onChange={(e) => setEspaciadoLinea(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((espaciadoLinea - 0.5) / (3 - 0.5)) * 100}%, #e0e7ff ${((espaciadoLinea - 0.5) / (3 - 0.5)) * 100}%, #e0e7ff 100%)`
                    }}
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-indigo-800 mb-1">
                    <span>Opacity</span>
                    <span className="text-indigo-600 bg-white px-1.5 py-0.5 rounded text-xs">{opacidad}%</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacidad}
                    onChange={(e) => setOpacidad(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((opacidad - 10) / (100 - 10)) * 100}%, #e0e7ff ${((opacidad - 10) / (100 - 10)) * 100}%, #e0e7ff 100%)`
                    }}
                  />
                </div>
                
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-indigo-800 mb-1">
                    <span>Rotation</span>
                    <span className="text-indigo-600 bg-white px-1.5 py-0.5 rounded text-xs">{rotacion}°</span>
                  </label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotacion}
                    onChange={(e) => setRotacion(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #a78bfa 0%, #a78bfa ${((rotacion + 180) / 360) * 100}%, #e0e7ff ${((rotacion + 180) / 360) * 100}%, #e0e7ff 100%)`
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-lg p-2 border border-gray-300">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-800">
                  👁️ Preview
                </label>
                <button
                  onClick={resetearEstilos}
                  className="px-2 py-1 text-xs bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 text-gray-700 rounded-md border-2 border-gray-300 hover:border-orange-300 transition-all font-medium"
                  title="Reset all styles"
                >
                  🔄 Reset
                </button>
              </div>
              <div className="p-3 border-2 border-dashed border-gray-400 rounded-md bg-white min-h-[35px] flex items-center justify-center">
                <span
                  style={{
                    ...obtenerEstiloCSS(),
                    fontSize: Math.min(tamanoFuente, 16),
                    padding: colorFondo !== "transparent" ? "3px 6px" : "0",
                    borderRadius: colorFondo !== "transparent" ? "4px" : "0",
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                >
                  {textoPersonalizado.substring(0, 20) || "Preview"}
                </span>
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
                <span className="text-gray-500">({PLANTILLAS_TEXTO[categoriaPlantillaSeleccionada].length})</span>
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