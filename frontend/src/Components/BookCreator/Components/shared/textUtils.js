export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function getRelativeLuminance(r, g, b) {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const r2 = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g2 = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b2 = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
}

export function getContrastRatio(color1, color2) {

  if (color1 === 'transparent' || color2 === 'transparent') {
    return 21; 
  }

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 21; 

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function isContrastSufficient(textColor, backgroundColor, fontSize = 16) {
  const ratio = getContrastRatio(textColor, backgroundColor);
  const minRatio = fontSize >= 18 ? 3 : 4.5;
  return ratio >= minRatio;
}

export function getSuggestedTextColor(backgroundColor) {
  if (backgroundColor === 'transparent') return '#000000';
  
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return '#000000';
  
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export function saveUserPreferences(preferences) {
  try {
    localStorage.setItem('textEditorPreferences', JSON.stringify(preferences));
  } catch (e) {
    console.warn('No se pudieron guardar las preferencias:', e);
  }
}

export function loadUserPreferences() {
  try {
    const stored = localStorage.getItem('textEditorPreferences');
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.warn('No se pudieron cargar las preferencias:', e);
    return null;
  }
}

export function isTextTooLong(text, maxLength = 500) {
  return text.length > maxLength;
}

export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function dividirTextoAutomatico(texto, fontSize, fontFamily, maxWidth = null) {
  if (!maxWidth) {
    maxWidth = fontSize * 20;
  }
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontSize}px ${fontFamily}`;
  
  const parrafos = texto.split('\n');
  const todasLasLineas = [];
  
  parrafos.forEach(parrafo => {
    if (!parrafo.trim()) {
      todasLasLineas.push('');
      return;
    }
    
    const palabras = parrafo.split(' ');
    let lineaActual = '';
    
    for (let i = 0; i < palabras.length; i++) {
      const palabra = palabras[i];
      const lineaPrueba = lineaActual + (lineaActual ? ' ' : '') + palabra;
      const medida = ctx.measureText(lineaPrueba);
      
      if (medida.width > maxWidth && lineaActual) {
        todasLasLineas.push(lineaActual);
        lineaActual = palabra;
      } else {
        lineaActual = lineaPrueba;
      }
    }
    
    if (lineaActual) {
      todasLasLineas.push(lineaActual);
    }
  });
  
  return todasLasLineas.join('\n');
}
