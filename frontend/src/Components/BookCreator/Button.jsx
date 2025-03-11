// src/components/ui/Button.jsx
export function Button({ children, className = "", ...props }) {
  return (
    <button className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${className}`} {...props}>
      {children}
    </button>
  );
}