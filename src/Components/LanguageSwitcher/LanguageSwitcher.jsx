import React from "react";
import { useLanguage } from "../../Hooks/useLanguage.jsx";


export const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <select
      name="language"
      onChange={(e) => changeLanguage(e.target.value)}
      value={language}
      className="px-3 py-2 bg-transparent border-b border-gray-300 text-gray-700 focus:outline-none focus:border-blue-500"
    >
      <option value="es">Español</option>
      <option value="en">Inglés</option>
      <option value="pg">Guaraní</option>
    </select>
  );
};