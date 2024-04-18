import { act, render, screen } from "@testing-library/react";
import { Image } from "../components/imageCard/ImageCard";
import { FavoritesProvider, useFavoritesContext } from "./FavoritesContext";

const testImage: Image = {
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
};

describe("FavoritesProvider", () => {
  const TestComponent = () => {
    const { addFavorite, removeFavorite, isFavorite, favorites } =
      useFavoritesContext();
    return (
      <div>
        <div data-testid="favorites-count">
          Favorites Count: {favorites.length}
        </div>
        <button onClick={() => addFavorite(testImage)}>Add</button>
        <button onClick={() => removeFavorite(testImage.id)}>Remove</button>
        <div data-testid="is-favorite">
          {isFavorite(testImage.id) ? "Yes" : "No"}
        </div>
      </div>
    );
  };

  beforeEach(() => {
    localStorage.setItem("favorites", JSON.stringify([testImage]));
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("initializes favorites from localStorage", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    expect(screen.getByTestId("favorites-count").textContent).toMatch(
      /Favorites Count: 1/
    );
  });

  test("adds and removes a favorite", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId("favorites-count").textContent).toMatch(
      /Favorites Count: 1/
    );
    act(() => {
      screen.getByText("Add").click();
    });
    expect(screen.getByTestId("favorites-count").textContent).toMatch(
      /Favorites Count: 1|2/
    );
    expect(screen.getByTestId("is-favorite").textContent).toBe("Yes");

    act(() => {
      screen.getByText("Remove").click();
    });
    expect(screen.getByTestId("favorites-count").textContent).toMatch(
      /Favorites Count: 0|1/
    );
    expect(screen.getByTestId("is-favorite").textContent).toBe("No");
  });
  test("does not add duplicate favorites", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    act(() => {
      screen.getByText("Add").click();
      screen.getByText("Add").click();
    });

    expect(screen.getByTestId("favorites-count").textContent).toMatch(
      /Favorites Count: 1/
    );
    expect(screen.getByTestId("is-favorite").textContent).toBe("Yes");
  });

  test("persists favorites across multiple renders", () => {
    const { unmount } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );
    unmount();

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId("favorites-count").textContent).toMatch(
      /Favorites Count: 1/
    );
  });
});

describe("useFavoritesContext", () => {
  test("throws an error when used outside of FavoritesProvider", () => {
    expect(() => render(<MockComponentWithoutProvider />)).toThrow(
      "useFavorites must be used within a FavoritesProvider"
    );
  });
});

function MockComponentWithoutProvider() {
  return <div />;
}
