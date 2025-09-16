import "./TabMenu.css";

import { NavLink } from "react-router-dom";
import { roleTabs } from "../Utils/roles";
import { useNavigate } from "react-router-dom";

import { BookOpen, Users, Award, Trophy, LogOut } from "lucide-react";
import avatar from "./avatar.png";

const TabMenu = ({ role }) => {

  const tabs = roleTabs[role] || [];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="tab-menu-sidebar">
      <nav className="tab-menu-sidebar__nav_menu">
        <div className="tab-menu-sidebar__nav_links">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `tab-menu-nav-link ${isActive ? "tab-menu-active" : "tab-menu-inactive"}`
              }
            >
              {tab.icon && <tab.icon className="tab-menu-sidebar__icon" />}
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="tab-menu-sidebar__bottom_section">
        <div className="tab-menu-sidebar__avatar">
          <img className="tab-menu-avatar_image" src={avatar} alt="illustration" />
        </div>
        <button className="tab-menu-sidebar__logout_button" onClick={handleLogout}>
          <LogOut className="tab-menu-sidebar__icon" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default TabMenu;