import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Favorite } from "../Favorite/Favorite";
import { getLocalStorage, setLocalStorage } from "../../services/localStorage";


const DetallesCard = ({ item }) => {
  const { t } = useTranslation();

  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(() => {
    const arrayLocal = getLocalStorage("favorites") || [];
    return arrayLocal.some((fav) => fav.id === item[0].id);
  });
  console.log(item[0].id);
  const handleFavorite = () => {
    const arrayLocal = getLocalStorage("favorites") || [];
    if (arrayLocal) {
      if (isFavorite) {
        const newArray = arrayLocal.filter((fav) => fav.id !== item[0].id);
        setFavorites(newArray);
        setLocalStorage("favorites", newArray);
        setIsFavorite(false);
      } else {
        arrayLocal.push(item[0]);
        setLocalStorage("favorites", arrayLocal);
        setFavorites(arrayLocal);
        setIsFavorite(true);
      }
    }
  };
  const itemInfo = item[0];

  return (
    <div style={{ 
      backgroundColor: "rgba(0, 0, 0, 0)" }}>
      <div className="container px-5 py-24 mx-auto" style={{ cursor: "auto" }}>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={itemInfo.name}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={itemInfo.avatar}
            style={{ cursor: "auto" }}
          />

          <div
            className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
            style={{ cursor: "auto" }}
          >
            <div className="flex items-center w-full h-10">
              <h2 className="flex-1 pl-5 text-center text-2xl title-font text-gray-500 tracking-widest leading-none">
                {t("details.onSale")}
              </h2>
              <Favorite
                handleFavorite={handleFavorite}
                isFavorite={isFavorite}
              />
            </div>

            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {itemInfo.name}
            </h1>
            <p className="text-black">{itemInfo.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex ml-6 items-center"></div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${itemInfo.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesCard;
