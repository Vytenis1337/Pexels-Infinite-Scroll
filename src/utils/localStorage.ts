import { Image } from "../components/imageCard/ImageCard";

export const saveFavoritesToLocalStorage = (favorites: Image[]): void => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("favoritesUpdated"));
  } catch (error) {
    console.error("Failed to save favorites to localStorage:", error);
  }
};

export const loadFavoritesFromLocalStorage = (): Image[] => {
  try {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage:", error);

    return [];
  }
};
