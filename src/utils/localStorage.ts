import { Image } from "../components/imageCard/ImageCard";

export const saveFavoritesToLocalStorage = (favorites: Image[]): void => {
  try {
    // Convert the favorites array to a JSON string and save it in localStorage under the key 'favorites'.
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites to localStorage:", error);
  }
};

// Loads the list of favorite images from localStorage.
export const loadFavoritesFromLocalStorage = (): Image[] => {
  try {
    // Retrieve the item stored in localStorage under the key 'favorites'.
    const favorites = localStorage.getItem("favorites");
    // Parse the JSON string back into an array of Image objects.
    // If there are no favorites stored, return an empty array.
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage:", error);
    // Return an empty array if there was an error accessing or parsing the stored favorites.
    return [];
  }
};
