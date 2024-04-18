import { createContext, useContext, useState, useEffect } from "react";
import { Image } from "../components/imageCard/ImageCard";
import {
  loadFavoritesFromLocalStorage,
  saveFavoritesToLocalStorage,
} from "../utils/localStorage/localStorage";

interface FavoritesContextType {
  favorites: Image[];
  addFavorite: (image: Image) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavoritesContext = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Image[]>(
    loadFavoritesFromLocalStorage()
  );

  useEffect(() => {
    saveFavoritesToLocalStorage(favorites);
  }, [favorites]);

  const addFavorite = (image: Image) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some((fav) => fav.id === image.id);
      if (!isFavorited) {
        return [...prevFavorites, image];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== id)
    );
  };

  const isFavorite = (id: number): boolean => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
