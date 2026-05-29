import React, { useState } from "react";
import "./ItemCard.css";
import { Link } from "react-router-dom";
import { Favorite } from "../Favorite/Favorite";
import { getLocalStorage, setLocalStorage } from "../../services/localStorage";
export const ItemCard = ({
  name,
  avatar,
  description,
  price,
  stock,
  id,
  setFavorites,
}) => {
  const props = {
    name: name,
    avatar: avatar,
    description: description,
    price: price,
    stock: stock,
    id: id
  };
  //Seccion para favoritos
  const [isFavorite, setIsFavorite] = useState(() => {
    const arrayLocal = getLocalStorage("favorites") || [];
    return arrayLocal.some((fav) => fav.id === props.id);
  });
  const handleFavorite = () => {
    const arrayLocal = getLocalStorage("favorites") || [];
    if (arrayLocal) {
      if (isFavorite) {
        const newArray = arrayLocal.filter((fav) => fav.id !== props.id);
        setFavorites(newArray);
        setLocalStorage("favorites", newArray);
        setIsFavorite(false);
      } else {
        arrayLocal.push(props);
        setLocalStorage("favorites", arrayLocal);
        setFavorites(arrayLocal);
        setIsFavorite(true);
      }
    }
  };

  return (
    <div className="relative w-72 bg-white shadow-md rounded-xl duration-500 hover:shadow-2xl">
      <Link to={`/detalles/${props.id}`}>
        <div>
          <img
            src={props.avatar}
            alt="Product"
            className="h-80 w-72 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <p className="text-lg font-bold text-black truncate block capitalize">
              {props.name}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ${props.price}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-2 right-2">
        <Favorite
          handleFavorite={handleFavorite}
          isFavorite={isFavorite}
        ></Favorite>
      </div>
    </div>
  );
};

