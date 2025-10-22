// Constantes compartidas para el editor de texto y modal
export const FUENTES_DISPONIBLES = [
  // System Fonts (Always available)
  { name: "Arial", value: "Arial, sans-serif", categoria: "System" },
  { name: "Times New Roman", value: "Times New Roman, serif", categoria: "System" },
  { name: "Courier New", value: "Courier New, monospace", categoria: "System" },
  { name: "Georgia", value: "Georgia, serif", categoria: "System" },
  { name: "Verdana", value: "Verdana, sans-serif", categoria: "System" },
  { name: "Comic Sans MS", value: "Comic Sans MS, cursive", categoria: "System" },
  { name: "Trebuchet MS", value: "Trebuchet MS, sans-serif", categoria: "System" },
  { name: "Tahoma", value: "Tahoma, sans-serif", categoria: "System" },
  
  // Modern Google Fonts (Reliable)
  { name: "Roboto", value: "Roboto, sans-serif", categoria: "Modern" },
  { name: "Open Sans", value: "Open Sans, sans-serif", categoria: "Modern" },
  { name: "Lato", value: "Lato, sans-serif", categoria: "Modern" },
  { name: "Montserrat", value: "Montserrat, sans-serif", categoria: "Modern" },
  { name: "Source Sans Pro", value: "Source Sans Pro, sans-serif", categoria: "Modern" },
  { name: "Poppins", value: "Poppins, sans-serif", categoria: "Modern" },
  { name: "Inter", value: "Inter, sans-serif", categoria: "Modern" },
  { name: "Ubuntu", value: "Ubuntu, sans-serif", categoria: "Modern" },
  { name: "Nunito", value: "Nunito, sans-serif", categoria: "Modern" },
  
  // Fun Fonts (Functional)
  { name: "Patrick Hand", value: "Patrick Hand, cursive", categoria: "Fun" },
  { name: "Kalam", value: "Kalam, cursive", categoria: "Fun" },
  { name: "Fredoka One", value: "Fredoka One, cursive", categoria: "Fun" },
  { name: "Chewy", value: "Chewy, cursive", categoria: "Fun" },
  { name: "Caveat", value: "Caveat, cursive", categoria: "Fun" },
  { name: "Architect's Daughter", value: "Architects Daughter, cursive", categoria: "Fun" },
  
  // Decorative Fonts (Tested)
  { name: "Lobster", value: "Lobster, cursive", categoria: "Decorative" },
  { name: "Pacifico", value: "Pacifico, cursive", categoria: "Decorative" },
  { name: "Dancing Script", value: "Dancing Script, cursive", categoria: "Decorative" },
  { name: "Amatic SC", value: "Amatic SC, cursive", categoria: "Decorative" },
  { name: "Bangers", value: "Bangers, cursive", categoria: "Decorative" },
  { name: "Permanent Marker", value: "Permanent Marker, cursive", categoria: "Decorative" },
  
  // Elegant Fonts (Reliable Serif)
  { name: "Playfair Display", value: "Playfair Display, serif", categoria: "Elegant" },
  { name: "Merriweather", value: "Merriweather, serif", categoria: "Elegant" },
  { name: "Libre Baskerville", value: "Libre Baskerville, serif", categoria: "Elegant" },
  { name: "Lora", value: "Lora, serif", categoria: "Elegant" },
  { name: "Crimson Text", value: "Crimson Text, serif", categoria: "Elegant" },
  
  // Technical Fonts (Monospaced that work)
  { name: "Consolas", value: "Consolas, monospace", categoria: "Technical" },
  { name: "Source Code Pro", value: "Source Code Pro, monospace", categoria: "Technical" },
  { name: "Fira Code", value: "Fira Code, monospace", categoria: "Technical" },
  
  // Educational Fonts (Selected)
  { name: "Quicksand", value: "Quicksand, sans-serif", categoria: "Educational" },
  { name: "Varela Round", value: "Varela Round, sans-serif", categoria: "Educational" },
  { name: "Raleway", value: "Raleway, sans-serif", categoria: "Educational" },
];

export const COLORES_PREDEFINIDOS = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", 
  "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#008000", "#FFC0CB",
  "#800000", "#008000", "#000080", "#808000", "#800080", "#008080", 
  "#C0C0C0", "#808080", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
  "#FFEAA7", "#DDA0DD"
];

export const PLANTILLAS_TEXTO = {
  "📚 Educational": [
    { 
      name: "Lesson Title", 
      icon: "🎓",
      preview: "Chapter 1: Introduction",
      config: { fontSize: 36, fontFamily: "Roboto, sans-serif", fill: "#2E86C1", fontWeight: "bold", shadowColor: "rgba(46,134,193,0.3)", shadowBlur: 3, shadowOffsetX: 1, shadowOffsetY: 1 }
    },
    { 
      name: "Educational Subtitle", 
      icon: "📖",
      preview: "Learning objectives",
      config: { fontSize: 24, fontFamily: "Open Sans, sans-serif", fill: "#5D6D7E", fontWeight: "normal" }
    },
    { 
      name: "Activity Text", 
      icon: "✏️",
      preview: "Complete the exercises",
      config: { fontSize: 24, fontFamily: "Ubuntu, sans-serif", fill: "#239B56", fontWeight: "normal" }
    },
    { 
      name: "Important Note", 
      icon: "⚠️",
      preview: "Remember this!",
      config: { fontSize: 24, fontFamily: "Nunito, sans-serif", fill: "#E67E22", fontWeight: "bold", backgroundColor: "#FEF9E7" }
    },
    { 
      name: "Question Text", 
      icon: "❓",
      preview: "What do you think?",
      config: { fontSize: 26, fontFamily: "Poppins, sans-serif", fill: "#1ABC9C", fontWeight: "normal", fontStyle: "italic" }
    },
    { 
      name: "Definition Box", 
      icon: "📝",
      preview: "Key Term: Definition",
      config: { fontSize: 22, fontFamily: "Lato, sans-serif", fill: "#34495E", fontWeight: "bold", backgroundColor: "#E8F8F5" }
    },
    { 
      name: "Fun Fact", 
      icon: "💡",
      preview: "Did you know?",
      config: { fontSize: 24, fontFamily: "Quicksand, sans-serif", fill: "#F39C12", fontWeight: "bold", shadowColor: "rgba(243,156,18,0.2)", shadowBlur: 2 }
    }
  ],
  "🎨 Creative": [
    { 
      name: "Artistic Title", 
      icon: "🎭",
      preview: "Art and Creativity",
      config: { fontSize: 42, fontFamily: "Dancing Script, cursive", fill: "#8E44AD", fontWeight: "bold", shadowColor: "rgba(142,68,173,0.4)", shadowBlur: 5, shadowOffsetX: 2, shadowOffsetY: 2 }
    },
    { 
      name: "Fun Text", 
      icon: "🌈",
      preview: "Let's create!",
      config: { fontSize: 28, fontFamily: "Fredoka One, cursive", fill: "#E91E63", fontWeight: "normal", rotation: -3 }
    },
    { 
      name: "Artistic Signature", 
      icon: "✍️",
      preview: "By: The Artist",
      config: { fontSize: 28, fontFamily: "Caveat, cursive", fill: "#795548", fontWeight: "normal", fontStyle: "italic" }
    },
    { 
      name: "Bold Statement", 
      icon: "💥",
      preview: "AWESOME!",
      config: { fontSize: 48, fontFamily: "Bangers, cursive", fill: "#FF6B6B", fontWeight: "normal", rotation: -5, shadowColor: "rgba(255,107,107,0.5)", shadowBlur: 4 }
    },
    { 
      name: "Handwritten Note", 
      icon: "✏️",
      preview: "Personal touch",
      config: { fontSize: 26, fontFamily: "Patrick Hand, cursive", fill: "#5D4E37", fontWeight: "normal" }
    },
    { 
      name: "Retro Style", 
      icon: "🕹️",
      preview: "Retro Vibes",
      config: { fontSize: 36, fontFamily: "Permanent Marker, cursive", fill: "#E74C3C", fontWeight: "normal", backgroundColor: "#FEF5E7" }
    },
    { 
      name: "Elegant Script", 
      icon: "💐",
      preview: "Elegant & Beautiful",
      config: { fontSize: 34, fontFamily: "Pacifico, cursive", fill: "#9B59B6", fontWeight: "normal", shadowColor: "rgba(155,89,182,0.3)", shadowBlur: 3 }
    }
  ],
  "👶 Children": [
    { 
      name: "Story Title", 
      icon: "📚",
      preview: "Once upon a time...",
      config: { fontSize: 32, fontFamily: "Patrick Hand, cursive", fill: "#FF6B6B", fontWeight: "bold", backgroundColor: "#FFF3E0" }
    },
    { 
      name: "Character Dialogue", 
      icon: "💬",
      preview: "Hello little friends!",
      config: { fontSize: 30, fontFamily: "Chewy, cursive", fill: "#4ECDC4", fontWeight: "normal" }
    },
    { 
      name: "Moral", 
      icon: "⭐",
      preview: "And they lived happily...",
      config: { fontSize: 40, fontFamily: "Kalam, cursive", fill: "#9B59B6", fontWeight: "normal", fontStyle: "italic" }
    },
    { 
      name: "Adventure Text", 
      icon: "🚀",
      preview: "Let's go on an adventure!",
      config: { fontSize: 28, fontFamily: "Fredoka One, cursive", fill: "#FF9800", fontWeight: "normal", rotation: -2 }
    },
    { 
      name: "Happy Ending", 
      icon: "🌟",
      preview: "The End!",
      config: { fontSize: 38, fontFamily: "Chewy, cursive", fill: "#FFC107", fontWeight: "normal", shadowColor: "rgba(255,193,7,0.5)", shadowBlur: 5 }
    },
    { 
      name: "Narration", 
      icon: "📖",
      preview: "The story begins...",
      config: { fontSize: 24, fontFamily: "Architects Daughter, cursive", fill: "#5D4037", fontWeight: "normal" }
    },
    { 
      name: "Song Lyrics", 
      icon: "🎵",
      preview: "Sing along with me!",
      config: { fontSize: 26, fontFamily: "Kalam, cursive", fill: "#E91E63", fontWeight: "normal", fontStyle: "italic" }
    }
  ],
  "📋 Formal": [
    { 
      name: "Document Title", 
      icon: "📄",
      preview: "Executive Report",
      config: { fontSize: 28, fontFamily: "Times New Roman, serif", fill: "#2C3E50", fontWeight: "bold" }
    },
    { 
      name: "Formal Subtitle", 
      icon: "📊",
      preview: "Analysis and Results",
      config: { fontSize: 28, fontFamily: "Georgia, serif", fill: "#34495E", fontWeight: "normal" }
    },
    { 
      name: "Corporate Text", 
      icon: "🏢",
      preview: "Professional Company Inc.",
      config: { fontSize: 26, fontFamily: "Arial, sans-serif", fill: "#5D6D7E", fontWeight: "normal" }
    },
    { 
      name: "Legal Text", 
      icon: "⚖️",
      preview: "Terms and Conditions",
      config: { fontSize: 22, fontFamily: "Times New Roman, serif", fill: "#2C3E50", fontWeight: "normal" }
    },
    { 
      name: "Official Stamp", 
      icon: "✅",
      preview: "APPROVED",
      config: { fontSize: 32, fontFamily: "Arial, sans-serif", fill: "#27AE60", fontWeight: "bold", backgroundColor: "#E8F8F5" }
    },
    { 
      name: "Business Header", 
      icon: "📑",
      preview: "Annual Report 2025",
      config: { fontSize: 30, fontFamily: "Georgia, serif", fill: "#1B4F72", fontWeight: "bold" }
    }
  ],
  "🎉 Celebration": [
    { 
      name: "Party Title", 
      icon: "🎊",
      preview: "CELEBRATION TIME!",
      config: { fontSize: 44, fontFamily: "Bangers, cursive", fill: "#E74C3C", fontWeight: "normal", rotation: -3, shadowColor: "rgba(231,76,60,0.4)", shadowBlur: 5 }
    },
    { 
      name: "Birthday Wish", 
      icon: "🎂",
      preview: "Happy Birthday!",
      config: { fontSize: 38, fontFamily: "Pacifico, cursive", fill: "#FF69B4", fontWeight: "normal", shadowColor: "rgba(255,105,180,0.5)", shadowBlur: 4 }
    },
    { 
      name: "Congratulations", 
      icon: "🏆",
      preview: "Congratulations!",
      config: { fontSize: 36, fontFamily: "Lobster, cursive", fill: "#FFD700", fontWeight: "normal", shadowColor: "rgba(255,215,0,0.6)", shadowBlur: 6 }
    },
    { 
      name: "Achievement", 
      icon: "🌟",
      preview: "You Did It!",
      config: { fontSize: 34, fontFamily: "Fredoka One, cursive", fill: "#9C27B0", fontWeight: "normal" }
    },
    { 
      name: "Event Banner", 
      icon: "🎪",
      preview: "Grand Opening",
      config: { fontSize: 40, fontFamily: "Permanent Marker, cursive", fill: "#FF5722", fontWeight: "normal", backgroundColor: "#FFF9C4" }
    }
  ],
  "💼 Professional": [
    { 
      name: "Presentation Title", 
      icon: "📊",
      preview: "Market Analysis",
      config: { fontSize: 34, fontFamily: "Montserrat, sans-serif", fill: "#1565C0", fontWeight: "bold" }
    },
    { 
      name: "Key Point", 
      icon: "🔑",
      preview: "Important Insight",
      config: { fontSize: 26, fontFamily: "Lato, sans-serif", fill: "#2E7D32", fontWeight: "bold", backgroundColor: "#E8F5E9" }
    },
    { 
      name: "Quote", 
      icon: "💬",
      preview: "\"Excellence is not an act...\"",
      config: { fontSize: 24, fontFamily: "Merriweather, serif", fill: "#424242", fontWeight: "normal", fontStyle: "italic" }
    },
    { 
      name: "Data Label", 
      icon: "📈",
      preview: "Q4 Results: +25%",
      config: { fontSize: 28, fontFamily: "Roboto, sans-serif", fill: "#00796B", fontWeight: "bold" }
    },
    { 
      name: "Professional Subtitle", 
      icon: "📋",
      preview: "Strategic Overview",
      config: { fontSize: 26, fontFamily: "Source Sans Pro, sans-serif", fill: "#455A64", fontWeight: "normal" }
    }
  ],
  "🌈 Motivational": [
    { 
      name: "Inspiration", 
      icon: "✨",
      preview: "Dream Big!",
      config: { fontSize: 40, fontFamily: "Lobster, cursive", fill: "#FF6B6B", fontWeight: "normal", shadowColor: "rgba(255,107,107,0.4)", shadowBlur: 4 }
    },
    { 
      name: "Positive Quote", 
      icon: "💪",
      preview: "You Can Do This!",
      config: { fontSize: 32, fontFamily: "Poppins, sans-serif", fill: "#4ECDC4", fontWeight: "bold" }
    },
    { 
      name: "Daily Affirmation", 
      icon: "🌟",
      preview: "I am capable",
      config: { fontSize: 28, fontFamily: "Quicksand, sans-serif", fill: "#9B59B6", fontWeight: "normal", fontStyle: "italic" }
    },
    { 
      name: "Success Message", 
      icon: "🎯",
      preview: "Goal Achieved!",
      config: { fontSize: 36, fontFamily: "Montserrat, sans-serif", fill: "#27AE60", fontWeight: "bold", shadowColor: "rgba(39,174,96,0.3)", shadowBlur: 3 }
    },
    { 
      name: "Encouragement", 
      icon: "❤️",
      preview: "Keep Going!",
      config: { fontSize: 30, fontFamily: "Nunito, sans-serif", fill: "#E67E22", fontWeight: "bold" }
    }
  ]
};

// Utility to get font categories
export const getCategoriasFuentes = () => {
  return ["All", ...new Set(FUENTES_DISPONIBLES.map(f => f.categoria))];
};

// Utility to filter fonts by category
export const getFuentesFiltradas = (categoriaSeleccionada) => {
  return categoriaSeleccionada === "All" 
    ? FUENTES_DISPONIBLES 
    : FUENTES_DISPONIBLES.filter(f => f.categoria === categoriaSeleccionada);
};

// Utility to get template categories
export const getCategoriasPlantillas = () => {
  return Object.keys(PLANTILLAS_TEXTO);
};