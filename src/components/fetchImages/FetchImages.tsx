import { useState } from "react";
import useImages from "../../hooks/useImages/useImages";
import ImageCard, { Image } from "../imageCard/ImageCard";
import "./FetchImages.css";

import useInfiniteScroll from "../../hooks/useInfiniteScroll/useInfiniteScroll";
import { useFavoritesContext } from "../../context/FavoritesContext";
import { Loading } from "../loading/Loading";

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
      testId={`image-card-${image.id}`}
      toggleFavorite={() =>
        isFavorite(image.id) ? removeFavorite(image.id) : addFavorite(image)
      }
    />
  );
  return (
    <div className="photos-container" data-testid="fetch-images">
      <div className="content">{results.map(renderImageCard)}</div>
      {isLoading && (
        <div data-testid="loading">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default FetchImages;
