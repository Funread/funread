import { useNavigate } from "react-router-dom";
import SidebarIcon from "./SideBarIcon";
import {BookOpenCheck, Gamepad, MessageCircle, Users, Package, Home, Image, Type, ImagePlus} from "lucide-react";
import { library } from "@fortawesome/fontawesome-svg-core";

export default function SideBar({ openPanel, setOpenPanel }) {
  const navigate = useNavigate(); 

  const options = [
  { key: "home", icon: <Home />, label: "My library" },
  { key: "text", icon: <Type />, label: "Text" },
  { key: "background", icon: <Image />, label: "Background" },
  { key: "custom", icon: <ImagePlus />, label: "Custom" },
  { key: "objects", icon: <Package />, label: "Objects" },
  { key: "users", icon: <Users />, label: "Characters" },
  { key: "shape", icon: <MessageCircle />, label: "Shapes" },
  { key: "quiz", icon: <BookOpenCheck />, label: "Quizzes" },
  { key: "games", icon: <Gamepad />, label: "Games" }
  ];
  return (
    <nav className="w-20 h-full bg-gray-900 text-white flex flex-col items-center shadow-lg" aria-label="Main sidebar navigation">
      {/* Logo section */}
      <div className="flex-shrink-0 w-full py-4 px-2 flex justify-center border-b border-gray-700">
        <img 
          src="/Logo.png" 
          alt="Funread Logo" 
          className="w-12 h-12 object-contain cursor-pointer hover:opacity-80 transition"
          onClick={() => navigate("/dashboard")}
        />
      </div>
      
      {/* Buttons section - distributed evenly */}
      <div className="flex-1 w-full px-2 py-3 flex flex-col justify-evenly">
        {options.map(opt => (
          <button
            key={opt.key}
            onClick={() => opt.key === "home" ? navigate("/dashboard") : setOpenPanel(opt.key)}
            className={`flex flex-col items-center w-full py-2 px-1 rounded-lg focus:outline-none transition ${openPanel === opt.key ? "bg-blue-600" : "hover:bg-gray-800"}`}
            aria-label={opt.label}
            title={opt.label}
          >
            <span className="mb-1 flex-shrink-0" aria-hidden="true">{opt.icon}</span>
            <span className="text-[10px] leading-tight font-medium text-white text-center opacity-90">{opt.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
