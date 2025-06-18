import "./TabMenu.css";

import { NavLink } from "react-router-dom";
import { roleTabs } from "../Utils/roles";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import avatar from "./avatar.png";

const TabMenu = ({ role }) => {
  const tabs = roleTabs[role] || [];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav-menu">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "inactive"}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__avatar">
        <img className="avatar-image" src={avatar} alt="illustration" />
      </div>

      <button className="dashboard__logout-button" onClick={handleLogout} title="Logout">
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </aside>
  );
};

export default TabMenu;
