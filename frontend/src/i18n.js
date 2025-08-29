import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Carga traducciones desde una API/servidor
  .use(LanguageDetector) // Detecta el idioma del usuario
  .use(initReactI18next) // Pasa la instancia de i18n a react-i18next
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: 'es',
    debug: true, // Activar modo debug solo en desarrollo
    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Ruta a los archivos de traducción
    },
    interpolation: {
      escapeValue: false, // React ya se encarga de escapar valores
    },
  });

export default i18n;
