import { useNavigate } from "react-router-dom";
import SidebarIcon from "./SideBarIcon"; // Usa el nombre exacto del archivo
import { Home, Image, Settings, Undo, Type } from "lucide-react";

export default function SideBar({ openPanel, setOpenPanel }) {
  const navigate = useNavigate(); 

  return (
    <div className="w-16 h-full bg-gray-900 text-white flex flex-col items-center p-4 space-y-6 fixed left-0 top-0 shadow-lg">
      <SidebarIcon icon={<Home />} onClick={() => navigate("/library")} active={openPanel === "home"} />
      <SidebarIcon icon={<Image />} onClick={() => setOpenPanel("images")} active={openPanel === "images"} />
      <SidebarIcon icon={<Type />} onClick={() => setOpenPanel("text")} active={openPanel === "text"} />
      <SidebarIcon icon={<Settings />} onClick={() => setOpenPanel("settings")} active={openPanel === "settings"} />
      <button className="p-2 rounded-full border border-gray-300 bg-white shadow-md hover:bg-gray-200 transition">
        <Undo className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
