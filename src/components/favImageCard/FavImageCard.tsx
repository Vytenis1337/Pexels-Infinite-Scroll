import { useFavoritesContext } from "../../context/FavoritesContext";
import { Image } from "../imageCard/ImageCard";
import "./FavImageCard.css";

interface FavoriteImageCardProps {
  image: Image;
}

const FavoriteImageCard = ({ image }: FavoriteImageCardProps) => {
  const { removeFavorite } = useFavoritesContext();
  return (
    <div className="fav-image-card">
      <div className="fav-image-container">
        <img src={image.src.large} alt={image.alt} loading="lazy" />
        <div className="fav-info">
          <button
            className="fav-button"
            onClick={() => removeFavorite(image.id)}
          >
            Unfavorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteImageCard;
