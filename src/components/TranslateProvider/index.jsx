import { createContext, useContext, useEffect, useState } from "react";
import vi from "@/locales/vi.json";
const Context = createContext({
  t: (keyword) => keyword,
  lang: { vi },
  setLang: (lang) => {},
});

const _global = {};

export const t = (...params) => _global?.t?.(...params);

export const TranslateProvider = ({
  children,
  translate = {},
  defaultLanguage = { vi },
}) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || defaultLanguage;
  });

  const t = (keyword) => translate?.[lang]?.[keyword] || keyword;

  useEffect(() => {
    _global.t = t;
  }, [t]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <Context.Provider value={{ t, setLang, lang }}>{children}</Context.Provider>
  );
};

export const useTranslate = () => useContext(Context);
