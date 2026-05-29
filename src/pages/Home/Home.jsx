import React, { useState, useRef } from 'react';
import { Footer } from '../../Components/Footer/Footer';
import ItemLoader from '../../Components/ItemLoader/ItemLoader';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { useTranslation } from 'react-i18next';
import { Header } from '../../Components/Header/Header';
import HeroSection from '../../Components/Hero/HeroSection';
import { useLanguage } from '../../Hooks/useLanguage.jsx';
import { getLocalStorage, setLocalStorage } from '../../services/localStorage.js';

const Home = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const targetRef = useRef(null);
  const [favorites, setFavorites] = useState([]);
  if (!getLocalStorage("favorites")) {
    setLocalStorage("favorites", []);
  }

  useLanguage();

  const handleScroll = () => {
    targetRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'nearest',
    });
  };


  return (
    <>
      <Header />
      <div className="overflow-hidden flex flex-col min-h-screen">
        <HeroSection handleScroll={handleScroll} />
        <main className="grow">
          <h1 className="text-center text-white text-5xl font-bold">
            {t('home.title')}
          </h1>
          <div ref={targetRef}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        <ItemLoader searchQuery={searchQuery} setFavorites={setFavorites} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;