import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import asTranslations from './locales/as.json';

const savedLang = localStorage.getItem('i18nextLng');

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      as: {
        translation: asTranslations,
      },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'as'],
    lng: savedLang || 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
    },
    debug: process.env.NODE_ENV === 'development',
  });

// Handle language change
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem('i18nextLng', lng);
  document.documentElement.dir = i18n.dir(lng);
});

// Initialize language
const initialLanguage = savedLang || 'en';
document.documentElement.lang = initialLanguage;
document.documentElement.dir = i18n.dir(initialLanguage);

export default i18n; 