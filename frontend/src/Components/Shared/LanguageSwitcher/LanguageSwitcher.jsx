import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import i18n from '../../../i18n';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="language-switcher-button"
      title={`Switch to ${i18n.language === 'es' ? 'English' : 'Español'}`}>
      <Languages className="h-4 w-4" />
    </button>
  );
};

export default LanguageSwitcher;
