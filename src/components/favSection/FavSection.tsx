import { useState } from "react";
import FavModal from "../favModal/FavModal";
import "./FavSection.css";
import { useFavoritesContext } from "../../context/FavoritesContext";

// Defines a component for the favorites section.
const FavSection = () => {
  // State to manage the visibility of the favorites modal.
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Retrieve the list of favorite images from the favorites context.
  const { favorites } = useFavoritesContext();

  // Function to toggle the visibility state of the favorites modal.
  const toggleModal = (): void => setIsModalOpen(!isModalOpen);

  return (
    <>
      {!isModalOpen && favorites.length > 0 && (
        <button
          className={`fav-button ${isModalOpen ? "fav-button-hidden" : ""}`}
          onClick={toggleModal}
        >
          Favorites
        </button>
      )}
      {isModalOpen && <FavModal onClose={toggleModal} />}
    </>
  );
};

export default FavSection;
