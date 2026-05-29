import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLocalStorage, setLocalStorage } from "../services/localStorage";

const DEFAULT_LANGUAGE = "es";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    () => getLocalStorage("language") ?? DEFAULT_LANGUAGE
  );
  useEffect(() => {
    const stored = getLocalStorage("language") ?? DEFAULT_LANGUAGE;
    if (i18n.language !== stored) {
      i18n.changeLanguage(stored);
    }
    setLanguage(stored);
  }, []);

  const changeLanguage = (lang) => {
    setLocalStorage("language", lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return { language, changeLanguage };
};
