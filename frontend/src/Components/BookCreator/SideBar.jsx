import { useNavigate } from "react-router-dom";
import SidebarIcon from "./SideBarIcon"; // Usa el nombre exacto del archivo
import {Volleyball,Boxes,Users,Landmark, Package , Home, Image, Settings, Undo, Type } from "lucide-react";

export default function SideBar({ openPanel, setOpenPanel }) {
  const navigate = useNavigate(); 

  return (
    <div className="w-16 h-full bg-gray-900 text-white flex flex-col items-center p-4 space-y-6 fixed left-0 top-0 shadow-lg">
      <SidebarIcon icon={<Home />} onClick={() => navigate("/library")} active={openPanel === "home"} />
      <SidebarIcon icon={<Type />} onClick={() => setOpenPanel("text")} active={openPanel === "text"} />
      <SidebarIcon icon={<Landmark />} onClick={() => setOpenPanel("background")} active={openPanel === "background"} />
      <SidebarIcon icon={<Volleyball />} onClick={() => setOpenPanel("objects")} active={openPanel === "objects"} />
      <SidebarIcon icon={<Users />} onClick={() => setOpenPanel("users")} active={openPanel === "users"} />
      <SidebarIcon icon={<Boxes />} onClick={() => setOpenPanel("shape")} active={openPanel === "shape"} />
      <button className="p-2 rounded-full border border-gray-300 bg-white shadow-md hover:bg-gray-200 transition">
        <Undo className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
