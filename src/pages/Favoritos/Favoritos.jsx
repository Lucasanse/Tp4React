import React, { useState, useEffect } from "react";
import { Footer } from "../../Components/Footer/Footer";
import ItemLoader from "../../Components/ItemLoader/ItemLoader";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useTranslation } from "react-i18next";
import { getLocalStorage, setLocalStorage } from "../../services/localStorage";
import { Header } from "../../Components/Header/Header";
import { useLanguage } from "../../Hooks/useLanguage";

const Favorites = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favoritesSearch, setfavoritesSearch] = useState([]);

  useLanguage();

  useEffect(() => {
    setFavorites(getLocalStorage("favorites"));
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setfavoritesSearch(
        favorites.filter((item) =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setfavoritesSearch(favorites);
    }
  }, [searchQuery, favorites]);

  const getFavoritesMessage = () => {
    if (searchQuery.length > 0 && favoritesSearch.length === 0) {
      return t("Favorites.notfound");
    }
    if (favorites.length === 0) {
      return t("Favorites.noFavoritesMessage");
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow mt-40">
        <div className="relative z-10 flex justify-center items-center">
          <div
            className="fade-up fade-up-d2 font-serif font-black leading-[1.08] mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(20px, 6.5vw, 78px)",
              color: "#2d1a5c",
            }}
          >
            {t("Favorites.titulo")}
          </div>
        </div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {favoritesSearch?.length > 0 ? (
          <ItemLoader
            favorites={favoritesSearch}
            setFavorites={setFavorites}
            searchQuery={searchQuery}
          />
        ) : (
          <p className="text-center text-black m-10 text-2xl mt-10">
            {getFavoritesMessage()}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;