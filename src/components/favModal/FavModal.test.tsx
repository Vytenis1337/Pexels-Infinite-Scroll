import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFavoritesContext } from "../../context/FavoritesContext";
import FavModal from "./FavModal";

const mockFavorites = [
  { id: 1, alt: "Favorite Image 1", src: "image-src-1" },
  { id: 2, alt: "Favorite Image 2", src: "image-src-2" },
];

jest.mock("../../context/FavoritesContext", () => ({
  useFavoritesContext: jest.fn(),
}));

describe("FavoritesModal", () => {
  beforeEach(() => {
    (useFavoritesContext as jest.Mock).mockReturnValue({
      favorites: mockFavorites,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn().mockReturnValue(true),
    });
  });

  test("renders the modal with correct structure", () => {
    render(<FavModal onClose={jest.fn()} />);
    expect(screen.getByText("Favorite Images")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    mockFavorites.forEach((image) => {
      expect(screen.getByAltText(image.alt)).toBeInTheDocument();
    });
  });

  test("displays a message when there are no favorites", () => {
    (useFavoritesContext as jest.Mock).mockReturnValue({
      favorites: [],
    });

    render(<FavModal onClose={() => {}} />);
    expect(screen.getByText("No Favorites Yet")).toBeInTheDocument();
  });

  test("calls onClose prop when close button is clicked", async () => {
    const onCloseMock = jest.fn();
    render(<FavModal onClose={onCloseMock} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("closes the modal when the Escape key is pressed", async () => {
    const onCloseMock = jest.fn();
    const user = userEvent.setup();
    render(<FavModal onClose={onCloseMock} />);

    await user.keyboard("{Escape}");

    expect(onCloseMock).toHaveBeenCalled();
  });

  test("closes the modal when a click is made outside the modal content", async () => {
    const onCloseMock = jest.fn();
    render(<FavModal onClose={onCloseMock} />);

    fireEvent.mouseUp(screen.getByTestId("modal-backdrop"));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
