export default function AlignmentButtons({ value, onChange }) {
  const alignments = [
    {
      value: "left",
      title: "Align Left",
      icon: (
        <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" className="opacity-80">
          <rect x="0" y="0" width="20" height="2.5" rx="1"/>
          <rect x="0" y="6.75" width="14" height="2.5" rx="1"/>
          <rect x="0" y="13.5" width="17" height="2.5" rx="1"/>
        </svg>
      )
    },
    {
      value: "center",
      title: "Align Center",
      icon: (
        <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" className="opacity-80">
          <rect x="0" y="0" width="20" height="2.5" rx="1"/>
          <rect x="3" y="6.75" width="14" height="2.5" rx="1"/>
          <rect x="1.5" y="13.5" width="17" height="2.5" rx="1"/>
        </svg>
      )
    },
    {
      value: "right",
      title: "Align Right",
      icon: (
        <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" className="opacity-80">
          <rect x="0" y="0" width="20" height="2.5" rx="1"/>
          <rect x="6" y="6.75" width="14" height="2.5" rx="1"/>
          <rect x="3" y="13.5" width="17" height="2.5" rx="1"/>
        </svg>
      )
    },
    {
      value: "justify",
      title: "Justify",
      icon: (
        <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" className="opacity-80">
          <rect x="0" y="0" width="20" height="2.5" rx="1"/>
          <rect x="0" y="6.75" width="20" height="2.5" rx="1"/>
          <rect x="0" y="13.5" width="20" height="2.5" rx="1"/>
        </svg>
      )
    }
  ];

  return (
    <div className="flex gap-1.5">
      {alignments.map((align) => (
        <button
          key={align.value}
          className={`flex-1 py-2 text-xs border-2 rounded-md transition-all flex items-center justify-center ${
            value === align.value
              ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white border-teal-600 shadow-md"
              : "bg-white text-gray-700 border-gray-300 hover:border-teal-300 hover:bg-teal-50"
          }`}
          onClick={() => onChange(align.value)}
          title={align.title}
        >
          {align.icon}
        </button>
      ))}
    </div>
  );
}
