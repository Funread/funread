export default function TextStyleButton({ 
  isActive, 
  onClick, 
  title, 
  children,
  activeColors = "from-blue-500 to-blue-600 border-blue-600",
  hoverColor = "border-blue-300 hover:bg-blue-50"
}) {
  return (
    <button
      className={`flex-1 py-2 text-xs border-2 rounded-md transition-all flex items-center justify-center ${
        isActive 
          ? `bg-gradient-to-br ${activeColors} text-white shadow-md` 
          : `bg-white text-gray-700 border-gray-300 hover:${hoverColor}`
      }`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
}
