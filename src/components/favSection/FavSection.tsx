import { useState } from "react";
import FavModal from "../favModal/FavModal";
import "./FavSection.css";
import { useFavoritesContext } from "../../context/FavoritesContext";

const FavSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { favorites } = useFavoritesContext();

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
