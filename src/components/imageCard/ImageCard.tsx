import React, { useRef } from "react";
import useLazyLoad from "../../hooks/useLazyLoad";
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

// Props for the ImageCard component.
interface Props {
  image: Image;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

// The ImageCard component, designed to display an individual image along with some information and a favorite button.
// Uses React.forwardRef to forward a ref to the root div.
const ImageCard = React.forwardRef<HTMLDivElement, Props>(
  ({ image, isFavorite, toggleFavorite }, ref) => {
    const imgRef = useRef<HTMLImageElement | null>(null); // Ref for the img element to enable lazy loading.
    const src = useLazyLoad(imgRef, image.src.small); // Utilizes the useLazyLoad hook for lazy loading image.

    return (
      <div className="image-card" ref={ref}>
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
