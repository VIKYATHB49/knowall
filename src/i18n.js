import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Loads translations from /public/locales
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    // Add your languages here
    supportedLngs: ['en', 'hi', 'te', 'ja'], 
    
    // Default language
    fallbackLng: 'en', 

    // Namespace
    ns: ['translation'],
    defaultNS: 'translation',

    // Where to find the translation files
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // React-specific settings
    react: {
      useSuspense: true, // Use Suspense for loading translations
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    debug: false, // Set to true for development logging
  });

export default i18n;