import { useState } from "react";
import useImages from "../../hooks/useImages";
import ImageCard, { Image } from "../imageCard/ImageCard";
import "./FetchImages.css";

import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useFavoritesContext } from "../../context/FavoritesContext";

const FetchImages: React.FC = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const { isLoading, isError, error, results, hasNextPage } =
    useImages(pageNum);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext();
  const lastPostRef = useInfiniteScroll(isLoading, hasNextPage, setPageNum);

  if (isError)
    return <p className="photos-container">Error: {error.message}</p>;

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
      {isLoading && <p className="center">Loading More Posts...</p>}
    </div>
  );
};

export default FetchImages;
