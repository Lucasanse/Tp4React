import { useState } from "react";

export const Favorite = ({ handleFavorite, isFavorite }) => {
    

  return (
    <button onClick={handleFavorite}>
      {isFavorite ? (
        <img className="w-7" src="/icons/favorite2.svg" alt="Favorito" />
      ) : (
        <img className="w-7" src="/icons/favorite.svg" alt="No favorito" />
      )}
    </button>
  );
};
