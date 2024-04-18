import { useRef } from "react";

import "./FavModal.css";

import FavImageCard from "../favImageCard/FavImageCard";
import { useFavoritesContext } from "../../context/FavoritesContext";
import { useOutsideClick } from "../../hooks/useOutsideClick/useOutsideClick";
import { useEscapeKey } from "../../hooks/useEscapeKey/useEscapeKey";

interface FavoritesModalProps {
  onClose: () => void;
}

const FavoritesModal = ({ onClose }: FavoritesModalProps) => {
  const { favorites } = useFavoritesContext();

  const modalRef = useRef(null);

  useOutsideClick(onClose, modalRef);
  useEscapeKey(onClose);
  return (
    <div className="modal-backdrop" data-testid="modal-backdrop">
      <div className="modal" ref={modalRef}>
        <h2 className="fav-modal-title">Favorite Images</h2>

        <div className="favorites-content">
          {favorites.length > 0 ? (
            favorites.map((image) => (
              <FavImageCard key={image.id} image={image} />
            ))
          ) : (
            <div className="no-favorites">No Favorites Yet</div>
          )}
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default FavoritesModal;
