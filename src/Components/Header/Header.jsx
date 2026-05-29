import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import './Header.css'
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <header className="fixed w-screen z-20 bg-linear-to-r from-pink-200 via-purple-200 to-blue-200 shadow-[0_0_20px_rgba(0,0,0,0.15)] border-b-4 border-dashed border-white">
      <div className=" mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="font-bold text-purple-700 flex items-center drop-shadow">
          <NavLink to="/">
            <img className="w-20" src="../logo.png" alt="Logo de IUPI" name="Logo de IUPI" />
          </NavLink>
        </div>

        {/* Navegación */}
        <nav className="flex gap-6 font-medium text-2xl">
          <NavLink className={"navlink navlinkCustom"}
            to="/"
          >
            {t("header.inicio")}
          </NavLink>
          <NavLink
            to="/favoritos"
            className={"navlink navlinkCustom"}
          >
            {t("header.favoritos")}
          </NavLink>
          <NavLink
            to="/sobrenosotros"
            className={"navlink navlinkCustom"}
          >
            {t("header.SobreNosotros")}
          </NavLink>
        </nav>

        <div className="ml-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
