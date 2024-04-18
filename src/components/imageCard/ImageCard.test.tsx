import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageCard from "./ImageCard";
import useLazyLoad from "../../hooks/useLazyLoad/useLazyLoad";

jest.mock("../../hooks/useLazyLoad/useLazyLoad");
const mockImage = {
  id: 1,
  alt: "Test Image",
  src: {
    small: "url-small",
    medium: "url-medium",
    large: "url-large",
    large2x: "url-large2x",
    landscape: "",
    original: "",
    portrait: "",
    tiny: "",
  },
  photographer: "John Doe",
  photographer_url: "https://example.com",
  avg_color: "",
  height: 600,
  width: 800,
  liked: false,
  photographer_id: 123,
  url: "https://example.com/image/1",
};

describe("ImageCard", () => {
  beforeEach(() => {
    (useLazyLoad as jest.Mock).mockImplementation(() => mockImage.src.small);
  });
  test("renders without crashing", () => {
    render(
      <ImageCard
        image={mockImage}
        isFavorite={false}
        toggleFavorite={() => {}}
        testId={`image-card-${mockImage.id}`}
      />
    );
    expect(screen.getByAltText(mockImage.alt)).toBeInTheDocument();
  });

  test("renders image attributes correctly", () => {
    render(
      <ImageCard
        image={mockImage}
        isFavorite={false}
        toggleFavorite={() => {}}
        testId={`image-card-${mockImage.id}`}
      />
    );
    const imageElement = screen.getByAltText(mockImage.alt) as HTMLImageElement;

    expect(imageElement.src).toContain(mockImage.src.small);
  });

  test("toggles favorite state on button click", () => {
    const toggleFavorite = jest.fn();
    render(
      <ImageCard
        image={mockImage}
        isFavorite={false}
        toggleFavorite={toggleFavorite}
        testId={`image-card-${mockImage.id}`}
      />
    );
    fireEvent.click(screen.getByText("Favorite"));
    expect(toggleFavorite).toHaveBeenCalledTimes(1);
  });
});
