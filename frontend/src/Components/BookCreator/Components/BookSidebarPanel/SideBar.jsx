import { useNavigate } from "react-router-dom";
import SidebarIcon from "./SideBarIcon"; // Usa el nombre exacto del archivo
import {BookOpenCheck, Gamepad, MessageCircle, Users, Package, Home, Image, Type} from "lucide-react";

export default function SideBar({ openPanel, setOpenPanel }) {
  const navigate = useNavigate(); 

  const options = [
  { key: "home", icon: <Home />, label: "Home" },
  { key: "text", icon: <Type />, label: "Text" },
  { key: "background", icon: <Image />, label: "Background" },
  { key: "objects", icon: <Package />, label: "Objects" },
  { key: "users", icon: <Users />, label: "Characters" },
  { key: "shape", icon: <MessageCircle />, label: "Shapes" },
  { key: "quiz", icon: <BookOpenCheck />, label: "Quizzes" },
  { key: "games", icon: <Gamepad />, label: "Games" }
  ];
  return (
    <nav className="w-20 h-full bg-gray-900 text-white flex flex-col items-center py-6 px-2 gap-4 shadow-lg" aria-label="Main sidebar navigation">
      {options.map(opt => (
        <button
          key={opt.key}
          onClick={() => opt.key === "home" ? navigate("/dashboard") : setOpenPanel(opt.key)}
          className={`flex flex-col items-center w-full py-2 rounded-lg focus:outline-none transition ${openPanel === opt.key ? "bg-blue-800" : "hover:bg-gray-800"}`}
          aria-label={opt.label}
          title={opt.label}
        >
          <span className="mb-1" aria-hidden="true">{opt.icon}</span>
          <span className="text-xs font-medium text-white opacity-80">{opt.label}</span>
        </button>
      ))}
    </nav>
  );
}
