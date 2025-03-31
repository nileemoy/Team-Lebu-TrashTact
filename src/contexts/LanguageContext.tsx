import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'as';

interface LanguageContextType {
  currentLanguage: Language;
  translations: Record<string, any>;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('appLanguage');
    return (saved === 'en' || saved === 'as') ? saved : 'en';
  });

  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../i18n/locales/${currentLanguage}.json`);
        setTranslations(translationModule.default);
        localStorage.setItem('appLanguage', currentLanguage);
        document.documentElement.lang = currentLanguage;
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'as' : 'en');
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations;
    
    for (const k of keys) {
      if (current && typeof current === 'object') {
        current = current[k];
      } else {
        return key; // Return the key if translation is not found
      }
    }
    
    return current || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, translations, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 