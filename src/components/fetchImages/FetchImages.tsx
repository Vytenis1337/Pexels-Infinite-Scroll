// FetchImages component: Fetches and displays a gallery of images from Pexels API.
// It implements infinite scrolling to load more images as the user scrolls down.
// The component also allows for marking images as favorites and managing them.

import { useState } from "react";
import useImages from "../../hooks/useImages";
import ImageCard, { Image } from "../imageCard/ImageCard";
import "./FetchImages.css";

import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useFavoritesContext } from "../../context/FavoritesContext";
import { Loading } from "../loading/Loading";

const FetchImages: React.FC = () => {
  // State for pagination.
  const [pageNum, setPageNum] = useState<number>(1);
  // Destructuring necessary functions and states from useImages hook.
  const { isLoading, isError, error, results, hasNextPage } =
    useImages(pageNum);
  // Fetch favorites context to manage favorite images.
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext();
  // Custom hook to implement infinite scrolling behavior.
  const lastPostRef = useInfiniteScroll(isLoading, hasNextPage, setPageNum);

  // Error handling for API call failure.
  if (isError)
    return <p className="photos-container">Error: {error.message}</p>;

  // Function to render ImageCard component for each image.
  const renderImageCard = (image: Image, i: number) => (
    <ImageCard
      ref={results.length === i + 1 ? lastPostRef : null}
      key={image.id}
      image={image}
      isFavorite={isFavorite(image.id)}
      toggleFavorite={() =>
        isFavorite(image.id) ? removeFavorite(image.id) : addFavorite(image)
      }
    />
  );
  return (
    <div className="photos-container">
      <div className="content">{results.map(renderImageCard)}</div>
      {isLoading && (
        <p className="center">
          <Loading />
        </p>
      )}
    </div>
  );
};

export default FetchImages;
