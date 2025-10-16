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
 // Estados para el editor de texto
  const [textoPersonalizado, setTextoPersonalizado] = useState("Type your text here");
  const [fuenteSeleccionada, setFuenteSeleccionada] = useState("Arial, sans-serif");
  const [tamanoFuente, setTamanoFuente] = useState(24);
  const [colorTexto, setColorTexto] = useState("#000000");
  const [estiloTexto, setEstiloTexto] = useState("normal"); // normal, bold, italic
  const [modoEditor, setModoEditor] = useState("personalizado"); // personalizado, plantillas
  
  // Efecto para forzar la carga de Google Fonts
  useEffect(() => {
    // Crear elementos de prueba ocultos para forzar la carga de fuentes
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
  
  // Nuevos estados para mejoras
  const [decoracion, setDecoracion] = useState("none"); // none, underline, line-through
  const [espaciadoLinea, setEspaciadoLinea] = useState(1.2);
  const [sombra, setSombra] = useState(false);
  const [colorFondo, setColorFondo] = useState("transparent");
  const [rotacion, setRotacion] = useState(0);
  const [opacidad, setOpacidad] = useState(100);
  
  // Nuevo estado para filtro de fuentes
  const [categoriaFuenteSeleccionada, setCategoriaFuenteSeleccionada] = useState("All");
  
  // Estado para categoría de plantillas
  const [categoriaPlantillaSeleccionada, setCategoriaPlantillaSeleccionada] = useState("📚 Educational");

  // Obtener categorías únicas
  const categoriasFuentes = getCategoriasFuentes();
  
  // Filtrar fuentes por categoría
  const fuentesFiltradas = getFuentesFiltradas(categoriaFuenteSeleccionada);

  // Función para obtener estilos para Konva Canvas
  const obtenerEstiloKonva = () => {
    const fontWeight = estiloTexto.includes("bold") ? "bold" : "normal";
    const fontStyle = estiloTexto.includes("italic") ? "italic" : "normal";
    const isBold = estiloTexto.includes("bold");
    
    // Stroke para hacer la negrita más visible
    let strokeColor = undefined;
    let strokeWidth = 0;
    const isMonospace = fuenteSeleccionada.includes("monospace");
    
    if (isBold) {
      // Para TODAS las fuentes en negrita, agregar un stroke más visible
      strokeColor = colorTexto;
      strokeWidth = isMonospace ? 1.0 : 0.6; // Aumentar para mejor visibilidad
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
      // Agregar color de fondo para el canvas
      backgroundColor: colorFondo !== "transparent" ? colorFondo : undefined,
    };
  };

  // Función para obtener estilos CSS (para preview)
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
      ...prev,
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
      ...prev,
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
      {/* Header Compacto */}
      <div className="flex-shrink-0 text-center p-2 border-b bg-white">
        <h3 className="text-sm font-semibold text-gray-800">
          📝 Text Editor
        </h3>
      </div>

      {/* Selector de Modo - Posición Equitativa */}
      <div className="flex-shrink-0 bg-gray-100 rounded-lg p-1 mx-2 mb-2 grid grid-cols-2 gap-1">
        <button
          className={`py-1 px-2 rounded text-xs font-medium transition-all text-center ${
            modoEditor === "personalizado" 
              ? "bg-white text-blue-600 shadow-sm" 
              : "text-gray-600"
          }`}
          onClick={() => setModoEditor("personalizado")}
          title="Advanced editor with all customization options"
        >
          ✏️ Editor
        </button>
        <button
          className={`py-1 px-2 rounded text-xs font-medium transition-all text-center ${
            modoEditor === "plantillas" 
              ? "bg-white text-blue-600 shadow-sm" 
              : "text-gray-600"
          }`}
          onClick={() => setModoEditor("plantillas")}
          title="Predefined templates for quick use"
        >
          📋 Templates
        </button>
      </div>

      {/* Contenido Principal - Scrollable que ocupa todo el espacio */}
      <div className="flex-1 overflow-y-auto px-2 pb-2 h-0">
        {modoEditor === "personalizado" ? (
          <div className="space-y-2 h-full">
            {/* Campo de Texto Compacto */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Text ({textoPersonalizado.length}):
              </label>
              <textarea
                value={textoPersonalizado}
                onChange={(e) => setTextoPersonalizado(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-xs resize-none"
                rows="2"
                placeholder="Type here..."
              />
            </div>

            {/* Fuente y Tamaño - Grid Compacto */}
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Font Category:
                </label>
                <select
                  value={categoriaFuenteSeleccionada}
                  onChange={(e) => setCategoriaFuenteSeleccionada(e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded text-xs mb-1"
                >
                  {categoriasFuentes.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria} {categoria !== "All" && `(${FUENTES_DISPONIBLES.filter(f => f.categoria === categoria).length})`}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Font ({fuentesFiltradas.length}):
                  </label>
                  <select
                    value={fuenteSeleccionada}
                    onChange={(e) => setFuenteSeleccionada(e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded text-xs"
                  >
                    {fuentesFiltradas.map((fuente) => (
                      <option key={fuente.value} value={fuente.value} style={{fontFamily: fuente.value}}>
                        {fuente.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Size: {tamanoFuente}px
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="100"
                    value={tamanoFuente}
                    onChange={(e) => setTamanoFuente(parseInt(e.target.value))}
                    className="w-full h-2"
                  />
                </div>
              </div>
            </div>

            {/* Estilo y Alineación - Compacto */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Style:
                </label>
                <div className="flex gap-1">
                  <button
                    className={`flex-1 px-1 py-1 text-xs border rounded ${
                      estiloTexto.includes("bold") 
                        ? "bg-blue-500 text-white" 
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => setEstiloTexto(estiloTexto.includes("bold") ? estiloTexto.replace("bold", "").trim() || "normal" : `${estiloTexto} bold`.trim())}
                    title="Toggle bold text"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    className={`flex-1 px-1 py-1 text-xs border rounded ${
                      estiloTexto.includes("italic") 
                        ? "bg-blue-500 text-white" 
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => setEstiloTexto(estiloTexto.includes("italic") ? estiloTexto.replace("italic", "").trim() || "normal" : `${estiloTexto} italic`.trim())}
                    title="Toggle italic text"
                  >
                    <em>I</em>
                  </button>
                </div>
              </div>
            </div>

            {/* Colores - Más Compacto */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Text Color:
                </label>
                <div className="flex gap-1 mb-1">
                  {COLORES_PREDEFINIDOS.slice(0, 4).map((color) => (
                    <button
                      key={color}
                      className={`w-4 h-4 rounded border ${
                        colorTexto === color ? "border-gray-800 border-2" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setColorTexto(color)}
                      title={`Apply ${color} color to text`}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={colorTexto}
                  onChange={(e) => setColorTexto(e.target.value)}
                  className="w-full h-6 border rounded"
                  title="Custom color picker for text"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Background:
                </label>
                <div className="flex gap-1 mb-1">
                  <button
                    className={`w-4 h-4 rounded border ${
                      colorFondo === "transparent" ? "border-gray-800 border-2" : "border-gray-300"
                    }`}
                    style={{ background: "linear-gradient(45deg, #ccc 25%, transparent 25%)" }}
                    onClick={() => setColorFondo("transparent")}
                    title="No background color (transparent)"
                  />
                  {COLORES_PREDEFINIDOS.slice(0, 3).map((color) => (
                    <button
                      key={color}
                      className={`w-4 h-4 rounded border ${
                        colorFondo === color ? "border-gray-800 border-2" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setColorFondo(color)}
                      title={`Apply ${color} as text background`}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={colorFondo === "transparent" ? "#ffffff" : colorFondo}
                  onChange={(e) => setColorFondo(e.target.value)}
                  className="w-full h-6 border rounded"
                  title="Custom color picker for text background"
                />
              </div>
            </div>

            {/* Controles Avanzados - Más Compactos */}
            <div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Line Spacing: {espaciadoLinea}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={espaciadoLinea}
                    onChange={(e) => setEspaciadoLinea(parseFloat(e.target.value))}
                    className="w-full h-2"
                    title="Adjust line spacing of text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Opacity: {opacidad}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacidad}
                    onChange={(e) => setOpacidad(parseInt(e.target.value))}
                    className="w-full h-2"
                    title="Adjust text transparency (100% = opaque, 10% = very transparent)"
                  />
                </div>
              </div>

              {/* Efectos */}
              <div className="flex items-center gap-3 mb-2">
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={sombra}
                    onChange={(e) => setSombra(e.target.checked)}
                    className="mr-1"
                    title="Add shadow to text for depth"
                  />
                  🌫️ Shadow
                </label>
              </div>

              {/* Rotación */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Rotation: {rotacion}°
                </label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotacion}
                  onChange={(e) => setRotacion(parseInt(e.target.value))}
                  className="w-full h-2"
                  title="Rotate text in degrees (-180° to 180°). Useful for creative titles"
                />
              </div>
            </div>

            {/* Vista Previa Compacta */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-gray-700">
                  Preview:
                </label>
                <button
                  onClick={resetearEstilos}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded border transition-colors"
                  title="Reset all styles to default values"
                >
                  🔄
                </button>
              </div>
              <div className="p-2 border border-gray-300 rounded bg-gray-50 min-h-[40px] flex items-center justify-center overflow-hidden">
                <span
                  style={{
                    ...obtenerEstiloCSS(),
                    fontSize: Math.min(tamanoFuente, 14), // Limitar tamaño en preview
                    padding: colorFondo !== "transparent" ? "2px 4px" : "0",
                    borderRadius: colorFondo !== "transparent" ? "2px" : "0",
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                >
                  {textoPersonalizado.length > 20 ? textoPersonalizado.substring(0, 20) + "..." : textoPersonalizado || "Preview"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 h-full overflow-y-auto">
            {/* Selector de Categoría de Plantillas */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Thematic Categories:
              </label>
              <div className="grid grid-cols-2 gap-1">
                {Object.keys(PLANTILLAS_TEXTO).map((categoria) => (
                  <button
                    key={categoria}
                    className={`px-2 py-1 text-xs rounded transition-all ${
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
            
            {/* Plantillas de la Categoría Seleccionada */}
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
                  
                  {/* Vista Previa Mejorada */}
                  <div 
                    style={{
                      fontFamily: plantilla.config.fontFamily,
                      fontSize: Math.min(plantilla.config.fontSize * 0.6, 18), // Aumentado de 0.4 a 0.6 y máximo de 18px
                      color: plantilla.config.fill,
                      fontWeight: plantilla.config.fontWeight || "normal",
                      fontStyle: plantilla.config.fontStyle || "normal",
                      backgroundColor: plantilla.config.backgroundColor || "transparent",
                      padding: plantilla.config.backgroundColor ? "6px 10px" : "2px 0", // Más padding
                      borderRadius: plantilla.config.backgroundColor ? "6px" : "0",
                      textShadow: plantilla.config.shadowColor ? `${plantilla.config.shadowOffsetX || 1}px ${plantilla.config.shadowOffsetY || 1}px ${plantilla.config.shadowBlur || 2}px ${plantilla.config.shadowColor}` : "none",
                      transform: plantilla.config.rotation ? `rotate(${plantilla.config.rotation}deg)` : "none",
                      display: "inline-block",
                      maxWidth: "100%",
                      lineHeight: "1.4" // Mejor espaciado entre líneas
                    }}
                    className="text-base leading-relaxed" // Cambiado de text-sm a text-base
                  >
                    {plantilla.preview}
                  </div>
                  
                  {/* Indicadores de Efectos */}
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

      {/* Tip Section - Appears in empty space */}
      <div className="flex-shrink-0 px-3 py-2 bg-blue-50 border-t border-blue-100">
        <div className="flex items-center space-x-2">
          <span className="text-blue-500">💡</span>
          <span className="text-xs text-blue-700 font-medium">
            Tip: Double-click on text in the canvas to edit it directly
          </span>
        </div>
      </div>

      {/* Botón Agregar - Fijo en la parte inferior ocupando todo el ancho */}
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