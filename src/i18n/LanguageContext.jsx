import { createContext, useContext, useMemo, useState } from "react";
import en from "../Translation/en";
import ar from "../Translation/ar";
import { createApi } from "../Components/APIs/APIs";

const translations = { en, ar };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("lang");
    const initial = saved === "ar" || saved === "en" ? saved : "en";
    document.documentElement.dir = translations[initial].dir;
    document.documentElement.lang = initial;
    return initial;
  });

  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
    document.documentElement.dir = translations[next].dir;
    document.documentElement.lang = next;
  };

  const t = translations[lang];

  const api = useMemo(() => createApi(lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, api }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
