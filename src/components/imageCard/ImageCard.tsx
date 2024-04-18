import React, { useRef } from "react";
import useLazyLoad from "../../hooks/useLazyLoad/useLazyLoad";
import "./ImageCard.css";

export interface Image {
  alt: string;
  avg_color: string;
  height: number;
  id: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  src: {
    landscape: string;
    large: string;
    large2x: string;
    medium: string;
    original: string;
    portrait: string;
    small: string;
    tiny: string;
  };
  url: string;
  width: number;
}

interface Props {
  image: Image;
  isFavorite: boolean;
  toggleFavorite: () => void;
  testId: any;
}

const ImageCard = React.forwardRef<HTMLDivElement, Props>(
  ({ image, isFavorite, toggleFavorite, testId }, ref) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const src = useLazyLoad(imgRef, image.src.small);

    return (
      <div className="image-card" ref={ref} data-testid={testId}>
        <div className="image-container">
          <img
            ref={imgRef}
            src={src}
            srcSet={`
          ${image.src.small} 130w,
          ${image.src.medium} 350w,
          ${image.src.large} 940w,
          ${image.src.large2x} 1880w
        `}
            sizes="(max-width: 768px) 130px, (max-width: 1024px) 350px, 940px"
            alt={image.alt}
            loading="lazy"
          />
          <div className="info">
            <p className="title">{image.alt}</p>
            <hr className="horizontal-line" />
            <p className="photographer">{image.photographer}</p>
            <button className="favorite-button" onClick={toggleFavorite}>
              {isFavorite ? "Unfavorite" : "Favorite"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ImageCard;
