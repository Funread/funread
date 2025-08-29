import React, { useState } from "react";
import "./DashboardLayoutHeader.css";
import logo from "../../logoFunread.png";
import avatarIcon from "./avataricon.png";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import LanguageSwitcher from '../Shared/LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const DashboardLayoutHeader = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Alterna la visibilidad del menú
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="dashboard__header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt={t('Funread')} />
      </div>
      <div className="header__right">
        <LanguageSwitcher />
        <span className="username">{user.userName}</span>
        <div className="avatar-container" onClick={toggleMenu}>
          <img className="avatar-icon" src={avatarIcon} alt={t('user avatar')} />
          {menuVisible && (
            <div className="avatar-menu">
              <button
                className="menu-item--logout"
                onClick={handleLogout}
                title={t('Logout')}
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> {t('Logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardLayoutHeader;
