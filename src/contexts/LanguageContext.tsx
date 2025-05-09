import React, { createContext, useContext, useState, useEffect } from 'react';
import zh from '../locales/zh';
import en from '../locales/en';

const LanguageContext = createContext({
  lang: 'zh',
  toggleLang: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState('zh');

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) setLang(saved);
  }, []);

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'zh' ? 'en' : 'zh';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useI18n() {
  const { lang } = useLanguage();
  return lang === 'zh' ? zh : en;
} 