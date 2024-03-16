import { Image } from "../imageCard/ImageCard";
import "./FavImageCard.css";

interface FavoriteImageCardProps {
  image: Image;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

// Functional component for displaying a single image card within the favorites modal.
const FavoriteImageCard = ({
  image,
  isFavorite,
  toggleFavorite,
}: FavoriteImageCardProps) => {
  return (
    <div className="fav-image-card">
      <div className="fav-image-container">
        <img src={image.src.large} alt={image.alt} loading="lazy" />
        <div className="fav-info">
          <button className="fav-button" onClick={toggleFavorite}>
            {isFavorite ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteImageCard;
