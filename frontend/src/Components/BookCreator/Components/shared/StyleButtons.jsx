import TextStyleButton from './TextStyleButton';

export default function StyleButtons({ 
  textStyles, 
  toggleBold, 
  toggleItalic, 
  toggleUnderline,
  toggleStrike,
  toggleShadow 
}) {
  return (
    <div className="flex gap-1.5">
      <TextStyleButton
        isActive={textStyles.fontStyle.includes("bold")}
        onClick={toggleBold}
        title="Bold (Ctrl+B)"
        activeColors="from-blue-500 to-blue-600 border-blue-600"
        hoverColor="border-blue-300 hover:bg-blue-50"
      >
        <strong>B</strong>
      </TextStyleButton>

      <TextStyleButton
        isActive={textStyles.fontStyle.includes("italic")}
        onClick={toggleItalic}
        title="Italic (Ctrl+I)"
        activeColors="from-purple-500 to-purple-600 border-purple-600"
        hoverColor="border-purple-300 hover:bg-purple-50"
      >
        <em>I</em>
      </TextStyleButton>

      <TextStyleButton
        isActive={textStyles.textDecoration.includes("underline")}
        onClick={toggleUnderline}
        title="Underline (Ctrl+U)"
        activeColors="from-indigo-500 to-indigo-600 border-indigo-600"
        hoverColor="border-indigo-300 hover:bg-indigo-50"
      >
        <u>U</u>
      </TextStyleButton>

      <TextStyleButton
        isActive={textStyles.textDecoration.includes("line-through")}
        onClick={toggleStrike}
        title="Strikethrough"
        activeColors="from-red-500 to-red-600 border-red-600"
        hoverColor="border-red-300 hover:bg-red-50"
      >
        <s>S</s>
      </TextStyleButton>

      <button
        className={`flex-1 py-2 text-xs border-2 rounded-md transition-all flex items-center justify-center font-semibold ${
          textStyles.shadow
            ? "bg-gradient-to-br from-gray-600 to-gray-700 text-white border-gray-700 shadow-lg"
            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
        onClick={toggleShadow}
        title="Shadow"
        style={{ textShadow: textStyles.shadow ? 'none' : '1px 1px 2px rgba(0,0,0,0.3)' }}
      >
        Sh
      </button>
    </div>
  );
}
