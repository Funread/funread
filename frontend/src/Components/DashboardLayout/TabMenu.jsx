import "./TabMenu.css";

import { NavLink } from "react-router-dom";
import { roleTabs } from "../Utils/roles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/userSlice";
import { persistor } from "../../redux/store";

import { BookOpen, Users, Award, Trophy, LogOut } from "lucide-react";
import avatar from "./avatar.png";

const TabMenu = ({ role }) => {

  const tabs = roleTabs[role] || [];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // If your backend supports a logout endpoint, call it here to invalidate server session
      // e.g. await fetch(`${process.env.REACT_APP_API_URL}/logout`, { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      // Clear persisted Redux user slice and in-memory state
      try {
        dispatch(deleteUser());
        // Purge persisted store so encrypted persisted data is removed
        if (persistor && typeof persistor.purge === "function") {
          await persistor.purge();
        }
      } catch (e) {
        console.error("Error clearing redux state on logout:", e);
      }

      // Clear localStorage and navigate to landing
      try {
        localStorage.clear();
      } catch (e) {
        // ignore
      }
      navigate("/");
    }
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