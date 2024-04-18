import { render, screen } from "@testing-library/react";
import { useFavoritesContext } from "../../context/FavoritesContext";
import useImages from "../../hooks/useImages/useImages";
import useInfiniteScroll from "../../hooks/useInfiniteScroll/useInfiniteScroll";
import { Image } from "../imageCard/ImageCard";
import FetchImages from "./FetchImages";

const mockImages: Image[] = [
  {
    alt: "Test Image 1",
    avg_color: "#000000",
    height: 600,
    id: 1,
    liked: false,
    photographer: "Photographer 1",
    photographer_id: 1,
    photographer_url: "https://example.com/photographer1",
    src: {
      landscape: "https://example.com/landscape1.jpg",
      large: "https://example.com/large1.jpg",
      large2x: "https://example.com/large2x1.jpg",
      medium: "https://example.com/medium1.jpg",
      original: "https://example.com/original1.jpg",
      portrait: "https://example.com/portrait1.jpg",
      small: "https://example.com/small1.jpg",
      tiny: "https://example.com/tiny1.jpg",
    },
    url: "https://example.com/image1",
    width: 800,
  },
  {
    alt: "Test Image 2",
    avg_color: "#111111",
    height: 600,
    id: 2,
    liked: false,
    photographer: "Photographer 2",
    photographer_id: 2,
    photographer_url: "https://example.com/photographer2",
    src: {
      landscape: "https://example.com/landscape2.jpg",
      large: "https://example.com/large2.jpg",
      large2x: "https://example.com/large2x2.jpg",
      medium: "https://example.com/medium2.jpg",
      original: "https://example.com/original2.jpg",
      portrait: "https://example.com/portrait2.jpg",
      small: "https://example.com/small2.jpg",
      tiny: "https://example.com/tiny2.jpg",
    },
    url: "https://example.com/image2",
    width: 800,
  },
];

jest.mock("../../hooks/useImages/useImages", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../hooks/useInfiniteScroll/useInfiniteScroll", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../context/FavoritesContext", () => ({
  useFavoritesContext: jest.fn(),
}));

describe("FetchImages", () => {
  beforeEach(() => {
    (useImages as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      error: { message: "" },
      results: mockImages,
      hasNextPage: true,
    });

    (useInfiniteScroll as jest.Mock).mockImplementation(() => {});

    (useFavoritesContext as jest.Mock).mockReturnValue({
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn().mockReturnValue(false),
    });
  });

  test("renders loading indicator when images are being fetched", async () => {
    (useImages as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      error: { message: "" },
      results: [],
      hasNextPage: false,
    });
    render(<FetchImages />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("renders images after successful fetch", () => {
    render(<FetchImages />);
    mockImages.forEach((image) => {
      expect(screen.getByTestId(`image-card-${image.id}`)).toBeInTheDocument();
    });
  });

  test("displays error message when image fetch fails", () => {
    (useImages as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Failed to fetch images" },
      results: [],
      hasNextPage: false,
    });

    render(<FetchImages />);
    expect(screen.getByText(/Failed to fetch images/)).toBeInTheDocument();
  });
});
