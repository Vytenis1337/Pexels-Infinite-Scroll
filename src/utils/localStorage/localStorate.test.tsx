import { Image } from "../../components/imageCard/ImageCard";
import {
  saveFavoritesToLocalStorage,
  loadFavoritesFromLocalStorage,
} from "./localStorage";

const favorites: Image[] = [
  {
    id: 1,
    url: "http://example.com/image1.jpg",
    alt: "Image 1",
    avg_color: "#cccccc",
    height: 600,
    width: 800,
    liked: false,
    photographer: "Photographer 1",
    photographer_id: 101,
    photographer_url: "http://example.com/photographer1",
    src: {
      landscape: "http://example.com/image1_landscape.jpg",
      large: "http://example.com/image1_large.jpg",
      large2x: "http://example.com/image1_large2x.jpg",
      medium: "http://example.com/image1_medium.jpg",
      original: "http://example.com/image1_original.jpg",
      portrait: "http://example.com/image1_portrait.jpg",
      small: "http://example.com/image1_small.jpg",
      tiny: "http://example.com/image1_tiny.jpg",
    },
  },
  {
    id: 2,
    url: "http://example.com/image2.jpg",
    alt: "Image 2",
    avg_color: "#eeeeee",
    height: 600,
    width: 800,
    liked: true,
    photographer: "Photographer 2",
    photographer_id: 102,
    photographer_url: "http://example.com/photographer2",
    src: {
      landscape: "http://example.com/image2_landscape.jpg",
      large: "http://example.com/image2_large.jpg",
      large2x: "http://example.com/image2_large2x.jpg",
      medium: "http://example.com/image2_medium.jpg",
      original: "http://example.com/image2_original.jpg",
      portrait: "http://example.com/image2_portrait.jpg",
      small: "http://example.com/image2_small.jpg",
      tiny: "http://example.com/image2_tiny.jpg",
    },
  },
];

describe("Local Storage operations", () => {
  let setItemMock: jest.Mock;
  let getItemMock: jest.Mock;
  let clearMock;

  beforeEach(() => {
    setItemMock = jest.fn();
    getItemMock = jest.fn();
    clearMock = jest.fn();

    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: setItemMock,
        getItem: getItemMock,
        clear: clearMock,
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should save an array of favorites to localStorage", () => {
    saveFavoritesToLocalStorage(favorites);
    expect(setItemMock).toHaveBeenCalledWith(
      "favorites",
      JSON.stringify(favorites)
    );
  });

  test("should load an array of favorites from localStorage", () => {
    getItemMock.mockReturnValue(JSON.stringify(favorites));
    expect(loadFavoritesFromLocalStorage()).toEqual(favorites);
  });

  test("should return an empty array when no favorites are stored", () => {
    getItemMock.mockReturnValue(null);
    expect(loadFavoritesFromLocalStorage()).toEqual([]);
  });

  test("should handle errors during saving to localStorage", () => {
    const errorMock = jest.spyOn(console, "error").mockImplementation(() => {});
    setItemMock.mockImplementation(() => {
      throw new Error("Storage error");
    });
    saveFavoritesToLocalStorage([]);
    expect(errorMock).toHaveBeenCalled();
  });

  test("should handle errors during loading from localStorage", () => {
    const errorMock = jest.spyOn(console, "error").mockImplementation(() => {});
    getItemMock.mockImplementation(() => {
      throw new Error("Parsing error");
    });
    expect(loadFavoritesFromLocalStorage()).toEqual([]);
    expect(errorMock).toHaveBeenCalled();
  });
});
