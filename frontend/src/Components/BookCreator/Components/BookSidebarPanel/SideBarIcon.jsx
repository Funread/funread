export default function SidebarIcon({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 focus:bg-blue-800 focus:outline-none transition ${active ? "bg-blue-800" : "bg-gray-900"}`}
      tabIndex={0}
      role="menuitem"
    >
    </button>
  );
}
