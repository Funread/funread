export default function SidebarIcon({ icon, onClick, active }) {
  return (
    <button onClick={onClick} className={`p-3 rounded-lg hover:bg-gray-700 ${active ? "bg-gray-700" : ""}`}>
      {icon}
    </button>
  );
}
