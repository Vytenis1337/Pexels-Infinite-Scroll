import { createContext, useContext, useState, useEffect } from "react";
import { Image } from "../components/imageCard/ImageCard";
import {
  loadFavoritesFromLocalStorage,
  saveFavoritesToLocalStorage,
} from "../utils/localStorage";

interface FavoritesContextType {
  favorites: Image[];
  addFavorite: (image: Image) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// Custom hook to use the FavoritesContext in function components.
export const useFavoritesContext = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

// Provider component to wrap the part of your application that needs access to favorites context.
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize favorites state from localStorage.
  const [favorites, setFavorites] = useState<Image[]>(
    loadFavoritesFromLocalStorage()
  );

  // Effect to save favorites to localStorage whenever the favorites state changes.
  useEffect(() => {
    saveFavoritesToLocalStorage(favorites);
  }, [favorites]);

  // Function to add a new favorite image, ensuring no duplicates.
  const addFavorite = (image: Image) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some((fav) => fav.id === image.id);
      if (!isFavorited) {
        return [...prevFavorites, image];
      }
      return prevFavorites;
    });
  };

  // Function to remove an image from favorites by its ID.
  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== id)
    );
  };

  // Function to check if an image is already in the favorites list.
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
