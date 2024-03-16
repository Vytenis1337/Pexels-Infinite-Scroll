import { useRef } from "react";

import "./FavModal.css";

import FavImageCard from "../favImageCard/FavImageCard";
import { useFavoritesContext } from "../../context/FavoritesContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useEscapeKey } from "../../hooks/useEscapeKey";

interface FavoritesModalProps {
  onClose: () => void;
}

// Component definition for the FavoritesModal. It displays the favorite images in a modal.
const FavoritesModal = ({ onClose }: FavoritesModalProps) => {
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useFavoritesContext();

  // useRef hook to create a reference for the modal element. This is used by the useOutsideClick hook.
  const modalRef = useRef(null);

  // Custom hook calls to enable closing the modal by either clicking outside of it or pressing the Escape key.
  useOutsideClick(onClose, modalRef);
  useEscapeKey(onClose);
  return (
    <div className="modal-backdrop">
      <div className="modal" ref={modalRef}>
        <h2 className="fav-modal-title">Favorite Images</h2>

        <div className="favorites-content">
          {favorites.map((image) => (
            <FavImageCard
              key={image.id}
              image={image}
              isFavorite={isFavorite(image.id)}
              toggleFavorite={() =>
                isFavorite(image.id)
                  ? removeFavorite(image.id)
                  : addFavorite(image)
              }
            />
          ))}
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FavoritesModal;
